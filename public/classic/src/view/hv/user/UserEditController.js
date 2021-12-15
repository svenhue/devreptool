/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.user.UserEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.hvUserEdit',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    validate: function () {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            errors = currentRecord.validate(),
            password = me.lookupReference('password').getValue();


        if (!currentRecord.isValid()) {
            Ext.handleFormErrors(me, errors);
            return false;
        }

        if (password !== me.lookupReference('repeat_password').getValue()) {
            Ext.showError('Das Kennwort stimmt mit der Wiederholung nicht überein!');
            me.lookupReference('password').markInvalid('Kennwort stimmt nicht mit Wiederholung überein');
            return false;
        } else if (password !== '')
            currentRecord.set('password', password);

        return true;
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        if (me.validate()) {
            Ext.showMask = true;
            currentRecord.save({
                success: function (record, operation) {
                    if (operation.action === 'create') {
                        me.getViewModel().get('store').add(currentRecord);
                    }
                    me.getView().close();
                },
                failure: function (record, operation) {
                    let resultObj;

                    if (!operation.getError())
                        resultObj = operation.getResponse().responseJson;

                    if (resultObj && resultObj.error === 'exists') {
                        switch (resultObj.field) {
                            case 'ident':
                                Ext.showError('Die Kennnung existiert bereits!');
                                break;
                            case 'loginname':
                                Ext.showError('Der Anmeldename ist bereits vergeben!');
                                break;
                        }
                        me.lookupReference(resultObj.field).markInvalid('existiert bereits');
                    } else
                        Ext.showServerActionFailed();
                }
            });
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteBtnClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        if (MyApp.userId === currentRecord.get('id')) {
            Ext.showError('Sie können sich nicht selbst löschen!');
            return;
        }
        me.callParent(arguments);
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onUserGroupChange: function (field, newValue, oldValue, eOpts) {
        let me = this,
            viewModel = me.getViewModel(),
            record = me.getStore('UserGroupStore').getById(newValue);

        if (record) {
            viewModel.set('currentRecord.user_group_ident', record.get('ident'));
        }
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onResourceTypeChange: function (component, newValue, oldValue) {
        let me = this,
            viewModel = me.getViewModel(),
            record = me.getStore('ResourceTypeStore').getById(newValue);

        if (record) {
            viewModel.set('currentRecord.resource_type_ident', record.get('ident'));
        }
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        me.getStore('ReportStore').load({params: {id: currentRecord.get('hv_report_id')}});

        me.callParent(component);
    }

});