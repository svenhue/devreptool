/**
 * Created by kko on 2018-12-02.
 */
Ext.define('MyApp.view.hv.reportviewer.ReportViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvReportViewer',

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
            view = me.getView();

        Ext.defer(function () {
            view.mask(Ext._wait);
        }, 10);


        Ext.defer(function () {
            view.unmask()
        }, 1000);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCancelBtnClick: function (component, e) {
        let me = this;
        me.getView().close();
    }
});