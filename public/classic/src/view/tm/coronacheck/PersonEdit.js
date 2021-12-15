/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.coronacheck.PersonEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.panel.Panel',
        'MyApp.view.tm.coronacheck.PersonEditController',
        'MyApp.view.tm.coronacheck.PersonEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmPersonEdit',
    */

    viewModel: {
        type: 'tmPersonEdit'
    },

    controller: 'tmPersonEdit',

    objCaption: 'Person',

    fieldDefaults: {
        // labelAlign: 'top',
        anchor: '100%',
        labelWidth: 130,
    },

    items: [
        {
            xtype: 'panel',
            layout: 'anchor',
            bodyPadding: 10,
            ui: 'fieldgroup-panel',
            userCls: 'big-100 small-100 shadow',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nachname*',
                    reference: 'ident',
                    enforceMaxLength: true,
                    maxLength: 60,
                    bind: {
                        value: '{currentRecord.lastname}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Vorname',
                    reference: 'firstname',
                    enforceMaxLength: true,
                    maxLength: 60,
                    bind: {
                        value: '{currentRecord.firstname}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Barcode',
                    reference: 'code',
                    enforceMaxLength: true,
                    maxLength: 30,
                    bind: {
                        value: '{currentRecord.code}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Personalbereich',
                    reference: 'staff_section',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.staff_section}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Personalteilbereich',
                    reference: 'staff_sub_section',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.staff_sub_section}',
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Zuordnung',
                    reference: 'assignment',
                    enforceMaxLength: true,
                    maxLength: 80,
                    bind: {
                        value: '{currentRecord.assignment}',
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Status',
                    bind: {
                        store: '{VaccinationStatusStore}',
                        value: '{currentRecord.tm_cc_vaccination_status_id}'
                    },
                    valueField: 'id',
                    displayField: 'ident',
                    queryMode: 'local',
                    listeners: {
                        select: 'onVaccinationStatusSelect',
                        change: 'onVaccinationStatusChange'
                    }
        },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Impfschutz ab',
                    reference: 'vaccination_protection_at',
                    bind: {
                        value: '{currentRecord.vaccination_protection_at}',
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Boosterimpfung',
                    reference: 'vaccination_3_at',
                    bind: {
                        value: '{currentRecord.vaccination_3_at}',
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'genesen ab',
                    reference: 'recovered_at',
                    bind: {
                        value: '{currentRecord.recovered_at}',
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Bemerkungen',
                    reference: 'notes',
                    enforceMaxLength: true,
                    maxLength: 240,
                    bind: {
                        value: '{currentRecord.notes}'
                    }
                }
            ]
        }]
});
