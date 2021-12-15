/**
 * Created by kko on 2018-12-02.
 */
Ext.define('MyApp.view.hv.reportviewer.ReportViewerWin', {
    extend: 'Ext.Window',

    requires: [
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'MyApp.view.hv.reportviewer.ReportViewerController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvReportViewerWin',
    */

    controller: 'hvReportViewer',


    width: 860,
    height: 700,
    closable: true,
    modal: true,

    initComponent: function (config) {
        let me = this,
            id = me.getViewModel().get('id'),
            report = me.getViewModel().get('report'),
            data = me.getViewModel().get('data'),
            alias = me.getViewModel().get('reportAlias');

        Ext.apply(me, config || {

            title: 'Ansicht',

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Schliessen',
                            listeners: {
                                click: 'onCancelBtnClick'
                            }
                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'component',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        src: 'report/viewer.html?_dc=' + Ext.Date.format(new Date(), 'YmdHis') + '&report=' + report + "&id=" + id + "&data=" + data + "&alias=" + alias
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