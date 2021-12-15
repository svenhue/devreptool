/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.system.SystemEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.File',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Widget',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'MyApp.view.tm.system.SystemEditController',
        'MyApp.view.tm.system.SystemEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmSystemEdit',
    */

    viewModel: {
        type: 'tmSystemEdit'
    },

    controller: 'tmSystemEdit',

    objCaption: 'Anlage',

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
                    bodyPadding: 5,
                    ui: 'fieldgroup-panel',
                    // userCls: 'big-100 small-100 shadow',

                    fieldDefaults: {
                        labelWidth: 160,
                        anchor: '100%'
                    },

                    scrollable: true,

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
                                    fieldLabel: 'Bezeichnung*',
                                    reference: 'term',
                                    enforceMaxLength: true,
                                    maxLength: 120,
                                    bind: {
                                        value: '{currentRecord.term}'
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
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Hersteller',
                                    reference: 'manufacturer',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    bind: {
                                        value: '{currentRecord.manufacturer}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Modell',
                                    reference: 'model',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.model}'
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Baujahr',
                                    reference: 'construction_year',
                                    hideTrigger: true,
                                    bind: {
                                        value: '{currentRecord.construction_year}'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Wartungsvertrag',
                                    bind: {
                                        value: '{currentRecord.service_contract}'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'aktiv',
                                    bind: {
                                        value: '{currentRecord.is_active}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            title: 'Zuständigkeiten',
                            bodyPadding: 10,
                            ui: 'fieldgroup-panel',
                            userCls: 'big-100 small-100 shadow',

                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Dienstleister',
                                    reference: 'tm_service_provider_id',
                                    name: 'tm_service_provider_id',
                                    displayField: 'ident',
                                    minChars: 2,
                                    queryMode: 'remote',
                                    valueField: 'id',
                                    bind: {
                                        value: '{currentRecord.tm_service_provider_id}',
                                        store: '{ServiceProviderStore}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Betreuer',
                                    reference: 'tm_service_provider_contact_id',
                                    name: 'tm_service_provider_contact_id',
                                    displayField: 'contact_person',
                                    minChars: 2,
                                    queryMode: 'remote',
                                    valueField: 'id',
                                    bind: {
                                        value: '{currentRecord.tm_service_provider_contact_id}',
                                        store: '{ServiceProviderContactStore}'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            title: 'Standort',
                            bodyPadding: 10,
                            ui: 'fieldgroup-panel',
                            userCls: 'big-100 small-100 shadow',

                            items: [
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Fläche',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.area}',
                                    }

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Raum',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.room}',
                                    }
                                }

                                // {
                                //     xtype: 'combobox',
                                //     fieldLabel: 'Lager',
                                //     reference: 'tm_stock_id',
                                //     name: 'tm_stock_id',
                                //     displayField: 'ident',
                                //     minChars: 2,
                                //     queryMode: 'local',
                                //     valueField: 'id',
                                //     bind: {
                                //         value: '{currentRecord.tm_stock_id}',
                                //         store: '{StockStore}'
                                //     }
                                // },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Prüfungen',
                    reference: 'tmSystemExams',
                    bind: {
                        store: '{SystemExamStore}'
                    },

                    viewConfig: {
                        enableTextSelection: true
                    },

                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            // bind: {
                            //     hidden: '{finished}'
                            // },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Neu',
                                    iconCls: 'far fa-file',
                                    listeners: {
                                        click: 'onNewSystemExamClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Löschen',
                                    iconCls: 'far fa-trash-alt',
                                    listeners: {
                                        click: 'onDeleteSystemExamClick'
                                    },
                                    bind: {
                                        disabled: '{!tmSystemExams.selection}'
                                    }
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Protokoll',
                            dataIndex: 'exam_ident',
                            flex: 1,
                            editor: {
                                xtype: 'combobox',
                                bind: {
                                    store: '{ExamStore}'
                                },
                                valueField: 'ident',
                                displayField: 'ident',
                                queryMode: 'remote',
                                listeners: {
                                    select: 'onExamSelect',
                                    change: 'onExamChange'
                                }
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'ltzt. Prüfung',
                            dataIndex: 'last_exam_at',
                            format: 'd.m.Y',
                            width: 130,
                            editor: {
                                xtype: 'datefield',
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Prüfintervall (Monate)',
                            dataIndex: 'interval',
                            format: '0',
                            width: 160,
                            editor: {
                                xtype: 'numberfield',
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Vorlaufzeit (Tage)',
                            dataIndex: 'warning_time',
                            format: '0',
                            width: 160,
                            editor: {
                                xtype: 'numberfield',
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
                        afterrender: 'onExamGridAfterRender'
                    }
                },
                {
                    xtype: 'grid',
                    title: 'Dokumente',
                    reference: 'binaryGrid',

                    bind: {
                        store: '{SystemBinaryStore}'
                    },

                    viewConfig: {
                        enableTextSelection: true
                    },

                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Löschen',
                                    iconCls: 'far fa-trash-alt',
                                    listeners: {
                                        click: 'onDeleteDocBtnClick'
                                    },
                                    bind: {
                                        disabled: '{!binaryGrid.selection}'
                                    }
                                },
                                '-',
                                {
                                    xtype: 'filefield',
                                    reference: 'photofilefield',
                                    anchor: '100%',
                                    fieldLabel: 'Datei auswählen',
                                    flex: 1,
                                    buttonText: '...',
                                    emptyText: '*.jpg, *.jpeg, *.png, *.pdf',
                                    fileInputAttributes: {
                                        accept: 'image/*, application/pdf'
                                    },
                                    listeners: {
                                        change: 'onImageFieldChange'
                                    }
                                }
                            ]
                        },
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Datei',
                            dataIndex: 'filename_org',
                            width: 240
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Bezeichnung',
                            dataIndex: 'term',
                            flex: 1,
                            editor: {
                                enforceMaxLength: true,
                                maxLength: 120
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'hinzugefügt',
                            format: 'd.m.Y H:i:s',
                            dataIndex: 'created_at',
                            width: 150
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'hinzugefügt von',
                            dataIndex: 'user_ident',
                            width: 150
                        },
                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            width: 60,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                tooltip: 'Download',
                                iconCls: 'far fa-download',
                                listeners: {
                                    buffer: 1,
                                    click: function (button, event, eOpts) {
                                        let record = event.record;
                                        Ext.download({
                                            url: '/api/tm/systembinaries/' + record.get('id'),
                                            params: {token: MyApp.sessionToken}
                                        });
                                    }
                                }
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
                        itemdblclick: 'onBinaryGridItemDblClick',
                        afterrender: 'onBinaryGridAfterRender'
                    }
                },
            ]
        }
    ]
});
