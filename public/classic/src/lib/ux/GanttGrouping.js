/**
 * A plugin providing grouping ability to the Gantt.
 */
Ext.define('MyApp.lib.ux.GanttGrouping', {

    extend   : 'Ext.plugin.Abstract',

    alias    : 'plugin.gantt_grouping',

    requires: [
        'Ext.Array',
        'Ext.menu.CheckItem',
        'Ext.menu.Menu'
    ],

    mixins   : [
        'Ext.mixin.Observable'
    ],

    /**
     * @cfg {Boolean} enableGroupingMenu `True` to display grouping menu in column headers. The grouping menu allows to group tasks.
     * Menu includes columns, configured with 'allowGrouping: true'.
     */
    enableGroupingMenu : true,

    /**
     * @cfg {String} columnsGroupName Group to use in column grouping menu.
     * @private
     */
    columnsGroupName : 'gantt_groupby',

    t: 'ddddd',

    constructor : function (cfg) {
        cfg = cfg || {};

        // to allow use this plugin early in initComponent
        this.bindGantt(cfg.gantt);

        this.callParent(arguments);
    },

    bindGantt : function (gantt) {
        // to allow use this plugin early in initComponent
        this.gantt = gantt;

        this.mon(gantt, {
            'headermenucreate' : this.onHeaderMenuCreated,
            scope : this
        });
    },

    onHeaderMenuCreated : function (grid, menu) {
        if (!this.disabled && this.enableGroupingMenu) {
            var columnListMenuItem = this.columnListMenuItem = new Ext.menu.Menu({
                defaults : {
                    scope   : this,
                    xtype   : 'menucheckitem',
                    group   : this.columnsGroupName,
                    handler : function (item) {
                        this.groupByColumn(Ext.getCmp(item.columnId));
                    }
                }
            });

            var position = menu.items.indexOfKey('columnItem');

            menu.insert(position + 1, [
                    {
                        text         : 'Group on this field',
                        itemId       : 'groupbythisfield',
                        xtype        : 'menucheckitem',
                        checkHandler : function (item, checked) {
                            if (checked) {
                                this.groupByColumn(item.up('gridcolumn'));
                            } else {
                                this.groupByColumn();
                            }
                        },
                        scope        : this
                    },
                    {
                        text         : 'Group by',
                        itemId       : 'groupby',
                        menu         : columnListMenuItem
                    },
                    {
                        text         : 'No group',
                        itemId       : 'cleargrouping',
                        handler      : this.clearGrouping,
                        scope        : this
                    }
                ]
            );

            this.mon(menu, {
                'beforeshow' : this.onHeaderMenuBeforeShow,

                scope : this
            });
        }
    },

    onHeaderMenuBeforeShow : function (menu) {
        var column                 = menu.up('gridcolumn'),
            aggregatedMenuColumn   = this.getAggregatedGroupingMenuColumn(),
            isAggregatedMenuColumn = column === aggregatedMenuColumn,
            groupedColumn          = aggregatedMenuColumn.groupedColumn,
            groupByThisFieldItem   = menu.down('#groupbythisfield'),
            groupByItem            = menu.down('#groupby'),
            clearGroupingItem      = menu.down('#cleargrouping'),
            allowGroupingColumns   = this.gantt.lockedGrid.headerCt.query('gridcolumn[allowGrouping=true]');

        // "Group on this field" entry:
        //  - visible if grouping by this columns is allowed
        //  - checked if we currently group by this column
        groupByThisFieldItem.setVisible(column.allowGrouping);
        groupByThisFieldItem.setChecked(column === groupedColumn, true);
        // "Group by" submenu (aggregated grouping menu) is visible for the corresponding column only (namecolumn by default)
        groupByItem.setVisible(isAggregatedMenuColumn && allowGroupingColumns.length);
        // "No group" entry is visible if there are collumns allowing grouping
        clearGroupingItem.setVisible(allowGroupingColumns.length);

        // If it's a coulmn w/ aggregated grouping menu
        // and there are columns that allow grouping -
        // let's fill the column menu with entries from all the groupable columns
        if (isAggregatedMenuColumn && allowGroupingColumns.length) {
            groupByItem.suspendLayouts();

            groupByItem.menu.removeAll();

            groupByItem.menu.add(
                Ext.Array.map(allowGroupingColumns, function (col) {
                    return {
                        text     : col.text,
                        columnId : col.id,
                        checked  : col === groupedColumn
                    };
                })
            );

            groupByItem.resumeLayouts(true);
        }
    },

    /**
     * Groups the Gantt chart by the column in a single level hierarchy.
     * @param {Ext.grid.column.Column} [column] Pass column to group records by or leave empty to clear grouping.
     */
    groupByColumn : function (column) {
        var gantt     = this.gantt,
            taskStore = gantt.crudManager.getTaskStore(),
            groupProperty;

        /**
         * @event beforegroupchange
         * Fires before a column grouping is performed, return false to cancel the operation.
         *
         * @param {Gnt.panel.Gantt} gantt The gantt panel instance
         * @param {Ext.grid.Column} column The column being grouped on. Column is null, if grouping was removed
         * @preventable
         */
        if (gantt.fireEvent('beforegroupchange', gantt, column, this) === false) return;

        if (column) {
            groupProperty = column.fieldProperty && taskStore.getModel().prototype[column.fieldProperty];

            if (!groupProperty) {
                groupProperty = function (task) {
                    return (column.getGroupValue && column.getGroupValue(task)) ||
                        (column.renderer && column.renderer(task.get(column.dataIndex), {}, task)) ||
                        task.get(column.dataIndex);
                };
            }
        }

        this.getAggregatedGroupingMenuColumn().groupedColumn = column;

        // let's call taskStore experimental "groupBy" method
        if (taskStore.groupBy(groupProperty || null) === false) {
            // Deferred grouping
            if (!taskStore.isLoaded || taskStore.isLoading) {
                this.mon(taskStore, {
                    load : {
                        fn     : function () {
                            this.groupByColumn(column);
                        },
                        scope  : this,
                        single : true
                    }
                });
            }

            // If no grouping could be performed, reset name column property
            this.getAggregatedGroupingMenuColumn().groupedColumn = null;

            // if groupBy call succeeded
        } else {
            // if we've enabled grouping, let's make the panel readOnly
            if (groupProperty) {
                // let's remember the panel readOnly state (if we haven't done it already)
                if (typeof gantt._readOnly != 'boolean') {
                    gantt._readOnly = this.gantt.isReadOnly();
                }

                gantt.setReadOnly(true);

                // let's make the panel editable
            } else {
                gantt.setReadOnly(this.gantt._readOnly);
                delete gantt._readOnly;
            }
        }

        /**
         * @event groupchange
         * Fires after a column grouping changes - grouping field changed or grouping is removed.
         *
         * @param {Gnt.panel.Gantt} gantt The gantt panel instance
         * @param {Ext.grid.Column} column The column that was grouped on. Value is falsy, when grouping is removed
         */
        gantt.fireEvent('groupchange', gantt, column, this);
    },

    /**
     * Clears the column grouping and reverts to the regular treeview
     */
    clearGrouping : function () {
        this.groupByColumn();
        Ext.Array.each(Ext.ComponentQuery.query('menucheckitem[group=' + this.columnsGroupName + ']'), function (item) {
            item.setChecked(false);
        });
    },

    getAggregatedGroupingMenuColumn : function () {
        return this.gantt.lockedGrid.headerCt.down('namecolumn');
    }

});
