/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.usergroup.UserGroupGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvUserGroupGrid',

    requires: [
        'MyApp.model.hv.HVUserGroup'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVUserGroup',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 60,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        }
    },

    data: {}
});