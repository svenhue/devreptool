/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.item.ItemEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.tmItemEdit',

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
