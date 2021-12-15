/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Fit',
        'Ext.ux.IFrame',
        'MyApp.view.hv.dashboard.DashboardController',
        'MyApp.view.hv.dashboard.DashboardModel'
    ],

    xtype: 'hvDashboard',

    viewModel: {
        type: 'hvDashboard'
    },

    controller: 'hvDashboard',

    layout: 'fit',

    padding: 0,

    items: [
        {
            xtype: 'uxiframe',
            reference: 'viewer',
            padding: 0,
            flex: 1,
            loadMask: '',
            listeners: {
                load: 'onIFrameLoaded',
                beforeload: 'onIFrameBeforeLoad'
            }
        }
    ],
    listeners: {
        afterrender: 'onAfterRender',
        afterlayout: 'onAfterLayout',
    }
});