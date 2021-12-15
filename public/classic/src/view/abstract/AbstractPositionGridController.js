/**
 * Created by kko on 21.11.20.
 */
Ext.define('MyApp.view.abstract.AbstractPositionGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.abstractpositiongrid',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewBtnClick: function (component, e) {
        let me = this,
            grid = me.getView(),
            plugin = grid.findPlugin('cellediting'),
            store = grid.getStore(),
            record = Ext.create(grid.modelClass, {is_new: true});

        if (!plugin) plugin = grid.findPlugin('rowediting')

        plugin.cancelEdit();
        store.insert(0, record)
        plugin.startEdit(record, 0);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteBtnClick: function (component, e) {
        let me = this,
            grid = me.getView(),
            store = grid.getStore(),
            plugin = grid.findPlugin('cellediting'),
            selModel = grid.getSelectionModel();


        if (!plugin) plugin = grid.findPlugin('rowediting')
        plugin.cancelEdit();

        if (grid.askBeforeDelete) {
            Ext.showQuestion('Wollen Sie den Eintrag löschen?', function (button) {
                if (button === 'yes') {
                    store.remove(selModel.getSelection());

                    if (store.getCount() > 0) {
                        selModel.select(0);
                    }
                    if (grid.autoSync)
                        store.sync();
                }
            });
        } else {
            store.remove(selModel.getSelection());

            if (store.getCount() > 0) {
                selModel.select(0);
            }
            if (grid.autoSync)
                store.sync();
        }
    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onItemDblClick: function (component, record, item, index, e) {

    },

    /**
     * @param {Ext.selection.RowModel} component
     * @param {Ext.data.Model} record
     * @param {Number} index
     */
    onItemSelect: function (component, record, index) {
        let me = this;
        me.getViewModel().set('noSelection', false);
    },

    onCancelEdit: function (editor, context) {
        let me = this;

        if (context.record.get('is_new')) {
            context.store.remove(context.record);
        }
    },

    onCompleteEdit: function (editor, context) {
        let me = this;
        if (me.getView().autoSync)
            context.record.store.sync({
                failure: function (batch, options) {
                    let operation = batch.operations[0];
                    if (operation.getError() === 'exists') {
                        Ext.showError(me.getView().entityName + ' existiert bereits!');
                    }
                }
            });
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
    }
});
