/**
 * Created by kko on 21.11.20.
 */
Ext.define('MyApp.view.abstract.AbstractPositionGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.abstractpositiongrid',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'AbstractPositionGrid',
            autoLoad: true
        }
        */
    },

    data: {
        noSelection: true
    }
});