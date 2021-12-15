/**
 * Created by kko on 12.08.20.
 */
Ext.define('MyApp.store.IABONotification', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.iabo.IABONotification'
    ],

    model: 'MyApp.model.iabo.IABONotification'

});