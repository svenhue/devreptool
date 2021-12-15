/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.serviceprovider.ServiceProviderGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.tm.serviceprovider.ServiceProviderGridController',
        'MyApp.view.tm.serviceprovider.ServiceProviderGridModel'
    ],

    xtype: 'tmServiceProviderGrid',

    viewModel: {
        type: 'tmServiceProviderGrid'
    },

    controller: 'tmServiceProviderGrid',

    stateId: 'tmServiceProviderGrid',

    editClass: 'MyApp.view.tm.serviceprovider.ServiceProviderEdit',
    editPostId: 'TMServiceProvider',
    modelClass: 'MyApp.model.tm.TMServiceProvider',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Kürzel',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 120,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Name 1',
                    dataIndex: 'name_1',
                    stateId: 'name_1',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Name 2',
                    dataIndex: 'name_2',
                    stateId: 'name_2',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Ort',
                    dataIndex: 'city',
                    stateId: 'city',
                    minWidth: 120,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
            ]
        });

        me.callParent(arguments);
    }
});
