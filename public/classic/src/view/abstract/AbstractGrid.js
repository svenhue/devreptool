/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.abstract.AbstractGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.grid.feature.Grouping',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'MyApp.view.abstract.AbstractGridController',
        'MyApp.view.abstract.AbstractGridModel'
    ],

    xtype: 'abstractgrid',

    viewModel: {
        type: 'abstractgrid'
    },

    controller: 'abstractgrid',

    stateful: true,

    reloadOnActivate: true,

    editPostId: null,
    editClass: null,
    modelClass: null,

    viewConfig : {
        enableTextSelection: true
    },
  

    enableLocking: true,

    bind: {
        store: '{Store}'
    },

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    reference: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Schliessen',
                            iconCls: 'far fa-times',
                            listeners: {
                                click: 'onCloseBtnClick'
                            },
                            focusCls: false,
                            hidden: !me.closable
                        },
                        {
                            xtype: 'tbseparator',
                            hidden: !me.closable
                        },
                        {
                            xtype: 'button',
                            reference: 'newRecordBtn',
                            text: 'Neu',
                            iconCls: 'far fa-file',
                            listeners: {
                                click: 'onNewBtnClick'
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'deleteRecordBtn',
                            text: 'Löschen',
                            iconCls: 'far fa-trash-alt',
                            bind: {
                                disabled: '{noSelection}'
                            },
                            listeners: {
                                click: 'onDeleteBtnClick'
                            }
                        },
                        '->',
                        {
                            xtype: 'button',
                            reference: 'exportRecordBtn',
                            text: 'Export',
                            iconCls: 'far fa-file-excel',
                            listeners: {
                                click: 'onExportXLSBtnClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    items: [
                        '-',
                        '->',
                        '-',
                        {
                            xtype: 'button',
                            iconCls: 'far fa-align-slash',
                            tooltip: 'Ansicht zurücksetzen',
                            listeners: {
                                click: 'onResetBtnClick'
                            }
                        },
                        '-'
                    ]
                }
            ],

            features: [
                {
                    ftype: 'grouping'
                }
            ],

            plugins: {
                gridfilterbar: true
            },
        });
        me.callParent(arguments);
    },

    listeners: {
        itemdblclick: 'onItemDblClick',
        select: 'onItemSelect',
        afterrender: 'onAfterRender',
        activate: 'onActivate'
    }

});
