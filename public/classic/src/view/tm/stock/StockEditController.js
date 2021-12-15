/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.stock.StockEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.tmStockEdit',

    requires: [
        'MyApp.model.tm.TMStockStoragePlace'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },


    saveStoragePlaces: function () {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('StockStoragePlaceStore');

        if (store.getNewRecords().length > 0 || store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0) {

            store.each(function (rec, index, all) {
                rec.set('tm_stock_id', currentRecord.get('id'));
            });

            store.sync({
                    success: function () {
                        view.unmask();
                        view.close();
                    },
                    failure: function () {
                        view.unmask();
                        Ext.showError('Beim Speichern der Lagerplätze ist ein Fehler aufgetreten!');
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
                    me.saveStoragePlaces();
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
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewStoragePlaceClick: function (component, e) {
        let me = this,
            store = me.getStore('StockStoragePlaceStore');

        let rec = store.add(Ext.create(MyApp.model.tm.TMStockStoragePlace));

        me.lookupReference('tmStoragePlaceGrid').getSelectionModel().select(rec, true);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteStoragePlacelick: function (component, e) {
        let me = this,
            grid = me.lookupReference('tmStoragePlaceGrid'),
            store = me.getStore('StockStoragePlaceStore'),
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
    onStoragePlaceAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        if (!currentRecord.phantom)
            me.getStore('StockStoragePlaceStore').filter([
                {property: 'tm_stock_id', operator: '=', value: currentRecord.get('id')}
            ]);
    }
});
