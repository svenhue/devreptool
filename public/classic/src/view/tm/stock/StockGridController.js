/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.stock.StockGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.tmStockGrid',

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

        // me.lookupReference('newRecordBtn').setHidden(true);
        // me.lookupReference('deleteRecordBtn').setHidden(true);

        me.callParent(arguments);
    }
});
