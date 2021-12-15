/**
 * Created by kko on 03.12.21.
 */
Ext.define('MyApp.view.tm.coronacheck.TestGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.grid.column.Template',
        'MyApp.view.tm.coronacheck.TestGridController',
        'MyApp.view.tm.coronacheck.TestGridModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmTestGrid',
    */

    viewModel: {
        type: 'tmTestGrid'
    },

    controller: 'tmTestGrid',

    stateId: 'tmTestGrid',

    editClass: 'MyApp.view.tm.coronacheck.TestItemEdit',
    editPostId: 'TMSCCTestItem',
    modelClass: 'MyApp.model.tm.TMCCTestItem',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'datecolumn',
                    text: 'Testzeitpunkt',
                    dataIndex: 'created_at',
                    stateId: 'created_at',
                    format: 'd.m.Y H:i:s',
                    width: 180,
                    filterType: {
                        type: 'date',
                        operator: '>='
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Personalbereich',
                    dataIndex: 'staff_section',
                    stateId: 'staff_section',
                    width: 220,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Personalnummer',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 140,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Nachname',
                    dataIndex: 'lastname',
                    stateId: 'lastname',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Vorname',
                    dataIndex: 'firstname',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Status',
                    dataIndex: 'status_1',
                    stateId: 'status_1',
                    width: 160,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'Status',
                    dataIndex: 'status_1',
                    stateId: 'status_icon',
                    align: 'center',
                    width: 80,
                    tpl: '<div>{status_icon}</div>',
                },
            ]
        });

        me.callParent(arguments);
    }
});
