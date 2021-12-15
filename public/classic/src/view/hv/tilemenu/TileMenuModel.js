/**
 * Created by kko on 25.05.21.
 */
Ext.define('MyApp.view.hv.tilemenu.TileMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hvTileMenu',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'TileMenu',
            autoLoad: true
        }
        */
    },

    data: {
        levelModuleId: 'root',
        prevLevelModuleId: '',
        levelText: 'Menü',
    }
});
