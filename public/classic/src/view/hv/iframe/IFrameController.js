/**
 * Created by kko on 03.07.20.
 */
Ext.define('MyApp.view.hv.iframe.IFrameController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvIframe',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            url = me.getView().url;

        me.lookupReference('myframe').load(url);
    }
});