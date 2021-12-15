/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.hv.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hvViewport',

    requires: [
        'Ext.data.TreeStore',
        'MyApp.model.hv.HVMenuItem'
    ],

    stores: {
        NavigationStore: {
            type: 'tree',
            autoLoad: false,
            model: 'MyApp.model.hv.HVMenuItem',
            root: {}
        }
    },

    data: {
        copyRight: '',
        logoImage: '',
        logoImageSmall: '',
        logoWidth: 350,
        logoHeight: 88,
        companyName: '',
        userName: '',
        useTileMenu: false
    }
});
