/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.stock.StockEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'MyApp.view.tm.stock.StockEditController',
        'MyApp.view.tm.stock.StockEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmStockEdit',
    */

    viewModel: {
        type: 'tmStockEdit'
    },

    controller: 'tmStockEdit',

    objCaption: 'Lager',

    fieldDefaults: {
        labelWidth: 160,
        anchor: '100%'
    },

    layout: 'fit',

    items: [
        {
            xtype: 'tabpanel',
            plain: true,
            ui: 'view-tabpanel',
            tabBar: {
                xtype: 'tabbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    pack: 'center'
                }
            },

            layout: 'fit',
            padding: '0 0 0 0',
            bodyPadding: '5 0 0 0',
            defaults: {
                padding: '5 0 0 0',
                cls: 'border-top'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'anchor',
                    title: 'Allgemein',
                    bodyPadding: 10,
                    ui: 'fieldgroup-panel',
                    userCls: 'big-100 small-100 shadow',

                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kennung*',
                            reference: 'ident',
                            enforceMaxLength: true,
                            maxLength: 60,
                            bind: {
                                value: '{currentRecord.ident}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Bezeichnung',
                            reference: 'term',
                            enforceMaxLength: true,
                            maxLength: 120,
                            bind: {
                                value: '{currentRecord.term}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Gebäude',
                            reference: 'tm_building_id',
                            name: 'tm_building_id',
                            displayField: 'ident',
                            minChars: 2,
                            queryMode: 'remote',
                            valueField: 'id',
                            bind: {
                                value: '{currentRecord.tm_building_id}',
                                store: '{BuildingStore}'
                            }
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Beschreibung',
                            reference: 'description',
                            enforceMaxLength: true,
                            maxLength: 512,
                            bind: {
                                value: '{currentRecord.description}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Lagerplätze',
                    reference: 'tmStoragePlaceGrid',
                    bind: {
                        store: '{StockStoragePlaceStore}'
                    },

                    viewConfig: {
                        enableTextSelection: true
                    },

                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Neu',
                                    iconCls: 'far fa-file',
                                    listeners: {
                                        click: 'onNewStoragePlaceClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Löschen',
                                    iconCls: 'far fa-trash-alt',
                                    listeners: {
                                        click: 'onDeleteStoragePlacelick'
                                    },
                                    bind: {
                                        disabled: '{!tmStoragePlaceGrid.selection}'
                                    }
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Kürzel',
                            dataIndex: 'ident',
                           width: 140,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 20
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Bezeichnung',
                            dataIndex: 'term',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 60
                            }
                        }
                    ],
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        }
                    ],
                    listeners: {
                        afterrender: 'onStoragePlaceAfterRender'
                    }
                },
            ]
        }
    ]
});
