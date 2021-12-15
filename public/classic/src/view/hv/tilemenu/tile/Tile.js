/**
 * Created by kko on 31.05.21.
 */
Ext.define('MyApp.view.hv.tilemenu.tile.Tile', {
    extend: 'Ext.panel.Panel',

    requires: [
        'MyApp.view.hv.tilemenu.tile.TileController',
    ],

    xtype: 'hvTile',

    controller: 'hvTile',

    bodyCls: 'tile-panel',

    border: false,

    // margin: 5,

    height: 100,

    userCls: 'small-100 medium-50 large-33',

    listeners: {
        afterrender: 'onAfterRender',
        click: {
            element: 'el',
            fn: 'onClick'
        }
    },

    tpl: '<div class="tile-image-container"><span class="{iconCls}" style="font-size:36px;color:#fff"/></div>' +
        '<div class="tile-details-container-simple">' +
        // '<div>' + 'dddd' + '</div>' +
        '<div>{text}</div>' +
        '</div>'
});
