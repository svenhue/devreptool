/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.serviceprovider.ServiceProviderGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmServiceProviderGrid',

    requires: [
        'MyApp.model.tm.TMServiceProvider'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMServiceProvider',
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
