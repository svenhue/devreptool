/**
 * Created by kko on 03.12.21.
 */
Ext.define('MyApp.view.tm.coronacheck.PersonGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Template',
        'MyApp.view.tm.coronacheck.PersonGridController',
        'MyApp.view.tm.coronacheck.PersonGridModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmPersonGrid',
    */

    viewModel: {
        type: 'tmPersonGrid'
    },

    controller: 'tmPersonGrid',

    stateId: 'tmPersonGrid',

    editClass: 'MyApp.view.tm.coronacheck.PersonEdit',
    editPostId: 'TMSCCPerson',
    modelClass: 'MyApp.model.tm.TMCCPerson',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Personalnummer',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    minWidth: 180,
                    flex: 1,
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
                    stateId: 'firstname',
                    width: 180,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Personalbereich',
                    dataIndex: 'staff_section',
                    stateId: 'staff_section',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Personalteilbereich',
                    dataIndex: 'staff_sub_section',
                    stateId: 'staff_sub_section',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Ausweisnummer',
                    dataIndex: 'code',
                    stateId: 'code',
                    width: 120,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Impfstatus',
                    dataIndex: 'status_ident',
                    stateId: 'status_ident',
                    width: 180,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'Testpflicht',
                    dataIndex: 'test_needed',
                    stateId: 'test_needed',
                    align: 'center',
                    width: 100,
                    tpl: '<tpl if="test_needed==1"><span class="fa fa-check"/></tpl>',
                    filterType: {
                        type: 'boolean',
                        operator: '='
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Notizen',
                    dataIndex: 'notes',
                    stateId: 'notes',
                    width: 180,
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
