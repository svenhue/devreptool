/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.system.SystemGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Template',
        'MyApp.view.tm.system.SystemGridController',
        'MyApp.view.tm.system.SystemGridModel'
    ],

    xtype: 'tmSystemGrid',

    viewModel: {
        type: 'tmSystemGrid'
    },

    controller: 'tmSystemGrid',

    stateId: 'tmSystemGrid',

    editClass: 'MyApp.view.tm.system.SystemEdit',
    editPostId: 'TMSystem',
    modelClass: 'MyApp.model.tm.TMSystem',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Kennung',
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
                    text: 'Bezeichnung',
                    dataIndex: 'term',
                    stateId: 'term',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Dienstleister',
                    dataIndex: 'service_provider_ident',
                    stateId: 'service_provider_ident',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Gebäude',
                    dataIndex: 'building_ident',
                    stateId: 'building_ident',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Lager',
                    dataIndex: 'stock_ident',
                    stateId: 'stock_ident',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'Wartung',
                    dataIndex: 'service_contract',
                    stateId: 'service_contract',
                    align: 'center',
                    width: 80,
                    tpl: '<tpl if="service_contract==1"><span class="fa fa-check"/></tpl>',
                    filterType: {
                        type: 'boolean',
                        operator: '='
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'aktiv',
                    dataIndex: 'is_active',
                    stateId: 'is_active',
                    align: 'center',
                    width: 80,
                    tpl: '<tpl if="is_active==1"><span class="fa fa-check"/></tpl>',
                    filterType: {
                        type: 'boolean',
                        operator: '='
                    },
                },
            ]
        });

        me.callParent(arguments);
    }
});
