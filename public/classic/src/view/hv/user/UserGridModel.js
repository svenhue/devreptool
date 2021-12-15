/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.user.UserGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvUserGrid',

    requires: [
        'MyApp.model.hv.HVUser'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVUser',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        }
    },

    data: {}
});