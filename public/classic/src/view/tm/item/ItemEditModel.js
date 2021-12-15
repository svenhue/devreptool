/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.item.ItemEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmItemEdit',

    requires: [
        'MyApp.model.tm.TMItemUnit'
    ],

    stores: {
        ItemUnitStore: {
            model: 'MyApp.model.tm.TMItemUnit',
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
    },

    data: {}
});
