/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.formdev.FormDevEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.hvFormDevEdit',

    requires: [
        'MyApp.model.hv.HVFormDevItem',
        'MyApp.model.hv.HVInputType'
    ],

    stores: {
        FormDevItemStore: {
            model: 'MyApp.model.hv.HVFormDevItem',
            pageSize: 1000,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'sort_id',
                    direction: 'asc'
                }
            ]
        },
        InputTypeStore: {
            model: 'MyApp.model.hv.HVInputType',
            pageSize: 1000,
            autoLoad: true,
            remoteFilter: false,
            remoteSort: false,
            sorters: [
                {
                    property: 'sort_id',
                    direction: 'asc'
                }
            ]
        },
    },

    data: {}
});
