/**
 * Created by kko on 31.05.21.
 */
Ext.define('MyApp.store.NavigationStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'MyApp.model.hv.HVMenuItem'
    ],

    storeId: 'NavigationStore',

    autoLoad: false,

    model: 'MyApp.model.hv.HVMenuItem',
});
