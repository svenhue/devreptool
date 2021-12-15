Ext.define('MyApp.override.filterbar.FilterBar', {
    override: 'Ext.grid.plugin.filterbar.FilterBar',

    createColumnFilter: function (column) {

        if (column.filter) {
            column.setFilterType(column.filter);
            delete column.filter;
        }

        let filter = column.getFilterType(),
            config = {
                grid: this.getGrid(),
                column: column,
                owner: this
            };

        if (!filter) {
            config.type = 'none';
            filter = Ext.Factory.gridFilterbar(config);
        } else if (!filter.isGridFilter) {
            filter.updateBuffer = 1000;
            filter.fieldDefaults = {
                selectOnFocus: false,
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        handler: function () {
                            this.setValue();
                        },
                        hidden: true,
                        scope: 'this'
                    }
                },
                listeners: {
                    scope: 'this',
                    change: function (field, value) {
                        let me = this;
                        if (me.rendered) {
                            field.triggers.clear.setVisible(value !== field.originalValue);
                        }
                    }
                }
            };

            if (Ext.isString(filter)) {
                config.type = filter;
            } else {
                Ext.apply(config, filter);
            }

            filter = Ext.Factory.gridFilterbar(config);
        }

        column.setFilterType(filter);

        return filter;
    },

});
