/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvReportGrid',

    requires: [
        'MyApp.model.hv.HVReport'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVReport',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});