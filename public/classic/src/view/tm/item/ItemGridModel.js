/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.item.ItemGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmItemGrid',

    requires: [
        'MyApp.model.tm.TMItem'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMItem',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 60,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        }
    },

    data: {}
});
