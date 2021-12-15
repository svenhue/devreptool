/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.qualification.QualificationEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.panel.Panel',
        'MyApp.view.hv.qualification.QualificationEditController',
        'MyApp.view.hv.qualification.QualificationEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvQualificationEdit',
    */

    viewModel: {
        type: 'hvQualificationEdit'
    },

    controller: 'hvQualificationEdit',

    objCaption: 'Qualifikation',

    items: [{
        xtype: 'panel',
        layout: 'anchor',
        bodyPadding: 10,
        ui: 'fieldgroup-panel',
        userCls: 'big-100 small-100 shadow',
        items: [{
                xtype: 'textfield',
                fieldLabel: 'Bezeichnung*',
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
            }
        ]
    }]
});