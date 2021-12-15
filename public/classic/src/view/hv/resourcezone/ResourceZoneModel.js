/**
 * Created by kko on 2020-01-23.
 */
Ext.define('MyApp.view.hv.resourcezone.ResourceZoneModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hvResourceZone',

    requires: [
        'MyApp.model.hv.HVResourceZone'
    ],

    stores: {
        ResourceZoneStore: {
            pageSize: 60,
            remoteFilter: true,
            remoteSort: false,
            autoLoad: false,
            model: 'MyApp.model.hv.HVResourceZone',
            sorters: {
                property: 'start_at',
                direction: 'desc'
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});