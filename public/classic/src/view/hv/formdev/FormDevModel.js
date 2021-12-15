/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.formdev.FormDevModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvFormDevGrid',

    requires: [
        'MyApp.model.hv.HVFormDev',
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVFormDev',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 60,
            sorters: [
                {
                    property: 'ident',
                    direction: 'asc'
                }
            ]
        }
    },

    data: {}
});
