/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.building.BuildingGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmBuildingGrid',

    requires: [
        'MyApp.model.tm.TMBuilding'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMBuilding',
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
