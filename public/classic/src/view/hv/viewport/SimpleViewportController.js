/**
 * Created by kko on 2019-06-30.
 */

Ext.define('MyApp.view.hv.viewport.SimpleViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvSimpleViewport',

    requires: [
        'Ext.state.Manager',
        'Ext.util.History',
        'MyApp.lib.DBStateProvider',
        'MyApp.view.hv.user.UserProfileEdit'
    ],

    autostart: '',

    /**
     * Called when the view is created
     */
    init: function () {
        let me = this;

        MyApp.sessionToken = localStorage.getItem('session_token');

        MyApp.mainView = me.getView();
        MyApp.modulePanel = me.lookupReference('modulePanel');
    },

    handleDedicated: function () {
        let me = this,
            module = Ext.decode(localStorage.getItem('module'));

        MyApp.modulePanel.add(module);
    },

    toggleMicroMenu: function (micro) {
        let me = this,
            refs = me.getReferences(),
            menuContainer = refs.menuPanel,
            menuTree = refs.menuTree,
            collapsing = !menuTree.getMicro() || micro,
            newWidth = collapsing ? 64 : 250;

        menuTree.setWidth(newWidth);
        menuTree.setMicro(collapsing);
        menuContainer.setWidth(newWidth);
        menuContainer.updateLayout({
            isRoot: true
        });

        return collapsing;
    },

    handleWindowWidth: function () {
        let me = this,
            width = document.documentElement.clientWidth;

        // if (MyApp.userId)
        if (!me.micromenu)
            if (width < 1150) {
                let menuTree = me.lookupReference('menuTree');
                if (!menuTree.getMicro())
                    me.toggleMicroMenu(true);
            } else {
                // if (width >= 1024) {
                let menuTree = me.lookupReference('menuTree');
                if (menuTree.getMicro())
                    me.toggleMicroMenu(false);
                // }
            }
    },

    setAuthData: function (authObj) {
        let me = this,
            menuStore = me.getStore('NavigationStore');

        MyApp.sessionToken = authObj.session_token;
        MyApp.adminAccess = authObj.admin_access;
        MyApp.companyName = authObj.company_name;
        MyApp.userName = authObj.user_name;
        MyApp.userId = authObj.user_id;
        MyApp.userGroupId = authObj.user_group_id;
        me.autostart = authObj.autostart;

        me.getViewModel().set('companyName', MyApp.companyName);
        me.getViewModel().set('userName', MyApp.userName);
        localStorage.setItem('session_token', MyApp.sessionToken);
        localStorage.setItem('dash', authObj.dashboard);

        menuStore.setRoot(authObj.group_menu[0]);
    },

    clearAuthData: function () {
        MyApp.sessionToken = '';
        MyApp.adminAccess = false;
        MyApp.companyName = '';
        MyApp.userId = 0;
        MyApp.userName = '';

        localStorage.removeItem('session_token');
        localStorage.removeItem('dash');
    },

    autostartModules: function () {
        let me = this,
            menuStore = me.getStore('NavigationStore'),
            record = null;

        if (me.autostart) {
            let autostartArr = me.autostart.split(',');
            Ext.each(autostartArr, function (item, index, all) {
                if (item !== '') {
                    record = menuStore.findNode('id', item);
                    if (record) {
                        MyApp.modulePanel.addView(Ext.create(record.get('moduleClass'), {
                            id: record.get('id'),
                            title: record.get('text'),
                            iconCls: record.get('iconCls'),
                            closable: record.get('closable')
                        }));
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
            url: '/api/hv/auth/authenticate',
            method: 'GET',
            params: {},
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

        me.getView().setActiveItem(2);

        me.autostartModules();

    },

    showLogin: function () {
        let me = this;
        me.getView().setActiveItem(1);
        me.lookupReference('loginPanel').down('textfield').focus(500);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onLoginBtnClick: function (component, e) {
        let me = this,
            company = me.lookupReference('msh_company').getValue(),
            loginname = me.lookupReference('msh_loginname').getValue(),
            pw = me.lookupReference('msh_pw').getValue();

        if (company === '' || loginname === '' || pw === '') {
            Ext.showError('Alle Felder müssen gefüllt sein!');
            return;
        }

        Ext.showMask = true;

        Ext.Ajax.request({
            url: '/api/hv/auth/login',
            method: 'POST',
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
     * @param {Ext.list.Tree} sender
     * @param {Object} info
     */
    onMenuItemClick: function (sender, info) {
        let me = this,
            record = info.node;

        if (record) {
            sender.unfloatAll();
            sender.setSelection(null);
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
        let me = this;
        MyApp.modulePanel.setActiveItem(MyApp.modulePanel.items.length - 1);
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
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveDesktopBtnClick: function (component, e) {
        let me = this,
            menuStore = me.getStore('NavigationStore'),
            autoStartModules = '';

        Ext.each(MyApp.modulePanel.items.keys, function (item, index, all) {
            if (menuStore.findNode('id', item)) {
                autoStartModules += item + ',';
            }
        });

        Ext.Ajax.request({
            url: '/api/hv/users/autostart',
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
            viewModel = me.getViewModel(),
            mask = Ext.get('loader');

        if (mask)
            mask.destroy();

        if (Ext.History.currentToken === 'view') {
            me.handleDedicated();
            return;
        }

        window.onresize = function () {
            me.authenticate();
            me.handleWindowWidth()
        };

        me.handleWindowWidth();

        viewModel.set('logoWidth', 350);
        viewModel.set('logoHeight', 117);
        viewModel.set('copyRight', '&copy;PACCO Business Solutions GmbH 2019');
        viewModel.set('logoImage', 'resources/images/pcts/logo.png');

        let viewParam = Ext.getURLParam('view');

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

});
