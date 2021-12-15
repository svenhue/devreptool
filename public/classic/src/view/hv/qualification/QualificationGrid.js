/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.qualification.QualificationGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.hv.qualification.QualificationGridController',
        'MyApp.view.hv.qualification.QualificationGridModel'
    ],

    xtype: 'hvQualificationGrid',

    viewModel: {
        type: 'hvQualificationGrid'
    },

    controller: 'hvQualificationGrid',

    stateId: 'hvQualificationGrid',

    editClass: 'MyApp.view.hv.qualification.QualificationEdit',
    editPostId: 'HVQualification',
    modelClass: 'MyApp.model.hv.HVQualification',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Bezeichnung',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 180,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Bemerkungen',
                    dataIndex: 'description',
                    stateId: 'description',
                    minWidth: 100,
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
