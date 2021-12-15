/**
 * Created by kko on 2019-06-30.
 */

Ext.define('MyApp.view.mm.viewport.MMViewportController', {
    extend: 'MyApp.view.hv.ViewportController',
    alias: 'controller.mmViewport',

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
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onLoginBtnClick: function (component, e) {
        let me = this,
            company = me.lookupReference('company').getValue();

        me.callParent(arguments);
    },

    afterAuthenticate: function () {
        let me = this,
            cp = Ext.create('MyApp.lib.DBStateProvider', {
                autoRead: true,
                readUrl: me.uri + '/modules/state/read',
                saveUrl: me.uri + '/modules/state/save'
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

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel();

        // Gnt.locale.De.apply();

            me.lookupReference('company').setHidden(true);
            me.lookupReference('company').setValue('1000');

        viewModel.set('logoWidth', 480);
        viewModel.set('logoHeight', 60);
        viewModel.set('copyRight', '&copy;Meyer & Meyer Holding SE & Co. KG 2021');
        viewModel.set('logoImage', 'resources/images/mm/back.png');
        viewModel.set('logoImageSmall', 'resources/images/mm/mm.png');

        me.callParent(arguments);

    }

});
