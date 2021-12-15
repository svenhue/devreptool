/**
 * Created by kko on 14.10.20.
 */
Ext.define('MyApp.view.hv.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvViewport',

    requires: [
        'Ext.state.Manager',
        'MyApp.lib.DBStateProvider',
        'MyApp.view.hv.tilemenu.TileMenu',
        'MyApp.view.hv.user.UserProfileEdit'
    ],

    autostart: '',

    uri: '/api/hv',

    init: function () {
        let me = this;

        MyApp.sessionToken = localStorage.getItem('session_token');

        MyApp.mainView = me.getView();
        MyApp.modulePanel = me.lookupReference('modulePanel');
    },

    // toggleMicroMenu: function (micro) {
    //     let me = this,
    //         refs = me.getReferences(),
    //         menuContainer = refs.menuPanel,
    //         menuTree = refs.menuTree,
    //         collapsing = !menuTree.getMicro() || micro,
    //         newWidth = collapsing ? 64 : 250;
    //
    //     menuTree.setWidth(newWidth);
    //     menuTree.setMicro(collapsing);
    //     menuContainer.setWidth(newWidth);
    //     menuContainer.updateLayout({
    //         isRoot: true
    //     });
    //
    //     return collapsing;
    // },

    // handleWindowWidth: function () {
    //     let me = this,
    //         width = document.documentElement.clientWidth;
    //
    //     // if (MyApp.userId)
    //     if (!me.micromenu)
    //         if (width < 1150) {
    //             let menuTree = me.lookupReference('menuTree');
    //             if (!menuTree.getMicro())
    //                 me.toggleMicroMenu(true);
    //         } else {
    //             // if (width >= 1024) {
    //             let menuTree = me.lookupReference('menuTree');
    //             if (menuTree.getMicro())
    //                 me.toggleMicroMenu(false);
    //             // }
    //         }
    // },

    setAuthData: function (authObj) {
        let me = this,
            viewModel = me.getViewModel(),
            menuStore = Ext.getStore('NavigationStore');

        MyApp.sessionToken = authObj.session_token;
        MyApp.adminAccess = authObj.admin_access;
        MyApp.companyName = authObj.company_name;
        MyApp.companyId = authObj.company_id;
        MyApp.companyConfig = authObj.company_config;
        MyApp.userName = authObj.user_name;
        MyApp.userIdent = authObj.user_ident;
        MyApp.useTileMenu = authObj.use_tile_menu;
        MyApp.userId = authObj.user_id;
        MyApp.userGroupId = authObj.user_group_id;
        MyApp.userGroupConfig = authObj.user_group_config;
        MyApp.accessOptions = authObj.access_options;
        me.autostart = authObj.autostart;

        viewModel.set('companyName', MyApp.companyName);
        viewModel.set('userName', MyApp.userName);
        viewModel.set('useTileMenu', MyApp.useTileMenu);

        localStorage.setItem('session_token', MyApp.sessionToken);
        localStorage.setItem('dash', authObj.dashboard);

        menuStore.setRoot(authObj.group_menu[0]);

    },

    clearAuthData: function () {
        MyApp.sessionToken = '';
        MyApp.adminAccess = false;
        MyApp.companyName = '';
        MyApp.companyId = 0;
        MyApp.companyConfig = {};
        MyApp.userId = 0;
        MyApp.userName = '';
        MyApp.userGroupId = 0;
        MyApp.userGroupConfig = {};

        localStorage.removeItem('session_token');
        localStorage.removeItem('dash');
    },

    autostartModules: function () {
        let me = this,
            menuStore = Ext.getStore('NavigationStore'),
            record = null;

        if (me.autostart) {
            let autostartArr = me.autostart.split(',');
            Ext.each(autostartArr, function (item, index, all) {
                if (item !== '') {
                    record = menuStore.findNode('id', item);
                    if (record) {
                        MyApp.modulePanel.addView(
                            Ext.create(record.get('moduleClass'), {
                                id: record.get('id'),
                                title: record.get('text'),
                                iconCls: record.get('iconCls'),
                                closable: record.get('closable')
                            })
                        );
                    }
                }
            });
            MyApp.modulePanel.setActiveItem(0);
        }
    },

    authenticate: function () {
        let me = this;

        Ext.showMask = true;

        Ext.Ajax.request({
            url: me.uri + '/auth/authenticate',
            method: 'GET',
            params: {},
            timeout: 90000,
            success: function (response, opts) {
                let authObj = Ext.decode(response.responseText);
                if (authObj.success) {
                    me.setAuthData(authObj.data);
                    me.afterAuthenticate();
                } else {
                    me.showLogin();
                }

            },
            failure: function (response, opts) {
                Ext.showServerActionFailed();
                me.showLogin();
            }
        });
    },

    afterAuthenticate: function () {
        let me = this,
            cp = Ext.create('MyApp.lib.DBStateProvider', {
                autoRead: true,
                readUrl: '/api/hv/modules/state/read',
                saveUrl: '/api/hv/modules/state/save'
            });

        Ext.state.Manager.setProvider(cp);

        me.getView().setActiveItem(1);

        if (MyApp.useTileMenu) {
            MyApp.modulePanel.addView(
                Ext.create('MyApp.view.hv.tilemenu.TileMenu', {
                    id: 'm_hv_tilemenu',
                    title: 'Menü',
                    iconCls: 'far fa-fw fa-game-board'
                })
            );

            me.lookupReference('menuPanel').collapse();
        }
        me.autostartModules();

    },

    showLogin: function () {
        let me = this,
            loginPanel = me.lookupReference('loginPanel');

        loginPanel.setVisible(true);
        loginPanel.down('textfield').focus(500);
    },

    /**
     * @param {Ext.menu.Item} item
     * @param {Ext.event.Event} e
     */
    onDedicatedTabBtnClick: function (item, e) {
        let me = this,
            module = MyApp.modulePanel.plugins[0].item;
        localStorage.setItem('module', Ext.encode({id: module.getId(), xtype: module.xtype, title: module.getTitle(), iconCls: module.getIconCls()}));
        window.open('#view');
    },

    /**
     * @param {Ext.Component} component
     */
    onTabCloseMenuBeforeMenu: function (component) {
        let me = this,
            module = MyApp.modulePanel.plugins[0].item;
        component.down('#standalone').setHidden(!module.standalone);
        component.down('#standaloneSep').setHidden(!module.standalone);
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onMenuSearchChange: function (component, newValue, oldValue) {
        let me = this,
            menuTree = me.lookupReference('menuTree'),
            navigationStore = me.getStore('NavigationStore');

        navigationStore.clearFilter(true);

        navigationStore.filterBy(
            function (record) {
                let result = false,
                    text = record.get('text');
                return text.includes(newValue);
            }
        );

        menuTree.setStore(navigationStore);
    },

    /**
     * @param {Ext.form.field.Base} component
     * @param {Ext.event.Event} e
     */
    onSpecialKey: function (component, e) {
        let me = this;
        if (e.keyCode === 13) {
            me.onLoginBtnClick(component);
        }
    },

    /**
     * @param {Ext.list.Tree} sender
     * @param {Object} info
     */
    onMenuItemClick: function (sender, info) {
        let me = this,
            record = info.node;

        if (record) {
            if (sender) {
                sender.unfloatAll();
                sender.setSelection(null);
            }
            if (record.get('leaf') === true) {
                if (record.get('moduleClass') !== '') {

                    if (!MyApp.modulePanel.viewExists(record.get('id')))
                        MyApp.modulePanel.addView(Ext.create(record.get('moduleClass'), {
                            id: record.get('id'),
                            title: record.get('text'),
                            iconCls: record.get('iconCls'),
                            closable: record.get('closable')
                        }));
                }
                if (record.get('id') === 'm_logout') {
                    Ext.showQuestion('Wollen Sie sich abmelden?', function (button) {
                        if (button === 'yes') {
                            me.clearAuthData();
                            window.location.reload();
                        }
                    });
                }
            }
        }
    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onTreeMenuItemClick: function (component, record, item, index, e) {
        let me = this;

        if (record) {
            // sender.unfloatAll();
            // sender.setSelection(null);
            if (record.get('leaf') === true) {
                if (record.get('moduleClass') !== '') {
                    if (record.get('startalone')) {

                        if (record.get('moduleClass').includes('http:')) {
                            window.open(record.get('moduleClass'));
                        } else {
                            localStorage.setItem('module', Ext.encode({id: record.getId(), moduleClass: record.get('moduleClass'), title: record.get('text'), iconCls: record.get('iconCls')}));
                            window.open('#view');
                        }
                    } else {
                        if (!MyApp.modulePanel.viewExists(record.get('id')))
                            MyApp.modulePanel.addView(Ext.create(record.get('moduleClass'), {
                                id: record.get('id'),
                                title: record.get('text'),
                                iconCls: record.get('iconCls'),
                                closable: record.get('closable'),
                                standalone: record.get('standalone')
                            }));
                    }
                }
                if (record.get('id') === 'm_logout') {
                    Ext.showQuestion('Wollen Sie sich abmelden?', function (button) {
                        if (button === 'yes') {
                            me.clearAuthData();
                            window.location.reload();
                        }
                    });
                }
            } else if (record.isExpanded())
                record.collapse();
            else
                record.expand();
        }
    },

    /**
     * @param {Ext.Component} component
     * @param {Ext.event.Event} event
     */
    onTreeMenuFocusLeave: function (component, event) {
        let me = this;
        component.getSelectionModel().deselectAll();
    },

    /**
     * @param {Ext.container.Container} component
     * @param {Ext.Component} component
     * @param {Number} index
     */
    onViewAdded: function (component, c, index) {
        let me = this,
            panel = me.lookupReference('emptyPanel');

        if (MyApp.modulePanel.items.length === 1)
            panel.setActiveItem(1);
    },

    /**
     * @param {Ext.container.Container} component
     * @param {Ext.Component} component
     */
    onViewRemoved: function (component, c) {
        let me = this,
            panel = me.lookupReference('emptyPanel');

        if (MyApp.modulePanel.items.length === 0)
            panel.setActiveItem(0);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onLogoutBtnClick: function (component, e) {
        let me = this;
        Ext.showQuestion('Wollen Sie sich abmelden?', function (button) {
            if (button === 'yes') {
                me.clearAuthData();
                window.location.reload();
            }
        });
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onLoginBtnClick: function (component, e) {
        let me = this,
            company = me.lookupReference('company').getValue(),
            loginname = me.lookupReference('ln').getValue(),
            pw = me.lookupReference('pwd').getValue();

        if (company === '' || loginname === '' || pw === '') {
            Ext.showError('Alle Felder müssen gefüllt sein!');
            return;
        }

        Ext.showMask = true;

        Ext.Ajax.request({
            url: me.uri + '/auth/login',
            method: 'POST',
            timeout: 90000,
            params: {},
            jsonData: {
                company: company,
                loginname: loginname,
                password: pw
            },
            success: function (response, opts) {
                let authObj = Ext.decode(response.responseText);
                if (authObj.success) {
                    me.setAuthData(authObj.data);
                    me.afterAuthenticate();
                } else Ext.showError('Überprüfen Sie Ihre Anmeldedaten!')
            },
            failure: function (response, opts) {
                Ext.showServerActionFailed();
            }
        });
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onMenuBtnClick: function (component, e) {
        let me = this;

        me.micromenu = me.toggleMicroMenu() ? 1 : 0;

        // Ext.Ajax.request({
        //     url: 'server/api/masterdata/index.php/users/micromenu',
        //     method: 'put',
        //     jsonData: {
        //         micromenu: me.micromenu
        //     },
        //     params: {},
        //     success: function (response) {
        //     },
        //     failure: function () {
        //     }
        // });
    },

    /**
     * @param {Ext.menu.Item} item
     * @param {Ext.event.Event} e
     */
    onCheckTileMenuBtnClick: function (item, e) {
        let me = this,
            treePanel = me.lookupReference('menuPanel'),
            viewModel = me.getViewModel();

        Ext.Ajax.request({
            url: me.uri + '/users/tilemenu?active=' + viewModel.get('useTileMenu'),
            method: 'get',
            params: {},
            success: function (response) {
            },
            failure: function () {
            }
        });

        if (viewModel.get('useTileMenu')) {
            MyApp.modulePanel.addView(
                Ext.create('MyApp.view.hv.tilemenu.TileMenu', {
                    id: 'm_hv_tilemenu',
                    title: 'Menü',
                    iconCls: 'far fa-fw fa-game-board'
                }), 0
            );
            treePanel.collapse();
        } else {
            MyApp.modulePanel.remove(Ext.getCmp('m_hv_tilemenu'));
            treePanel.expand();
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveDesktopBtnClick: function (component, e) {
        let me = this,
            menuStore = Ext.getStore('NavigationStore'),
            autoStartModules = '';

        Ext.each(MyApp.modulePanel.items.keys, function (item, index, all) {
            if (item !== 'm_hv_tilemenu')
                if (menuStore.findNode('id', item)) {
                    autoStartModules += item + ',';
                }
        });

        Ext.Ajax.request({
            url: me.uri + '/users/autostart',
            method: 'post',
            params: {},
            jsonData: {
                modules: autoStartModules
            },
            success: function (response) {
            },
            failure: function () {
            }
        });
    },

    /**
     * @param {Ext.menu.Item} item
     * @param {Ext.event.Event} e
     */
    onChangeLoginDataBtnClick: function (item, e) {
        let me = this;
        Ext.create('MyApp.view.hv.user.UserProfileEdit').show();
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            viewParam = Ext.getURLParam('view'),
            mask = Ext.get('loader');

        if (mask)
            mask.destroy();

        if (viewParam) {
            Ext.Ajax.request({
                url: '/api/hv/view',
                async: true,
                method: 'GET',
                params: {
                    view: viewParam
                },
                success: function (response, opts) {
                    let resultObj = Ext.decode(response.responseText);
                    if (resultObj.success) {
                        let view = Ext.create(resultObj.data[0], {viewModel: {data: {params: resultObj.data}}});
                        me.getView().add(view);
                        me.getView().setActiveItem(3);
                    }
                },
                failure: function (response, opts) {
                    if (MyApp.sessionToken && MyApp.sessionToken !== '')
                        me.authenticate();
                    else
                        me.showLogin();
                }
            });
        } else if (MyApp.sessionToken && MyApp.sessionToken !== '')
            me.authenticate();
        else
            me.showLogin();
    },

});
