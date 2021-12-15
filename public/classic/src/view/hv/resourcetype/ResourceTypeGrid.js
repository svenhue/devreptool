/**
 * Created by kko on 2019-08-13.
 */
Ext.define('MyApp.view.hv.resourcetype.ResourceTypeGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Template',
        'MyApp.view.hv.resourcetype.ResourceTypeGridController',
        'MyApp.view.hv.resourcetype.ResourceTypeGridModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvResourceTypeGrid',
    */

    viewModel: {
        type: 'hvResourceTypeGrid'
    },

    controller: 'hvResourceTypeGrid',

    stateId: 'hvResourceTypeGrid',

    editClass: 'MyApp.view.hv.resourcetype.ResourceTypeEdit',
    editPostId: 'HVResourceType',
    modelClass: 'MyApp.model.hv.HVResourceType',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            columns: [{
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
                    minWidth: 100,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'templatecolumn',
                    text: 'E-Mail',
                    dataIndex: 'email_notification',
                    stateId: 'email_notification',
                    align: 'center',
                    width: 110,
                    tpl: '<tpl if="email_notification==1"><span class="fa fa-check"/></tpl>'
                },
                {
                    xtype: 'templatecolumn',
                    text: 'extern',
                    dataIndex: 'is_external',
                    stateId: 'is_external',
                    align: 'center',
                    width: 110,
                    tpl: '<tpl if="is_external==1"><span class="fa fa-check"/></tpl>'
                }
            ]
        });

        me.callParent(arguments);
    }
});
