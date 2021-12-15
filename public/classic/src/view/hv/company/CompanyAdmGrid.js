/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.view.hv.company.CompanyAdmGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.hv.company.CompanyAdmGridController',
        'MyApp.view.hv.company.CompanyAdmGridModel'
    ],

    xtype: 'hvCompanyAdmGrid',

    viewModel: {
        type: 'hvCompanyAdmGrid'
    },

    controller: 'hvCompanyAdmGrid',

    stateId: 'hvCompanyAdmGrid',

    editClass: 'MyApp.view.hv.company.CompanyAdmEdit',
    editPostId: 'HVCompanyAdmin',
    modelClass: 'MyApp.model.hv.HVCompany',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Zugangskennung',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 100,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Name',
                    dataIndex: 'name_1',
                    stateId: 'name_1',
                    width: 100,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                }
            ]
        });

        me.callParent(arguments);
    }
});
