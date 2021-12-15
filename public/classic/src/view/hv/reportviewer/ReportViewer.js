/**
 * Created by kko on 2018-12-02.
 */
Ext.define('MyApp.view.hv.reportviewer.ReportViewer', {
    extend: 'Ext.panel.Panel',

    requires: [
        'MyApp.view.hv.reportviewer.ReportViewerController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvReportViewer',
    */

    controller: 'hvReportViewer',

    iconCls: 'far fa-file-chart-line',

    initComponent: function (config) {
        let me = this,
            id = me.getViewModel().get('id'),
            report = me.getViewModel().get('report'),
            data = me.getViewModel().get('data'),
            alias = me.getViewModel().get('reportAlias');

        Ext.apply(me, config || {

            // title: 'Ansicht',

            items: [
                {
                    xtype: 'component',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        src: 'lib/report/viewer.html?_dc=' + Ext.Date.format(new Date(), 'YmdHis') + '&report=' + report + "&id=" + id + "&data=" + data + "&alias=" + alias
                    }
                }
            ]
        });
        me.callParent(arguments);

    },

    listeners: {
        afterrender: 'onAfterRender'
    }
});
