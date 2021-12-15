/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.hvReportGrid',

    requires: [
        'MyApp.view.hv.reportviewer.ReportViewer'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onItemDblClick: function (component, record, item, index, e) {
        let me = this;

        localStorage.setItem('report_' + record.get('id'), record.get('definition'));

        MyApp.modulePanel.removeView('m_report_' + record.get('id'));

        let module = Ext.create('MyApp.view.hv.reportviewer.ReportViewer', {
            id: 'm_report_' + record.get('id'),
            title: record.get('ident'),
            closable: true,
            viewModel: {
                data: {
                    id: record.get('id'),
                    report: null,
                    data: null
                }
            }
        });

        MyApp.modulePanel.addView(module);

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onItemClick: function (component, e) {
    let me = this,
        view = me.getView(),
        record = component.getWidgetRecord();
    if (view.editClass) {
        let viewId = view.editPostId + '_' + record.get('id');
        if (!MyApp.modulePanel.viewExists(viewId))
            MyApp.modulePanel.addView(Ext.create(view.editClass, {
                id: viewId,
                iconCls: view.iconCls,
                closable: true,
                viewModel: {
                    data: {
                        currentRecord: record
                    }
                }
            }));
    }
    }
});
