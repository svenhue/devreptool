/**
 * Created by kko on 2019-11-04.
 */
Ext.define('MyApp.view.hv.report.ReportEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'Ext.ux.IFrame',
        'MyApp.view.hv.report.ReportEditController',
        'MyApp.view.hv.report.ReportEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'reportedit',
    */

    viewModel: {
        type: 'hvReportEdit'
    },

    controller: 'hvReportEdit',

    scrollable: true,

    layout: 'fit',

    objCaption: 'Report',

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
                    layout: 'anchor',
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
                                value: '{currentRecord.ident}',
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kennung',
                            reference: 'uuid',
                            readOnly: true,
                            ui: 'readonly-textfield',
                            bind: {
                                value: '{currentRecord.uuid}',
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'URL',
                            reference: 'url',
                            readOnly: true,
                            ui: 'readonly-textfield',
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
                },
                {
                    xtype: 'panel',
                    title: 'Design',
                    layout: 'fit',
                    ui: 'fieldgroup-panel',
                    userCls: 'big-100 small-100 shadow',
                    items: [
                        {
                            xtype: 'uxiframe',
                            reference: 'designer',
                            flex: 1,
                            listeners: {
                                load: 'onIFrameLoaded'
                            }
                        }
                    ],
                    listeners: {
                        activate: 'onDesignerActivate'
                    }
                }
            ]
        }
    ]
});