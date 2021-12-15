/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.usergroup.UserGroupGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Template',
        'MyApp.view.hv.usergroup.UserGroupGridController',
        'MyApp.view.hv.usergroup.UserGroupGridModel'
    ],

    xtype: 'hvUserGroupGrid',

    viewModel: {
        type: 'hvUserGroupGrid'
    },

    controller: 'hvUserGroupGrid',

    stateId: 'hvUserGroupGrid',

    editClass: 'MyApp.view.hv.usergroup.UserGroupEdit',
    editPostId: 'HVUserGroup',
    modelClass: 'MyApp.model.hv.HVUserGroup',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Bezeichnung',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 180,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Bemerkungen',
                    dataIndex: 'description',
                    stateId: 'description',
                    width: 100,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'Adminstrator',
                    dataIndex: 'admin_access',
                    stateId: 'admin_access',
                    align: 'center',
                    width: 110,
                    tpl: '<tpl if="admin_access==1"><span class="fa fa-check"/></tpl>'
                }
            ]
        });

        me.callParent(arguments);
    }
});
