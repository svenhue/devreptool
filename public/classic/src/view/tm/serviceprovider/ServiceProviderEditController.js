/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.serviceprovider.ServiceProviderEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.tmServiceProviderEdit',

    requires: [
        'MyApp.model.tm.TMServiceProviderContact'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    saveContacts: function () {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('ServiceProviderContactStore');

        if (store.getNewRecords().length > 0 || store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0) {

            store.each(function (rec, index, all) {
                rec.set('tm_service_provider_id', currentRecord.get('id'));
            });

            store.sync({
                    success: function () {
                        view.unmask();
                        view.close();
                    },
                    failure: function () {
                        view.unmask();
                        Ext.showError('Beim Speichern der Ansprechpartner ist ein Fehler aufgetreten!');
                    }
                }
            );
        } else {
            view.unmask();
            view.close();
        }
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
            currentRecord.save({
                success: function (record, operation) {
                    if (operation.action === 'create') {
                        me.getViewModel().get('store').add(currentRecord);
                    }
                    me.saveContacts();
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
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;

        me.callParent(arguments);
    },

    /**
     * @param {Ext.Component} component
     */
    onContactGridAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        if (!currentRecord.phantom)
            me.getStore('ServiceProviderContactStore').filter([
                {property: 'tm_service_provider_id', operator: '=', value: currentRecord.get('id')}
            ]);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewContactClick: function (component, e) {
        let me = this,
            store = me.getStore('ServiceProviderContactStore');

        let rec = store.add(Ext.create(MyApp.model.tm.TMServiceProviderContact));

        me.lookupReference('tmContactGrid').getSelectionModel().select(rec, true);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteContactClick: function (component, e) {
        let me = this,
            grid = me.lookupReference('tmContactGrid'),
            store = me.getStore('ServiceProviderContactStore'),
            sel = grid.getSelection();
        Ext.showQuestion('Wollen Sie den Eintrag löschen?', function (button) {
            if (button === 'yes') {
                store.remove(sel[0]);
            }
        });
    }
});
