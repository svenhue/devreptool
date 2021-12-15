/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.view.hv.company.CompanyAdmGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvCompanyAdmGrid',

    requires: [
        'MyApp.model.hv.HVCompany'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVCompany',
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

    data: {}
});