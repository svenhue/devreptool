/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.abstract.AbstractGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.abstractgrid',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewBtnClick: function (component, e) {
        let me = this,
            view = me.getView();

        if (view.editClass)
            MyApp.modulePanel.addView(Ext.create(view.editClass, {
                iconCls: view.iconCls,
                closable: true,
                viewModel: {
                    data: {
                        store: me.getStore('Store'),
                        currentRecord: Ext.create(view.modelClass)
                    }
                }
            }));
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            record = view.getSelection()[0];

        Ext.deleteRecord(record, null);
        me.getViewModel().set('noSelection', true);

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onExportXLSBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            store = me.getStore('Store'),
            columns = [],
            filters = [],
            sorters = [];

        if (store.getCount() === 0) {
            Ext.showError('Keine Daten vorhanden!');
            return;
        }

        Ext.each(view.getColumns(), function (item, index, all) {
            if (!item.hidden) {
                column = {};
                column.dataIndex = item.dataIndex;
                column.text = item.text;
                column.xtype = item.xtype;
                columns.push(column);
            }
        });

        Ext.each(store.getFilters().items, function (item, index, all) {
            let filter = {};

            filter.property = item.getProperty();
            filter.value = item.getValue();
            filter.operator = item.getOperator();
            filters.push(filter);
        });

        Ext.each(store.getSorters().items, function (item, index, all) {
            let sort = {};

            sort.property = item.getProperty();
            sort.direction = item.getDirection();

            sorters.push(sort);
        });

        view.mask(Ext._wait);
        Ext.Ajax.request({
            url: store.getProxy().getUrl() + '/export',
            timeout: 90000,
            method: 'POST',
            params: {
                sort: Ext.encode(sorters),
                columns: Ext.encode(columns),
                filter: Ext.encode(filters),
                caption: view.title,
                limit: {}
            },
            success: function (response, opts) {
                view.unmask();
                let respObj = Ext.decode(response.responseText);
                if (respObj.success && respObj.filename !== '') {
                    Ext.download({
                        url: respObj.filename
                    });
                }
            },
            failure: function (response, opts) {
                view.unmask();
                Ext.showServerActionFailed();
            }
        });

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onExportGridDataBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            store = me.getStore('Store'),
            columns = [],
            filters = [],
            sorters = [];

        let exportAllowed = false;
        Ext.each(store.getFilters().items, function (item, index, all) {
            if (item.getProperty() === 'customer_ident') {
                if (item.getValue().length === 5) {
                    exportAllowed = true;
                }
            }
        });

        if (!exportAllowed) {
            Ext.showError('Bitte eine Kundennummer eingeben!');
            return;
        }

        Ext.Ajax.setTimeout(600000);

        if (store.getCount() === 0) {
            Ext.showError('Keine Daten vorhanden!');
            return;
        }

        Ext.each(view.getVisibleColumns(), function (item, index, all) {
            let column = {};
            column.dataIndex = item.dataIndex;
            column.text = (item.ownerCt.text ? item.ownerCt.text + ' ' + item.text : item.text);
            column.xtype = item.xtype;
            column.exportAsBoolean = item.exportAsBoolean;
            columns.push(column);
        });

        Ext.each(store.getFilters().items, function (item, index, all) {
            let filter = {};
            filter.property = item.getProperty();
            filter.value = item.getValue();
            filter.operator = item.getOperator();
            filters.push(filter);
        });

        Ext.each(store.getSorters().items, function (item, index, all) {
            let sort = {};
            sort.property = item.getProperty();
            sort.direction = item.getDirection();
            sorters.push(sort);
        });

        view.mask(Ext._wait);
        Ext.Ajax.request({
            url: store.getProxy().getUrl() + '/exportgrid',
            method: 'POST',
            params: {
                sort: Ext.encode(sorters),
                columns: Ext.encode(columns),
                filter: Ext.encode(filters),
                caption: view.title,
                limit: {}
            },
            success: function (response, opts) {
                view.unmask();
                let respObj = Ext.decode(response.responseText);
                if (respObj.success && respObj.filename !== '') {
                    Ext.download({
                        url: respObj.filename
                    });
                }
            },
            failure: function (response, opts) {
                view.unmask();
                Ext.showServerActionFailed();
            },
            callback: function () {
                Ext.Ajax.setTimeout(30000);
            }
        });
    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onItemDblClick: function (component, record, item, index, e) {
        let me = this,
            view = me.getView();

        if (view.editClass) {
            let viewId = view.editPostId + '_' + record.get('id');
            if (!MyApp.modulePanel.viewExists(viewId))
                MyApp.modulePanel.addView(Ext.create(view.editClass, {
                    id: viewId,
                    iconCls: view.iconCls,
                    closable: true,
                    viewModel: {
                        data: {
                            store: me.getStore('Store'),
                            currentRecord: record
                        }
                    }
                }));
        }
    },

    /**
     * @param {Ext.menu.Item} item
     * @param {Ext.event.Event} e
     */
    onResetBtnClick: function (item, e) {
        let me = this;
        me.getViewModel().set('noSelection', true);
        MyApp.modulePanel.resetView(me.getView());
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCloseBtnClick: function (component, e) {
        let me = this,
            view = me.getView();

        if (view.ownerCt && view.ownerCt.xtype === 'tabpanel')
            view.ownerCt.remove(view, true);
        else
            view.close();
    },

    /**
     * @param {Ext.selection.RowModel} component
     * @param {Ext.data.Model} record
     * @param {Number} index
     */
    onItemSelect: function (component, record, index) {
        let me = this;
        me.getViewModel().set('noSelection', false);
    },

    /**
     * @param {Ext.Component} component
     */
    onActivate: function (component) {
        let me = this,
            store = me.getStore('Store');

        if (!store.isLoaded())
            me.getStore('Store').load();
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            store = me.getStore('Store');

        if (!store.isLoaded())
            me.getStore('Store').load();
    },

});
