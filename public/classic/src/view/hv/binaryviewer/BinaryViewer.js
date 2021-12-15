/**
 * Created by kko on 30.04.20.
 */
Ext.define('MyApp.view.hv.binaryviewer.BinaryViewer', {
    extend: 'Ext.Window',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Card',
        'MyApp.lib.ux.PDFViewer',
        'MyApp.view.hv.binaryviewer.BinaryViewerController',
        'MyApp.view.hv.binaryviewer.BinaryViewerModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'binaryviewer',
    */

    viewModel: {
        type: 'binaryviewer'
    },

    controller: 'binaryviewer',

    title: 'Viewer',
    modal: true,

    width: 700,
    height: 590,

    layout: 'card',

    items: [
        {
            xtype: 'container',
            scrollable: 'y',
            // layout: 'fit',
            padding: 5,
            items: [
                {
                    xtype: 'image',
                    style: 'max-width:100%;height:auto',
                    src: '',
                    reference: 'image'
                }
            ]
        },
        {
            xtype: 'PDFViewer',
            reference: 'pdf',
        }
    ],
    listeners: {
        afterrender: 'onAfterRender'
    }
});