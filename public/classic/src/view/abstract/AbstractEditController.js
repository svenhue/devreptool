/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.abstract.AbstractEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.abstractedit',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    validate: function () {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            errors = currentRecord.validate();


        if (!currentRecord.isValid()) {
            Ext.handleFormErrors(me, errors);
            return false;
        }

        return true;
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCloseBtnClick: function (component, e) {
        let me = this;
        me.getView().close();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteBtnClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        Ext.deleteRecord(currentRecord, me.getView());
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord');

        if (me.validate()) {
            view.mask(Ext._wait);
            // Ext.showMask = true;
            currentRecord.save({
                success: function (record, operation) {
                    if (operation.action === 'create') {
                        me.getViewModel().get('store').add(currentRecord);
                    }
                    view.unmask();
                    me.getView().close();
                },
                failure: function (record, operation) {
                    let resultObj;

                    view.unmask();

                    if (!operation.getError())
                        resultObj = operation.getResponse().responseJson;

                    if (resultObj && resultObj.error === 'exists') {
                        Ext.showError(me.getView().objCaption + ' existiert bereits!');
                        me.lookupReference(resultObj.field).markInvalid('existiert bereits');
                    } else
                        Ext.showServerActionFailed();
                }
            });
        }
    },

    /**
     * @param {Ext.panel.Panel} panel
     */
    onBeforeClose: function (panel) {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord');

        if (me.closeMe) return true;
        if (currentRecord.dirty) {
            Ext.Msg.show({
                title: 'Frage',
                msg: 'Wollen Sie die Änderungen verwerfen?',
                buttons: Ext.Msg.YESNO,
                callback: function (btn) {
                    if ('yes' === btn) {
                        currentRecord.reject();
                        me.closeMe = true;
                        view.close();
                        return false;
                    }
                }
            })
        } else
            return true;
        return false;
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        // let me = this,
        //     firstField = me.getView().down('textfield').nextNode();
    }
});
