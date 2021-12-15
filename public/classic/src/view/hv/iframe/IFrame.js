/**
 * Created by kko on 03.07.20.
 */
Ext.define('MyApp.view.hv.iframe.IFrame', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Fit',
        'Ext.ux.IFrame',
        'MyApp.view.hv.iframe.IFrameController',
        'MyApp.view.hv.iframe.IFrameModel'
    ],

    xtype: 'hvIframe',

    viewModel: {
        type: 'hvIframe'
    },

    controller: 'hvIframe',

    layout: 'fit',

    padding: 0,

    items: [
        {
            xtype: 'uxiframe',
            reference: 'myframe',
            padding: 0,
            flex: 1,
            loadMask: 'Bitte warten...'
        }
    ],
    listeners: {
        afterrender: 'onAfterRender'
    }
});