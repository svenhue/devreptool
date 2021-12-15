/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.building.BuildingEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmBuildingEdit',

    requires: [
        'MyApp.model.hv.HVCountry',
        'MyApp.model.hv.HVFormDev',
        'MyApp.model.tm.TMBuildingBinary',
        'MyApp.model.tm.TMBuildingExam'
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

        BuildingBinaryStore: {
            model: 'MyApp.model.tm.TMBuildingBinary',
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

        BuildingExamStore: {
            model: 'MyApp.model.tm.TMBuildingExam',
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

        ExamStore: {
            model: 'MyApp.model.hv.HVFormDev',
            pageSize: 1000,
            autoLoad: true,
            remoteFilter: true,
            remoteSort: false,
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
