/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Widget',
        'MyApp.view.hv.report.ReportGridController',
        'MyApp.view.hv.report.ReportGridModel'
    ],

    xtype: 'hvReportGrid',

    viewModel: {
        type: 'hvReportGrid'
    },

    controller: 'hvReportGrid',

    stateId: 'hvReportGrid',

    editClass: 'MyApp.view.hv.report.ReportEdit',
    editPostId: 'HVReport',
    modelClass: 'MyApp.model.hv.HVReport',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Report',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 260,
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
                },
                {
                    xtype: 'widgetcolumn',
                    width: 60,
                    widget:
                        {
                            xtype: 'button',
                            margin: 2,
                            width: 32,
                            iconCls: 'fa fa-edit',
                            listeners: {
                                click: 'onItemClick'
                            }
                        }

                }
            ]
        });

        me.callParent(arguments);
    }
});
