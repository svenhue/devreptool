/**
 * Created by kko on 2020-01-23.
 */
Ext.define('MyApp.view.hv.resourcezone.ResourceZone', {
    extend: 'Ext.Window',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.TextItem',
        'MyApp.view.hv.resourcezone.ResourceZoneController',
        'MyApp.view.hv.resourcezone.ResourceZoneModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvResourceZone',
    */

    viewModel: {
        type: 'hvResourceZone'
    },

    controller: 'hvResourceZone',

    width: 800,
    height: 500,

    modal: true,

    layout: 'fit',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            title: 'Abwesenheiten',

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Abbrechen',
                            listeners: {
                                click: 'onCancelBtnClick'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Speichern',
                            listeners: {
                                click: 'onSaveBtnClick'
                            }
                        }

                    ]
                }
            ],

            items: [
                {
                    xtype: 'grid',
                    reference: 'resourceZonelist',
                    bind: {
                        store: '{ResourceZoneStore}'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            padding: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'far fa-file',
                                    listeners: {
                                        click: 'onZoneAddBtnClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'far fa-trash',
                                    bind: {
                                        disabled: '{!resourceZonelist.selection}'
                                    },
                                    listeners: {
                                        click: 'onZoneDeleteBtnClick'
                                    }
                                },
                                '->',
                                {
                                    xtype: 'tbtext',
                                    bind: '{currentRecord.lastname}, {currentRecord.firstname}',
                                    margin: '0'
                                },
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Bezeichnung',
                            flex: 1,
                            dataIndex: 'ident',
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                selectOnFocus: true,
                                displayField: 'text',
                                valueField: 'text',
                                store: [
                                    {
                                        text: 'abwesend'
                                    },
                                    {
                                        text: 'ausser Haus'
                                    },
                                    {
                                        text: 'krank'
                                    },
                                    {
                                        text: 'Urlaub'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'von Datum',
                            width: 140,
                            dataIndex: 'start_at',
                            dateFormat: 'd.m.Y',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: false,
                                selectOnFocus: true,
                            }

                        },
                        {
                            xtype: 'datecolumn',
                            text: 'Uhrzeit',
                            format: 'H:i',
                            dataIndex: 'start_time',
                            editor: {
                                xtype: 'timefield',
                                allowBlank: false,
                                selectOnFocus: true,
                            }

                        },
                        {
                            xtype: 'datecolumn',
                            text: 'bis Datum',
                            width: 140,
                            dateFormat: 'd.m.Y',
                            dataIndex: 'end_at',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: false,
                                selectOnFocus: true,
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'Uhrzeit',
                            format: 'H:i',
                            dataIndex: 'end_time',
                            editor: {
                                xtype: 'timefield',
                                allowBlank: false,
                                selectOnFocus: true,
                            }
                        }
                    ],
                    plugins: {
                        rowediting: {
                            clicksToMoveEditor: 1,
                            autoCancel: true,
                            errorSummary: false
                        }
                    },
                    listeners: {
                        edit: 'onZoneAfterEdit',
                        canceledit: 'onZoneCancelEdit'
                    }
                }
            ]
        });
        me.callParent(arguments);
    },

    listeners: {
        afterrender: 'onAfterRender'
    }
});