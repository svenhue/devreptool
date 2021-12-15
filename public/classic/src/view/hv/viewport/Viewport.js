/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.hv.viewport.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Ext.layout.container.Center',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.menu.CheckItem',
        'Ext.menu.Item',
        'Ext.menu.Menu',
        'Ext.menu.Separator',
        'Ext.panel.Panel',
        'Ext.state.Manager',
        'Ext.tab.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Toolbar',
        'Ext.tree.Panel',
        'Ext.ux.TabCloseMenu',
        'Ext.ux.TabReorderer',
        'MyApp.view.hv.ViewportController',
        'MyApp.view.hv.ViewportModel'
    ],

    xtype: 'hvViewport',

    viewModel: {
        type: 'hvViewport'
    },

    controller: 'hvViewport',

    id: 'hvViewport',

    treePanelId: 'hv_main_menu_tree_panel',

    layout: 'card',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            ui: 'login-panel',
                            hidden: true,
                            reference: 'loginPanel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            width: 300,
                            defaults: {
                                anchor: '100%'
                            },
                            bodyPadding: 20,

                            items: [
                                {
                                    xtype: 'label',
                                    html: '<div class="login-title">ANMELDUNG</div>'
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'company',
                                    name: 'company',
                                    emptyText: 'Kundennummer',
                                    enforceMaxLength: 20,
                                    maxLength: 20,
                                    listeners: {
                                        specialkey: 'onSpecialKey'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'ln',
                                    name: 'ln',
                                    emptyText: 'Anmeldename',
                                    enforceMaxLength: 20,
                                    maxLength: 20,
                                    listeners: {
                                        specialkey: 'onSpecialKey'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'pwd',
                                    name: 'pwd',
                                    emptyText: 'Kennwort',
                                    inputType: 'password',
                                    enforceMaxLength: 20,
                                    maxLength: 20,
                                    listeners: {
                                        specialkey: 'onSpecialKey'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Anmelden',
                                    ui: 'login-button',
                                    margin: '10 0 0 0',
                                    listeners: {
                                        click: 'onLoginBtnClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'center',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'image',
                                    bind: {
                                        src: '{logoImage}',
                                        width: '{logoWidth}',
                                        height: '{logoHeight}'
                                    }
                                }
                            ],
                            // dockedItems: [
                            //     {
                            //         xtype: 'toolbar',
                            //         dock: 'bottom',
                            //         layout: 'center',
                            //         items: [
                            //             {
                            //                 xtype: 'tbtext',
                            //                 bind: {
                            //                     html: '{copyRight}'
                            //                 }
                            //             }
                            //         ]
                            //     }
                            // ]
                        },

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'border',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            height: 60,
                            dock: 'top',
                            ui: 'top-toolbar',
                            defaults: {
                                ui: 'top-toolbar',
                            },
                            padding: '0 0 0 15',
                            items: [
                                // {
                                //     xtype: 'button',
                                //     ui: 'bag-button',
                                //     iconCls: 'far fa-align-justify',
                                //     listeners: {
                                //         click: 'onToogleMenu'
                                //     }
                                // },
                                {
                                    xtype: 'image',
                                    bind: {
                                        src: '{logoImageSmall}',

                                    },
                                    height: 40
                                },
                                '->',
                                {
                                    xtype: 'tbtext',
                                    bind: {
                                        text: '{companyName}'
                                    }
                                },
                                '-',
                                {
                                    xtype: 'tbtext',
                                    bind: {
                                        text: '{userName}'
                                    }
                                },
                                {
                                    xtype: 'splitbutton',
                                    iconCls: 'far fa-cog',
                                    menuAlign: 'tr-br?',
                                    ui: 'top-toolbar-button',
                                    menu: {
                                        xtype: 'menu',
                                        width: 200,
                                        bodyPadding: 5,
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                text: 'Desktop speichern',
                                                iconCls: 'fa fa-save',
                                                margin: '0 0 0 5',
                                                listeners: {
                                                    click: 'onSaveDesktopBtnClick'
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                text: 'Anmeldedaten ändern',
                                                iconCls: 'fa fa-user',
                                                margin: '0 0 0 5',
                                                listeners: {
                                                    click: 'onChangeLoginDataBtnClick'
                                                }
                                            },
                                            '-',
                                            {
                                                xtype: 'menucheckitem',
                                                text: 'Kachelmenü',
                                                reference: 'tileMenuBtn',
                                                bind: {
                                                    checked: '{useTileMenu}'
                                                },
                                                listeners: {
                                                    click: 'onCheckTileMenuBtnClick'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'far fa-power-off',
                                    ui: 'top-toolbar-button',
                                    tooltip: 'Abmelden',
                                    listeners: {
                                        click: 'onLogoutBtnClick'
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'treepanel',
                            region: 'west',
                            title: 'Menü',
                            header: false,
                            reference: 'menuPanel',
                            useArrows: true,
                            collapsible: true,
                            rootVisible: false,
                            split: true,
                            collapseMode: 'mini',
                            bodyPadding: '8 0 0 0',
                            ui: 'menu-panel',
                            id: me.treePanelId,
                            width: 250,
                            scrollable: 'y',
                            bind: {
                                store: 'NavigationStore'
                            },
                            listeners: {
                                itemclick: 'onTreeMenuItemClick',
                                focusleave: 'onTreeMenuFocusLeave'

                            }
                            // dockedItems: [
                            //     {
                            //         xtype: 'toolbar',
                            //         dock: 'bottom',
                            //         margin: '3 0 10 0',
                            //         items: [
                            //             {
                            //                 xtype: 'textfield',
                            //                 emptyText: 'Menüsuche',
                            //                 border: false,
                            //                 flex:1,
                            //                 listeners: {
                            //                     change: 'onMenuSearchChange'
                            //                 }
                            //             }
                            //         ]
                            //     }
                            // ],

                        },
                        {
                            xtype: 'container',
                            reference: 'emptyPanel',
                            layout: 'card',
                            region: 'center',
                            margin: '10 10 10 0',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'center',
                                    items: [
                                        {
                                            xtype: 'image',
                                            bind: {
                                                src: '{logoImage}',
                                                width: '{logoWidth}',
                                                height: '{logoHeight}'
                                            }
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            layout: 'center',
                                            items: [
                                                {
                                                    xtype: 'tbtext',
                                                    bind: {
                                                        html: '{copyRight}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tabpanel',
                                    reference: 'modulePanel',
                                    plugins: [
                                        {
                                            ptype: 'tabclosemenu',
                                            extraItemsTail: [
                                                {
                                                    xtype: 'menuseparator',
                                                    itemId: 'standaloneSep',
                                                },
                                                {
                                                    xtype: 'menuitem',
                                                    itemId: 'standalone',
                                                    text: 'als eigener Tab',
                                                    listeners: {
                                                        click: 'onDedicatedTabBtnClick'
                                                    }
                                                }
                                            ],
                                            listeners: {
                                                beforemenu: 'onTabCloseMenuBeforeMenu'
                                            }
                                        },
                                        {
                                            ptype: 'tabreorderer'
                                        },

                                    ],

                                    removeView: function (id) {
                                        let view = Ext.getCmp(id);
                                        if (view) {
                                            this.remove(view);
                                        }
                                    },

                                    viewExists: function (id) {
                                        let view = Ext.getCmp(id);
                                        if (view) {
                                            this.setActiveItem(view);
                                            return view;
                                        } else return false;
                                    },

                                    addView: function (view, index) {
                                        if (index || index <= 0)
                                            this.insert(index, view);
                                        else
                                            this.add(view);
                                        this.setActiveItem(view);
                                    },

                                    addViewById: function (id, index, params) {
                                        let me = this,
                                            store = MyApp.mainView.getController().getStore('NavigationStore'),
                                            view = me.viewExists(id),
                                            record = store.getNodeById(id);

                                        if (record) {
                                            if (!view) {

                                                if (!params) params = {};

                                                params.id = id;
                                                params.title = record.get('text');
                                                params.iconCls = record.get('iconCls');
                                                params.closable = record.get('closable');

                                                view = Ext.create(record.get('moduleClass'), params);

                                                if (index || index === 0)
                                                    this.insert(index, view);
                                                else
                                                    this.add(view);
                                                this.setActiveItem(view);
                                            }
                                        }
                                        return view;
                                    },

                                    resetView: function (view) {
                                        let me = this,
                                            id = view.getId(),
                                            title = view.getTitle(),
                                            iconCls = view.getIconCls(),
                                            closable = view.getClosable(),
                                            className = view.$className,
                                            pos = me.items.indexOf(view),
                                            cp = Ext.state.Manager.getProvider();

                                        cp.delay = 0;
                                        cp.set(view.getXType(), '');
                                        cp.delay = 750;

                                        this.remove(view, true);

                                        Ext.defer(function () {

                                            let module = Ext.create(className, {
                                                id: id,
                                                title: title,
                                                iconCls: iconCls,
                                                closable: closable
                                            });

                                            me.addView(module, pos);
                                        }, 500);
                                    },

                                    listeners: {
                                        add: 'onViewAdded',
                                        remove: 'onViewRemoved'
                                    }
                                }

                            ]
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
