/**
 * Created by kko on 2019-08-09.
 */
Ext.define('MyApp.view.hv.user.UserProfileEdit', {
    extend: 'Ext.Window',

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Fill',
        'MyApp.view.hv.user.UserProfileEditController',
        'MyApp.view.hv.user.UserProfileEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvUserProfileEdit',
    */

    viewModel: {
        type: 'hvUserProfileEdit'
    },

    controller: 'hvUserProfileEdit',

    modal: true,
    height: 250,
    width: 400,

    resizable: false,

    iconCls: 'far fa-user',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            title: 'Anmeldedaten ändern',

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'tbfill'
                    },
                        {
                            xtype: 'button',
                            text: 'Abbrechen',
                            listeners: {
                                click: 'onCancelBtnClick'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Speichern',
                            listeners: {
                                click: 'onSaveBtnClick'
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    reference: 'form',
                    bodyPadding: 20,
                    fieldDefaults: {
                        anchor: '100%',
                        labelAlign: 'top',
                        enforceMaxLength: true
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Kennwort',
                        inputType: 'password',
                        allowBlank: false,
                        reference: 'passwd',
                        maxLength: 30,
                        bind: {
                            value: '{passwd}'
                        }
                    },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Wiederholung',
                            inputType: 'password',
                            allowBlank: false,
                            maxLength: 30,
                            bind: {
                                value: '{repeat}'
                            }
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    listeners: {
        afterrender: 'onAfterRender'
    }
});