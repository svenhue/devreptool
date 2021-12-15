/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.hvReportEdit',

    designerLoaded: false,

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onDesignerActivate: function (component) {
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

    onSaveBtnClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        currentRecord.set('definition', localStorage.getItem('design_' + currentRecord.get('id')));

        me.callParent(component);

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        if (currentRecord.phantom) {
            currentRecord.set('uuid', Ext.generateUUID());
        }

        localStorage.setItem('design_' + currentRecord.get('id'), currentRecord.get('definition'));

        // me.lookupReference('url').setValue('https://printcop-ts.de/dxnt1/public/api/hv/reportviewer?id=' + currentRecord.get('uuid'));

        me.lookupReference('designer').src = 'lib/report/designer.html?_dc=' + Ext.Date.format(new Date(), 'YmdHis') + '&id=' + currentRecord.get('id') + '&report=' + currentRecord.get('ident');

        me.callParent(component);
    }

});
