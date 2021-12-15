/**
 * Created by kko on 25.05.21.
 */
Ext.define('MyApp.view.hv.tilemenu.TileMenu', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.panel.Panel',
        'Ext.toolbar.Separator',
        'Ext.ux.layout.ResponsiveColumn',
        'MyApp.view.hv.tilemenu.TileMenuController',
        'MyApp.view.hv.tilemenu.TileMenuModel'
    ],

    xtype: 'hvTileMenu',

    viewModel: {
        type: 'hvTileMenu'
    },

    controller: 'hvTileMenu',

    layout: {
        type: 'responsivecolumn',
        states: {
            small: 800,
            medium: 1250,
            large: 0
        }
    },

    scrollable: 'vertical',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            title: 'Menü',

            bodyPadding: 10,

            dockedItems: [
                {
                    xtype: 'toolbar',
                    reference: 'toolbar',
                    style: 'border-bottom: 1px solid #ECEEEE !important',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Zurück',
                            iconCls: 'fa fa-chevron-left',
                            listeners: {
                                click: 'onBackBtnClick'
                            },
                            focusCls: false,
                            bind: {
                                disabled: '{levelModuleId == "root"}',
                                iconCls: '{iconCls}'
                            }
                        },
                        '-',
                        {
                            xtype: 'label',
                            bind: {
                                text: '{levelText}',
                            }
                        }
                    ]
                }
            ],


        });

        me.callParent(arguments);
    },
    listeners: {
        afterrender: 'onAfterRender'
    }

});
