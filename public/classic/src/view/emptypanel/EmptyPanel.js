/**
 * Created by kko on 2020-02-20.
 */
Ext.define('MyApp.view.emptypanel.EmptyPanel', {
    extend: 'Ext.Container',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.VBox',
        'MyApp.view.emptypanel.EmptyPanelController',
        'MyApp.view.emptypanel.EmptyPanelModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'emptypanel',
    */

    viewModel: {
        type: 'emptypanel'
    },

    controller: 'emptypanel',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [
        {
            xtype: 'container',
            style: 'font-size:22px; font-weight:bold; color:#8C8D8C',
            html: 'Dieses Modul ist noch ohne Funktion!'
        }
    ]
});