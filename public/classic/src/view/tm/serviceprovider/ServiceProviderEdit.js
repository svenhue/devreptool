/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.serviceprovider.ServiceProviderEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'MyApp.view.tm.serviceprovider.ServiceProviderEditController',
        'MyApp.view.tm.serviceprovider.ServiceProviderEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmServiceProviderEdit',
    */

    viewModel: {
        type: 'tmServiceProviderEdit'
    },

    controller: 'tmServiceProviderEdit',

    objCaption: 'Dienstleister',

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
                    title: 'Allgemein',
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
                                    fieldLabel: 'Kürzel*',
                                    reference: 'ident',
                                    enforceMaxLength: true,
                                    maxLength: 60,
                                    bind: {
                                        value: '{currentRecord.ident}'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            bodyPadding: 10,
                            title: 'Adresse',
                            ui: 'fieldgroup-panel',
                            userCls: 'big-100 small-100 shadow',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name 1*',
                                    reference: 'name_1',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.name_1}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name 2',
                                    reference: 'name_2',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.name_2}'
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
                                    fieldLabel: 'Ort*',
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
                                    queryMode: 'local',
                                    valueField: 'id',
                                    editable: false,
                                    bind: {
                                        value: '{currentRecord.hv_country_id}',
                                        store: '{CountryStore}'
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Anpsrechpartner',
                    reference: 'tmContactGrid',
                    bind: {
                        store: '{ServiceProviderContactStore}'
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
                                        click: 'onNewContactClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Löschen',
                                    iconCls: 'far fa-trash-alt',
                                    listeners: {
                                        click: 'onDeleteContactClick'
                                    },
                                    bind: {
                                        disabled: '{!tmContactGrid.selection}'
                                    }
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: 'Ansprechpartner',
                            dataIndex: 'contact_person',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 80
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Funktion',
                            dataIndex: 'function_in_operation',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 80
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Telefon',
                            dataIndex: 'contact_phone',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 60
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Mobil',
                            dataIndex: 'contact_mobile',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 60
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'E-Mail',
                            dataIndex: 'contact_email',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                enforceMaxLength: true,
                                maxLength: 120
                            }
                        },
                    ],
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        }
                    ],
                    listeners: {
                        afterrender: 'onContactGridAfterRender'
                    }
                },
            ]
        }
    ]
});
