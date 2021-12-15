/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.usergroup.UserGroupEdit', {
    extend: 'MyApp.view.abstract.AbstractEdit',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'Ext.tree.Panel',
        'MyApp.view.hv.usergroup.UserGroupEditController',
        'MyApp.view.hv.usergroup.UserGroupEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvUserGroupEdit',
    */

    viewModel: {
        type: 'hvUserGroupEdit'
    },

    controller: 'hvUserGroupEdit',

    objCaption: 'Benutzergruppe',

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
                    bodyPadding: 5,
                    ui: 'fieldgroup-panel',
                    // userCls: 'big-100 small-100 shadow',
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
                            boxLabel: 'Administrator',
                            bind: {
                                value: '{currentRecord.admin_access}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'anchor',
                    title: 'Menü',
                    bodyPadding: 5,
                    ui: 'fieldgroup-panel',
                    // userCls: 'big-100 small-100 shadow',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'treepanel',
                            // id: 'ug_menu_tree_panel',
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
