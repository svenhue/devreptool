/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.user.UserEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Tag',
        'Ext.form.field.Text',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'MyApp.view.hv.user.UserEditController',
        'MyApp.view.hv.user.UserEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvUserEdit',
    */

    viewModel: {
        type: 'hvUserEdit'
    },

    controller: 'hvUserEdit',

    objCaption: 'Benutzer',

    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%'
    },

    items: [
        {
            xtype: 'panel',
            layout: 'anchor',
            bodyPadding: 10,
            title: 'Persönliche Angaben',
            ui: 'fieldgroup-panel',
            userCls: 'big-50 small-100 shadow',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Kennnung*',
                    reference: 'ident',
                    enforceMaxLength: true,
                    maxLength: 30,
                    bind: {
                        value: '{currentRecord.ident}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nachname*',
                    reference: 'lastname',
                    enforceMaxLength: true,
                    maxLength: 60,
                    bind: {
                        value: '{currentRecord.lastname}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Vorname',
                    enforceMaxLength: true,
                    maxLength: 60,
                    bind: {
                        value: '{currentRecord.firstname}'
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'PLZ / Ort',
                    items: [
/*                        {
                            xtype: 'textfield',
                            reference: 'country_ident',
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 40,
                            bind: {
                                value: '{currentRecord.country_ident}'
                            }
                        },*/
                        {
                            xtype: 'textfield',
                            reference: 'zip',
                            width: 70,
                            margin: '0 0 0 0',
                            enforceMaxLength: true,
                            maxLength: 10,
                            bind: {
                                value: '{currentRecord.zip}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            reference: 'city',
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
                    xtype: 'combobox',
                    fieldLabel: 'Land*',
                    reference: 'hv_country_id',
                    name: 'hv_country_id',
                    displayField: 'ident',
                    minChars: 3,
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
        {
            xtype: 'panel',
            layout: 'anchor',
            bodyPadding: 10,
            title: 'Kommunikation',
            ui: 'fieldgroup-panel',
            userCls: 'big-50 small-100 shadow',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'E-Mail (Büro)',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.office_email}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telefon (Büro)',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.office_phone}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mobiletelefon (Büro)',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.office_mobile}'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'anchor',
            bodyPadding: 10,
            title: 'Anmeldedaten',
            ui: 'fieldgroup-panel',
            userCls: 'big-50 small-100 shadow',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Anmeldename',
                    reference: 'loginname',
                    enforceMaxLength: true,
                    maxLength: 20,
                    bind: {
                        value: '{currentRecord.loginname}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Kennwort',
                    reference: 'password',
                    enforceMaxLength: true,
                    maxLength: 20,
                    inputType: 'password'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Wiederholung Kennwort',
                    reference: 'repeat_password',
                    enforceMaxLength: true,
                    maxLength: 20,
                    inputType: 'password'
                }
            ]
        },
        {
            xtype: 'panel',
            userCls: 'big-50 small-100 shadow',
            title: 'Planung',
            ui: 'fieldgroup-panel',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Ressourcetyp',
                    reference: 'hv_resource_type_id',
                    anchor: '100%',
                    valueField: 'id',
                    displayField: 'ident',
                    queryMode: 'remote',
                    minChars: 2,
                    bind: {
                        store: '{ResourceTypeStore}',
                        value: '{currentRecord.hv_resource_type_id}'
                    },
                    listeners: {
                        change: 'onResourceTypeChange'
                    }

                },
                {
                    xtype: 'tagfield',
                    fieldLabel: 'Qualifikationen',
                    reference: 'qualifications',
                    bind: {
                        store: '{QualificationStore}',
                        value: '{currentRecord.qualifications}'
                    },
                    displayField: 'ident',
                    valueField: 'id'
                }
            ]
        },
        {
            xtype: 'panel',
            userCls: 'big-50 small-100 shadow',
            title: 'Einstellungen',
            ui: 'fieldgroup-panel',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Benutzergruppe*',
                    reference: 'hv_user_group_id',
                    anchor: '100%',
                    valueField: 'id',
                    displayField: 'ident',
                    queryMode: 'remote',
                    minChars: 2,
                    bind: {
                        store: '{UserGroupStore}',
                        value: '{currentRecord.hv_user_group_id}'
                    },
                    listeners: {
                        change: 'onUserGroupChange'
                    }

                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Dashboard',
                    reference: 'hv_report_id',
                    anchor: '100%',
                    valueField: 'id',
                    displayField: 'ident',
                    queryMode: 'remote',
                    minChars: 2,
                    bind: {
                        store: '{ReportStore}',
                        value: '{currentRecord.hv_report_id}'
                    },
                    listeners: {
                        change: 'onUserGroupChange'
                    }

                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Webzugang',
                    bind: {
                        value: '{currentRecord.web_access}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'App-Nutzung',
                    bind: {
                        value: '{currentRecord.mobile_device_access}'
                    }
                }
            ]
        }
    ]
});
