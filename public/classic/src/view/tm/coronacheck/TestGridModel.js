/**
 * Created by kko on 03.12.21.
 */
Ext.define('MyApp.view.tm.coronacheck.TestGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmTestGrid',

    requires: [
        'MyApp.model.tm.TMCCTest'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMCCTest',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 60,
            sorters: [
                {
                    property: 'created_at',
                    direction: 'asc'
                }
            ]
        }
    },

    data: {

    }
});
