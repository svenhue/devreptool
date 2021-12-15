/**
 * Created by kko on 31.05.21.
 */
Ext.define('MyApp.view.hv.tilemenu.tile.TileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvTile',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {

    },

    onClick: function () {
        let me = this,
            view = me.getView();
        view.ownerCt.getController().menuItemClick(view.data.id);

    }
});
