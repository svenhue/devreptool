/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.user.UserGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.grid.column.Template',
        'MyApp.view.hv.user.UserGridController',
        'MyApp.view.hv.user.UserGridModel'
    ],

    xtype: 'hvUserGrid',

    viewModel: {
        type: 'hvUserGrid'
    },

    controller: 'hvUserGrid',

    stateId: 'hvUserGrid',

    editClass: 'MyApp.view.hv.user.UserEdit',
    editPostId: 'HVUser',
    modelClass: 'MyApp.model.hv.HVUser',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Kennung',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 120,
                    filterType: {
                        type: 'string',
                        operator: 'like',

                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Nachname',
                    dataIndex: 'lastname',
                    stateId: 'lastname',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Vorname',
                    dataIndex: 'firstname',
                    stateId: 'firstname',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Benutzergruppe',
                    dataIndex: 'user_group_ident',
                    stateId: 'user_group_ident',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Ressourcetype',
                    dataIndex: 'resource_type_ident',
                    stateId: 'resource_type_ident',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    text: 'Portal',
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            text: 'Zugriff',
                            dataIndex: 'web_access',
                            stateId: 'web_access',
                            align: 'center',
                            width: 100,
                            tpl: '<tpl if="web_access==1"><span class="fa fa-check"/></tpl>',
                            filterType: {
                                type: 'boolean',
                                operator: '='
                            },
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'ltzt. Zugriff',
                            dataIndex: 'last_access_at',
                            stateId: 'last_access_at',
                            width: 145,
                            format: 'd.m.Y H:i:s'
                        }
                    ]
                },
                {
                    text: 'App',
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            text: 'Zugriff',
                            dataIndex: 'mobile_device_access',
                            stateId: 'mobile_device_access',
                            align: 'center',
                            width: 100,
                            tpl: '<tpl if="mobile_device_access==1"><span class="fa fa-check"/></tpl>',
                            filterType: {
                                type: 'boolean',
                                operator: '='
                            },
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'ltzt. Zugriff',
                            dataIndex: 'last_mobile_access_at',
                            stateId: 'last_mobile_access_at',
                            width: 145,
                            format: 'd.m.Y H:i:s'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'App-Version',
                            dataIndex: 'app_version',
                            stateId: 'app_version',
                            hidden: true,
                            width: 120
                        },
                        {
                            xtype: 'templatecolumn',
                            text: 'OS-Version',
                            dataIndex: 'mobile_os_version',
                            stateId: 'mobile_os_version',
                            width: 120,
                            hidden: true,
                            tpl: '{os} {os_version}'
                        }

                    ]
                }

            ]
        });

        me.callParent(arguments);
    }
});
