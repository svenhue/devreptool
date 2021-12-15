/**
 * Created by kko on 2019-08-05.
 */
Ext.define('MyApp.view.hv.trackmap.TrackMapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hvTrackMap',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'MyApp.model.hv.HVResource',
        'MyApp.model.hv.HVWayPoint'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVWayPoint',
            autoLoad: false,
            remoteFilter: false,
            remoteSort: false,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }],
            listeners: {
                load: 'onTrackLoad'
            }
        },

        ResourceStore: {
            pageSize: 200,
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            model: 'MyApp.model.hv.HVResource',
            sorters: {
                property: 'ident'
            },
            proxy: {
                type: 'rest',
                url: '/api/hv/mobileresources',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        userId: null,
        hv_user_Id: null,
        date: null,
    }
});