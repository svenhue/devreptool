/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.system.SystemGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmSystemGrid',

    requires: [
        'MyApp.model.tm.TMSystem'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMSystem',
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
