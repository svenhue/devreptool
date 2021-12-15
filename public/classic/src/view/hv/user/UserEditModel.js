/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.user.UserEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.hvUserEdit',

    requires: [
        'MyApp.model.hv.HVCountry',
        'MyApp.model.hv.HVQualification',
        'MyApp.model.hv.HVReport',
        'MyApp.model.hv.HVResourceType',
        'MyApp.model.hv.HVUserGroup'
    ],

    stores: {
        UserGroupStore: {
            model: 'MyApp.model.hv.HVUserGroup',
            autoLoad: true,
            pageSize: 200,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        },
        ResourceTypeStore: {
            model: 'MyApp.model.hv.HVResourceType',
            autoLoad: true,
            pageSize: 200,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        },
        QualificationStore: {
            model: 'MyApp.model.hv.HVQualification',
            autoLoad: true,
            pageSize: 200,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        },
        ReportStore: {
            model: 'MyApp.model.hv.HVReport',
            autoLoad: false,
            pageSize: 500,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        },
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
        }
    },

    data: {}
});