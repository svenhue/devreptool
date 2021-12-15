/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.formdev.FormDevGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.hvFormDevGrid',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;
        me.callParent(arguments);
    }
});
