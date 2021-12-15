/**
 * Created by kko on 25.05.21.
 */
Ext.define('MyApp.view.hv.tilemenu.TileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvTileMenu',

    requires: [
        'MyApp.model.hv.HVMenuItem',
        'MyApp.view.hv.tilemenu.tile.Tile'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    handleMenu: function (moduleId) {
        let me = this,
            module = null,
            view = me.getView(),
            viewModel = me.getViewModel(),
            navigationStore = Ext.getStore('NavigationStore');

        if (moduleId === 'root') {
            module = navigationStore.getRoot();

        } else {
            module = navigationStore.getNodeById(moduleId);
        }

        if (module.get('leaf')) {
            MyApp.mainView.getController().onTreeMenuItemClick(null, module);
        } else {

            viewModel.set('prevLevelModuleId', viewModel.get('levelModuleId'));
            viewModel.set('levelModuleId', module.get('id'));
            viewModel.set('levelText', module.get('text'));

            view.removeAll(true);

            Ext.each(module.get('children'), function (entry, index, all) {
                let item = new MyApp.model.hv.HVMenuItem(entry);
                if (item.get('id') !== 'm_hv_tilemenu') {
                    view.add({
                        xtype: 'hvTile',
                        data: {
                            text: item.get('text'),
                            iconCls: item.get('iconCls'),
                            leaf: item.get('leaf'),
                            id: item.get('id')
                        }
                    });
                }
            });
        }
    },

    menuItemClick: function (moduleId) {
        let me = this;
        me.handleMenu(moduleId)
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            view = me.getView();
        me.handleMenu('root');
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onBackBtnClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel();

        try {
            me.handleMenu(viewModel.get('prevLevelModuleId'));
        }
        catch(e) {}

    }
});
