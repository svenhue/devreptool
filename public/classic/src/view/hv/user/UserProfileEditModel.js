/**
 * Created by kko on 2019-08-09.
 */
Ext.define('MyApp.view.hv.user.UserProfileEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hvUserProfileEdit',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'UserProfileEdit',
            autoLoad: true
        }
        */
    },

    data: {
        passwd: '',
        repeat: ''
    }
});