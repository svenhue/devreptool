/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.abstract.AbstractEdit', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.TextItem',
        'Ext.ux.layout.ResponsiveColumn',
        'MyApp.view.abstract.AbstractEditController',
        'MyApp.view.abstract.AbstractEditModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'abstractedit',
    */

    viewModel: {
        type: 'abstractedit'
    },

    controller: 'abstractedit',

    scrollable: true,

    layout: {
        type: 'responsivecolumn',
        states: {
            small: 1000
        }
    },

    fieldDefaults: {
        // labelAlign: 'top',
        anchor: '100%',
    },

    objCaption: 'Abstract',

    bind: {
        title: '{objCaption}:  {recordCaption:ellipsis(15)}'
    },

    initComponent: function (config) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        Ext.apply(me, config || {

            dockedItems: [
                {
                    xtype: 'toolbar',
                    reference: 'mainToolBar',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Schliessen',
                            iconCls: 'far fa-times',
                            listeners: {
                                click: 'onCloseBtnClick'
                            },
                            focusCls: false
                        },
                        '-',
                        {
                            xtype: 'tbtext',
                            reference: 'objCaption',
                            html: '<b>' + me.objCaption + '</b>:'
                        },
                        {
                            xtype: 'tbtext',
                            bind: {
                                html: '{toolbarCaption}',
                            },
                            reference: 'recordCaption',
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Löschen',
                            reference: 'deleteRecordBtn',
                            iconCls: 'far fa-trash-alt',
                            listeners: {
                                click: 'onDeleteBtnClick'
                            },
                            bind: {
                                disabled: '{currentRecord.phantom}'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Speichern',
                            reference: 'saveRecordBtn',
                            iconCls: 'far fa-save',
                            listeners: {
                                click: 'onSaveBtnClick'
                            }
                        }
                    ]
                }]

        });

        me.callParent(arguments);
    },
    listeners: {
        afterrender: 'onAfterRender',
        beforeclose: 'onBeforeClose'
    }
});