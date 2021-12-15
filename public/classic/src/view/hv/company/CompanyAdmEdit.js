/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.view.hv.company.CompanyAdmEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'Ext.tree.Panel',
        'MyApp.view.hv.company.CompanyAdmEditController',
        'MyApp.view.hv.company.CompanyAdmEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvCompanyAdmEdit',
    */

    viewModel: {
        type: 'hvCompanyAdmEdit'
    },

    controller: 'hvCompanyAdmEdit',

    objCaption: 'Portal',

    layout: 'fit',

    fieldDefaults: {
        labelWidth: 180,
        anchor: '100%'
    },

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
            // cls: 'border-top',
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
                    layout: 'responsivecolumn',
                    scrollable: true,
                    bodyPadding: 5,
                    ui: 'fieldgroup-panel',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            bodyPadding: 10,
                            title: 'Unternehmen',
                            ui: 'fieldgroup-panel',
                            userCls: 'big-50 small-100 shadow',

                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zugangskennung*',
                                    reference: 'ident',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    bind: {
                                        value: '{currentRecord.ident}'
                                    }
                                },
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
                                    fieldLabel: 'Straße',
                                    reference: 'street',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.street}'
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    fieldLabel: 'PLZ / Ort',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            reference: 'destination_zip',
                                            width: 70,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            bind: {
                                                value: '{currentRecord.zip}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'destination_city',
                                            enforceMaxLength: true,
                                            margin: '0 0 0 5',
                                            maxLength: 80,
                                            flex: 1,
                                            bind: {
                                                value: '{currentRecord.city}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Land',
                                    reference: 'hv_country_id',
                                    anchor: '100%',
                                    valueField: 'id',
                                    displayField: 'ident',
                                    queryMode: 'remote',
                                    minChars: 2,
                                    bind: {
                                        store: '{CountryStore}',
                                        value: '{currentRecord.hv_country_id}'
                                    }

                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            bodyPadding: 10,
                            title: 'Kontaktdaten',
                            ui: 'fieldgroup-panel',
                            userCls: 'big-50 small-100 shadow',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ansprechpartner',
                                    reference: 'contact_person',
                                    enforceMaxLength: true,
                                    maxLength: 80,
                                    bind: {
                                        value: '{currentRecord.contact_person}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Telefon (Büro)',
                                    reference: 'contact_office_phone',
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    bind: {
                                        value: '{currentRecord.contact_office_phone}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Mobiltelefon (Büro)',
                                    reference: 'contact_office_mobile',
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    bind: {
                                        value: '{currentRecord.contact_office_mobile}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'E-Mail',
                                    reference: 'contact_office_email',
                                    enforceMaxLength: true,
                                    maxLength: 120,
                                    bind: {
                                        value: '{currentRecord.contact_office_email}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            bodyPadding: 10,
                            ui: 'fieldgroup-panel',
                            userCls: 'big-100 small-100 shadow',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Webseite',
                                reference: 'web',
                                enforceMaxLength: true,
                                maxLength: 80,
                                bind: {
                                    value: '{currentRecord.web}'
                                }
                            }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Konfiguration',
                    layout: 'fit',
                    padding: 10,
                    items: [
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Konfiguration (JSON)',
                            labelAlign: 'top',
                            flex: 1,
                            grow: true,
                            bind: {
                                value: '{currentRecord.config}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'anchor',
                    title: 'Menü',
                    // bodyPadding: 5,
                    ui: 'fieldgroup-panel',
                    // userCls: 'big-100 small-100 shadow',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'treepanel',
                            id: 'company_menu_tree_panel',
                            bodyBorder: false,
                            bind: {
                                store: '{MenuStore}'
                            },
                            rootVisible: false,
                            listeners: {
                                checkchange: 'onMenuCheckChange'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
