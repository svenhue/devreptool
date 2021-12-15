/**
 * Created by kko on 03.12.21.
 */
Ext.define('MyApp.view.tm.coronacheck.PersonGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.tmPersonGrid',

    requires: [
        'MyApp.model.tm.TMCCPerson'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.tm.TMCCPerson',
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

    data: {
    }
});
