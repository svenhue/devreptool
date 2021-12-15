/**
 * Created by kko on 2019-08-13.
 */
Ext.define('MyApp.view.hv.resourcetype.ResourceTypeGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvResourceTypeGrid',

    requires: [
        'MyApp.model.hv.HVResourceType'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVResourceType',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});