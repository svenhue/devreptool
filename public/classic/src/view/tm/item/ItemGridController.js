/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.item.ItemGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.tmItemGrid',

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
