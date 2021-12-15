/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.stock.StockEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmStockEdit',

    requires: [
        'MyApp.model.tm.TMBuilding',
        'MyApp.model.tm.TMStockStoragePlace'
    ],

    stores: {
        BuildingStore: {
            model: 'MyApp.model.tm.TMBuilding',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

        StockStoragePlaceStore: {
            model: 'MyApp.model.tm.TMStockStoragePlace',
            pageSize: 1000,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: false,
            sorters: [
                {
                    property: 'id',
                    direction: 'asc'
                }
            ]
        },
    },

    data: {}
});
