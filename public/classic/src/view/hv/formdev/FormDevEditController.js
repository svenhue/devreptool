/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.hv.formdev.FormDevEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.hvFormDevEdit',

    requires: [
        'MyApp.model.hv.HVFormDevItem'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;

        me.callParent(arguments);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewInputTypeClick: function (component, e) {
        let me = this,
            store = me.getStore('FormDevItemStore'),
            plugin = me.lookupReference('hvFormInputTypeGrid').plugins[0];

        let rec = store.add(Ext.create('MyApp.model.hv.HVFormDevItem', {}));

        me.lookupReference('hvFormInputTypeGrid').getSelectionModel().select(rec, true);

        // plugin.startEditByPosition({
        //     column: 0
        // });
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteInputTypeClick: function (component, e) {
        let me = this,
            grid = me.lookupReference('hvFormInputTypeGrid'),
            store = me.getStore('FormDevItemStore'),
            sel = grid.getSelection();
        Ext.showQuestion('Wollen Sie den Eintrag löschen?', function (button) {
            if (button === 'yes') {
                store.remove(sel[0]);
            }
        });
    },

    /**
     * @param {Ext.Component} component
     */
    onFormInputTypeGridAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        if (!currentRecord.phantom)
            me.getStore('FormDevItemStore').filter([
                {property: 'hv_form_dev_id', operator: '=', value: currentRecord.get('id')}
            ]);
    },

    /**
     * @param {Ext.form.field.ComboBox} combo
     * @param {Ext.data.Model/Ext.data.Model[]} record
     */
    onInputTypeSelect: function (combo, record) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            grid = me.lookupReference('hvFormInputTypeGrid'),
            sel = grid.getSelection(),
            modelRecord = sel[0];

        modelRecord.set('hv_input_type_id', record.get('id'));
        modelRecord.set('input_type_ident', record.get('ident'));

    },

    saveInputItems: function () {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('FormDevItemStore');

        if (store.getNewRecords().length > 0 || store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0) {
            store.each(function (rec, index, all) {
                rec.set('hv_form_dev_id', currentRecord.get('id'));
            });

            store.sync({
                    success: function () {
                        view.unmask();
                        view.close();
                    },
                    failure: function () {
                        view.unmask();
                        Ext.showError('Beim Speichern der Elemente ist ein Fehler aufgetreten!');
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
                    me.saveInputItems();
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

    onFormInputTypeDrop: function () {
        let me = this,
            store = me.getStore('FormDevItemStore');

        store.each(function (record, index, all) {
            record.set('sort_id', index + 1);
        });
    },
});
