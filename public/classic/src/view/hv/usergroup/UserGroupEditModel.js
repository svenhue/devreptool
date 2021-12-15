/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.usergroup.UserGroupEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.hvUserGroupEdit',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Rest'
    ],

    stores: {
        MenuStore: {
            type: 'tree',
            remoteFilter: true,
            autoLoad: false,
            proxy: {
                type: 'rest',
                url: '/api/hv/usergroups/menu',
            },
            fields: [{
                    type: 'string',
                    name: 'id'
                },
                {
                    type: 'string',
                    name: 'text'
                },
                {
                    type: 'string',
                    name: 'iconCls'
                },
                {
                    type: 'string',
                    name: 'class'
                },
                {
                    type: 'string',
                    name: 'type'
                },
                {
                    type: 'boolean',
                    name: 'closable'
                },
                {
                    type: 'boolean',
                    name: 'leaf'
                },
                {
                    type: 'boolean',
                    name: 'expanded'
                },
                {
                    type: 'boolean',
                    name: 'autostart'
                },
                {
                    type: 'boolean',
                    name: 'checked'
                }
            ]
        }
    },

    data: {}
});