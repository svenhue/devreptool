/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.system.SystemEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmSystemEdit',

    requires: [
        'MyApp.model.hv.HVFormDev',
        'MyApp.model.tm.TMBuilding',
        'MyApp.model.tm.TMServiceProvider',
        'MyApp.model.tm.TMServiceProviderContact',
        'MyApp.model.tm.TMStock',
        'MyApp.model.tm.TMSystemBinary',
        'MyApp.model.tm.TMSystemExam'
    ],

    stores: {
        BuildingStore: {
            model: 'MyApp.model.tm.TMBuilding',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

        ServiceProviderContactStore: {
            model: 'MyApp.model.tm.TMServiceProviderContact',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

        StockStore: {
            model: 'MyApp.model.tm.TMStock',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

        ServiceProviderStore: {
            model: 'MyApp.model.tm.TMServiceProvider',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },

        SystemBinaryStore: {
            model: 'MyApp.model.tm.TMSystemBinary',
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

        SystemExamStore: {
            model: 'MyApp.model.tm.TMSystemExam',
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
