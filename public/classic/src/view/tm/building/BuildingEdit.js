/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.building.BuildingEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
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
        'MyApp.view.abstract.AbstractPositionGrid',
        'MyApp.view.tm.building.BuildingEditController',
        'MyApp.view.tm.building.BuildingEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmBuildingEdit',
    */

    viewModel: {
        type: 'tmBuildingEdit'
    },

    controller: 'tmBuildingEdit',

    objCaption: 'Gebäude',

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
                            xtype: 'textfield',
                            fieldLabel: 'Strasse',
                            reference: 'street',
                            enforceMaxLength: true,
                            maxLength: 80,
                            bind: {
                                value: '{currentRecord.street}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PLZ',
                            reference: 'zip',
                            enforceMaxLength: true,
                            maxLength: 10,
                            bind: {
                                value: '{currentRecord.zip}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Ort',
                            reference: 'city',
                            enforceMaxLength: true,
                            maxLength: 80,
                            bind: {
                                value: '{currentRecord.city}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Land',
                            reference: 'hv_country_id',
                            name: 'hv_country_id',
                            displayField: 'ident',
                            minChars: 2,
                            queryMode: 'remote',
                            valueField: 'id',
                            editable: false,
                            bind: {
                                value: '{currentRecord.hv_country_id}',
                                store: '{CountryStore}'
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
                    ]
                },
                {
                    xtype: 'positiongrid',
                    title: 'Prüfungen',
                    modelClass: 'MyApp.model.tm.TMBuildingExam',
                    reference: 'tmBuildingExams',
                    bind: {
                        store: '{BuildingExamStore}'
                    },

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
                    listeners: {
                        afterrender: 'onExamGridAfterRender'
                    }
                },
                {
                    xtype: 'grid',
                    title: 'Dokumente',
                    reference: 'binaryGrid',

                    bind: {
                        store: '{BuildingBinaryStore}'
                    },

                    viewConfig: {
                        enableTextSelection: true
                    },

                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            // style: 'border-bottom: 1px #CBCBCB solid !important',
                            // bind: {
                            //     hidden: '{finished}'
                            // },
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
                                            url: '/api/tm/buildingbinaries/' + record.get('id'),
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
