/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.resourcetype.ResourceTypeEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.panel.Panel',
        'MyApp.view.hv.resourcetype.ResourceTypeEditController',
        'MyApp.view.hv.resourcetype.ResourceTypeEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvResourceTypeEdit',
    */

    viewModel: {
        type: 'hvResourceTypeEdit'
    },

    controller: 'hvResourceTypeEdit',

    objCaption: 'Ressourcetyp',

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
                    fieldLabel: 'Bezeichnung*',
                    defaultFocus: true,
                    reference: 'ident',
                    enforceMaxLength: true,
                    maxLength: 60,
                    bind: {
                        value: '{currentRecord.ident}',
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Bemerkungen',
                    reference: 'description',
                    enforceMaxLength: true,
                    maxLength: 240,
                    bind: {
                        value: '{currentRecord.description}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Externe Resource',
                    bind: {
                        value: '{currentRecord.is_external}'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'E-Mail Benachrichtigung',
                    bind: {
                        value: '{currentRecord.email_notification}'
                    }
                }
            ]
        }
    ]
});