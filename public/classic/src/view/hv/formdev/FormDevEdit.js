/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.formdev.FormDevEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.column.Check',
        'Ext.grid.column.Column',
        'Ext.grid.column.Number',
        'Ext.grid.column.Template',
        'Ext.grid.plugin.DragDrop',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'MyApp.view.abstract.AbstractPositionGrid',
        'MyApp.view.hv.formdev.FormDevEditController',
        'MyApp.view.hv.formdev.FormDevEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvFormDevEdit',
    */

    viewModel: {
        type: 'hvFormDevEdit'
    },

    controller: 'hvFormDevEdit',

    objCaption: 'Prüfprotokoll',

    fieldDefaults: {
        labelWidth: 160,
        anchor: '100%'
    },

    layout: 'fit',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
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
                                    fieldLabel: 'Bezeichnung*',
                                    reference: 'ident',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    bind: {
                                        value: '{currentRecord.ident}'
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
                            xtype: 'positiongrid',
                            title: 'Elemente',
                            modelClass: 'MyApp.model.hv.HVFormDevItem',
                            reference: 'hvFormInputTypeGrid',
                            bind: {
                                store: '{FormDevItemStore}'
                            },

                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragText: 'Sortierung'
                                    }
                                ]
                            },

                            columns: [
                                {
                                    xtype: 'templatecolumn',
                                    width: 35,
                                    tpl: '<span class="fas fa-bars dd"/>',
                                    resizable: false
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Bezeichnung',
                                    dataIndex: 'term',
                                    flex: 1,
                                    minWidth: 200,
                                    allowBlank: false,
                                    editor: {
                                        xtype: 'textfield',
                                        enforceFieldLength: true,
                                        maxLength: 120
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Eingabetyp',
                                    dataIndex: 'input_type_ident',
                                    flex: 1,
                                    minWidth: 260,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{InputTypeStore}'
                                        },
                                        minChars: 2,
                                        valueField: 'ident',
                                        displayField: 'ident',
                                        queryMode: 'local',
                                        allowBlank: false,
                                        listeners: {
                                            select: function (combo, record) {
                                                me.getController().onInputTypeSelect(combo, record);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: 'Länge',
                                    dataIndex: 'input_len',
                                    width: 100,
                                    align:'right',
                                    format:'0',
                                    editor: {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        enforceFieldLength: true,
                                        maxLength: 120
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Vorgabe / Auswahl',
                                    dataIndex: 'content',
                                    flex: 1,
                                    minWidth: 150,
                                    editor: {
                                        xtype: 'textfield',
                                        enforceFieldLength: true,
                                        maxLength: 120
                                    }
                                },
                                {
                                    xtype: 'checkcolumn',
                                    text: 'Pflicht',
                                    dataIndex: 'is_mandatory',
                                    editor: {
                                        xtype: 'checkbox'
                                    }
                                },
                                {
                                    xtype: 'checkcolumn',
                                    text: 'nur lesend',
                                    dataIndex: 'read_only',
                                    editor: {
                                        xtype: 'checkbox'
                                    }
                                },
                                {
                                    xtype: 'checkcolumn',
                                    text: 'sichtbar',
                                    dataIndex: 'visible_in_detail',
                                    width: 110,
                                    editor: {
                                        xtype: 'checkbox'
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: 'onFormInputTypeGridAfterRender',
                                drop: 'onFormInputTypeDrop'
                            }
                        },
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});
