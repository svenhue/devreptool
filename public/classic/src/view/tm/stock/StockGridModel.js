/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.stock.StockGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmStockGrid',

    requires: [
        'MyApp.model.tm.TMStock'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMStock',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 60,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        }
    },

    data: {}
});
