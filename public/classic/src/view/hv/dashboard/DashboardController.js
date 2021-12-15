/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvDashboard',

    designerLoaded: false,

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.container.Container} component
     * @param {Ext.layout.container.Container} layout
     */
    onAfterLayout: function (component, layout) {
        let me = this,
            view = me.getView();

        if (!me.designerLoaded)
            view.mask(Ext._wait);
    },

    onIFrameLoaded: function () {
        let me = this,
            view = me.getView();

        if (!me.designerLoaded) {
            view.unmask();
            me.designerLoaded = true;
        }
    },

    onIFrameBeforeLoad: function () {
        return true;
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;

        me.lookupReference('viewer').load('lib/report/dash.html?_dc=' + Ext.Date.format(new Date(), 'YmdHis') + '&report=dash');

    }
});
