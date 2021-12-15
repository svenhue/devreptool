/**
 * Created by kko on 25.11.21.
 */
Ext.define('MyApp.view.tm.mapping.UniversalMapOverviewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tmUniversalMapOverview',

    requires: [
        'MyApp.model.tm.TMUniversalTour',
        'MyApp.model.tm.TMUniversalTrackingUnit'
    ],

    stores: {
        UnitStore: {
            model: 'MyApp.model.tm.TMUniversalTrackingUnit',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: false,
            remoteSort: false,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ],
            listeners: {
                load: 'onUnitStoreLoad'
            }
        },

        TourStore: {
            model: 'MyApp.model.tm.TMUniversalTour',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: false,
            remoteSort: false,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ],
            listeners: {
                load: 'onTourStoreLoad'
            }
        }
    },

    data: {
        unitFilter: null,
        unitTypeFilter: null,
        allUnitsFilter: true,
        drivingUnitsFilter: false,
        standingUnitsFilter: false
    }
});
