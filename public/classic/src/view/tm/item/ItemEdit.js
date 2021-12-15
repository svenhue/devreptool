/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.item.ItemEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.panel.Panel',
        'MyApp.view.tm.item.ItemEditController',
        'MyApp.view.tm.item.ItemEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'tmItemEdit',
    */

    viewModel: {
        type: 'tmItemEdit'
    },

    controller: 'tmItemEdit',

    objCaption: 'Artikel',

    fieldDefaults: {
        labelWidth: 160,
        anchor: '100%'
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
                    fieldLabel: 'Artikel*',
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
                    xtype: 'combobox',
                    fieldLabel: 'Einheit',
                    reference: 'tm_item_unit_id',
                    name: 'tm_building_id',
                    displayField: 'ident',
                    minChars: 2,
                    queryMode: 'local',
                    valueField: 'id',
                    bind: {
                        value: '{currentRecord.tm_item_unit_id}',
                        store: '{ItemUnitStore}'
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Mindestmenge',
                    reference: 'minimum_stock',
                    enforceMaxLength: true,
                    maxLength: 512,
                    bind: {
                        value: '{currentRecord.minimum_stock}'
                    }
                },

            ]
        }]
});
