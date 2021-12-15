/**
 * Created by kko on 2019-11-07.
 */
Ext.define('MyApp.view.hv.dragpanel.DragPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Fit',
        'MyApp.view.hv.dragpanel.DragPanelController'
    ],

    xtype: 'dragpanel',

    controller: 'dragpanel',

    draggable: true,
    width: 500,
    height: 300,
    bodyCls: 'drag-file-ct',
    bodyPadding: 5,
    layout: 'fit',

    html: '<div class="drag-file-label">' +
        'Ziehe eine Datei in dieses Feld' +
        '</div>' +
        '<div class="drag-file-icon"></div>'
});