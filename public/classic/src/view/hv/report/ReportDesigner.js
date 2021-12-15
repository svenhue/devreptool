/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportDesigner', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Fit',
        'MyApp.view.hv.report.ReportDesignerController',
        'MyApp.view.hv.report.ReportDesignerModel'
    ],

    xtype: 'hvReportDesigner',

    viewModel: {
        type: 'hvReportDesigner'
    },

    controller: 'hvReportDesigner',

    layout: 'fit',

    items: [
        {
            xtype: 'component',
            flex: 1,
            autoEl: {
                tag: 'iframe',
                style: 'height: 100%; width: 100%; border: none',
                src: 'lib/report/designer.html?report=&data='
            }
        }
    ]
});
