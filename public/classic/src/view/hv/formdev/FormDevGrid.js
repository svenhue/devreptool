/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.formdev.FormDevGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.hv.formdev.FormDevGridController',
        'MyApp.view.hv.formdev.FormDevModel'
    ],

    xtype: 'hvFormDevGrid',

    viewModel: {
        type: 'hvFormDevGrid'
    },

    controller: 'hvFormDevGrid',

    stateId: 'tmExahvFormDevGridmGrid',

    editClass: 'MyApp.view.hv.formdev.FormDevEdit',
    editPostId: 'HVFormDev',
    modelClass: 'MyApp.model.hv.HVFormDev',

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
                }
            ]
        });

        me.callParent(arguments);
    }
});
