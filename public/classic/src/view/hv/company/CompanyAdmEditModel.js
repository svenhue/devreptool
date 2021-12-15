/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.view.hv.company.CompanyAdmEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.hvCompanyAdmEdit',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Rest',
        'MyApp.model.hv.HVCountry'
    ],

    stores: {
        CountryStore: {
            model: 'MyApp.model.hv.HVCountry',
            autoLoad: true,
            pageSize: 300,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                    property: 'sort_id',
                    direction: 'asc'
                },
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        },
        MenuStore: {
            type: 'tree',
            remoteFilter: true,
            autoLoad: false,
            proxy: {
                type: 'rest',
                timeout: 90000,
                url: '/api/hv/usergroups/menu',
            },
            fields: [{
                    type: 'string',
                    name: 'id'
                },
                {
                    type: 'string',
                    name: 'text'
                },
                {
                    type: 'string',
                    name: 'iconCls'
                },
                {
                    type: 'string',
                    name: 'class'
                },
                {
                    type: 'string',
                    name: 'type'
                },
                {
                    type: 'boolean',
                    name: 'closable'
                },
                {
                    type: 'boolean',
                    name: 'leaf'
                },
                {
                    type: 'boolean',
                    name: 'expanded'
                },
                {
                    type: 'boolean',
                    name: 'autostart'
                },
                {
                    type: 'boolean',
                    name: 'checked'
                }
            ]
        }
    },

    formulas: {

        recordCaption: {
            bind: '{currentRecord.ident} - {currentRecord.name_1}',
            get: function (ident) {
                return ident ? ident : '* Neu *';
            }
        },

        toolbarCaption: {
            bind: '{currentRecord.ident} - {currentRecord.name_1}',
            get: function (ident) {
                return ident ? ident : '* Neu *';
            }
        }
    },

    data: {}
});
