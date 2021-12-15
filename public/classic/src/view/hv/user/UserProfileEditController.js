/**
 * Created by kko on 2019-08-09.
 */
Ext.define('MyApp.view.hv.user.UserProfileEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvUserProfileEdit',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveBtnClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel(),
            form = me.lookupReference('form');

        if (form.isValid()) {
            if (viewModel.get('passwd') === viewModel.get('repeat')) {
                Ext.showMask = true;
                Ext.Ajax.request({
                    url: '/api/hv/users/profile',
                    method: 'PUT',
                    params: {},
                    jsonData: {
                        passwd: viewModel.get('passwd')
                    },
                    success: function (response, opts) {
                        me.getView().close();
                    },
                    failure: function (response, opts) {
                        Ext.showServerActionFailed();
                    }
                });
            } else {
                Ext.showError('Kennwort und Wiederholung stimmen nicht überein!');
            }
        } else
            Ext.showInputWarning();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCancelBtnClick: function (component, e) {
        let me = this;
        me.getView().close();
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;
        me.lookupReference('passwd').focus();
    }
});