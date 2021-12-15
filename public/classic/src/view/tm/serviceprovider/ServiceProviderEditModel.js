/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.serviceprovider.ServiceProviderEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmServiceProviderEdit',

    requires: [
        'MyApp.model.hv.HVCountry',
        'MyApp.model.tm.TMServiceProviderContact'
    ],

    stores: {
        CountryStore: {
            model: 'MyApp.model.hv.HVCountry',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'sort_id',
                    direction: 'asc'
                },
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

       ServiceProviderContactStore: {
            model: 'MyApp.model.tm.TMServiceProviderContact',
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
