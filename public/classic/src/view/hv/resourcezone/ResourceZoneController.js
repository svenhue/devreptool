/**
 * Created by kko on 2020-01-23.
 */
Ext.define('MyApp.view.hv.resourcezone.ResourceZoneController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvResourceZone',

    requires: [
        'MyApp.model.hv.HVResourceZone'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onCancelBtnClick: function () {
        let me = this;
        me.getView().close();
    },

    onSaveBtnClick: function () {
        let me = this,
            store = me.getStore('ResourceZoneStore'),
            parentController = me.getViewModel().get('parentController'),
            currentRecord = me.getViewModel().get('currentRecord');


        store.each(function (item, index, all) {
            if (!item.get('hv_user_id') || item.get('hv_user_id') === 0) {
                item.set('hv_user_id', currentRecord.get('id'));
            }

            item.set('start_at', Ext.Date.parse(Ext.Date.format(item.get('start_at'), 'Y-m-d') + ' ' + Ext.Date.format(item.get('start_time'), 'H:i:s'), 'Y-m-d H:i:s'));
            item.set('end_at', Ext.Date.parse(Ext.Date.format(item.get('end_at'), 'Y-m-d') + ' ' + Ext.Date.format(item.get('end_time'), 'H:i:s'), 'Y-m-d H:i:s'));

        });

        store.sync({
            success: function () {
                if (parentController) parentController.refresh();

                me.getView().close();

            },
            failure: function () {
                Ext.showServerActionFailed();
            }
        });

    },

    onZoneAfterEdit: function (editor, context) {
        let me = this,
            record = context.record,
            grid = me.lookupReference('resourceZonelist'),
            plugin = grid.findPlugin('rowediting'),
            store = me.getStore('ResourceZoneStore');

        record.set('is_new', false);

        record.set('start_at', Ext.Date.parse(Ext.Date.format(record.get('start_at'), 'Y-m-d') + ' ' + Ext.Date.format(record.get('start_time'), 'H:i:s'), 'Y-m-d H:i:s'));
        record.set('end_at', Ext.Date.parse(Ext.Date.format(record.get('end_at'), 'Y-m-d') + ' ' + Ext.Date.format(record.get('end_time'), 'H:i:s'), 'Y-m-d H:i:s'));

        if (record.get('start_at') > record.get('end_at')) {
            Ext.showError('Das "bis Datum" darf nicht vor dem "von Datum" liegen!', function (button) {
                plugin.startEdit(record);
            });


        } else
            store.sort();
    },

    onZoneCancelEdit: function (editor, context) {
        let me = this,
            store = me.getStore('ResourceZoneStore');

        if (context.record.get('is_new')) {
            store.removeAt(context.rowIdx, 1);
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onZoneAddBtnClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            dt = new Date(),
            store = me.getStore('ResourceZoneStore'),
            grid = me.lookupReference('resourceZonelist'),
            plugin = grid.findPlugin('rowediting');

        plugin.cancelEdit();

        let record = new MyApp.model.hv.HVResourceZone({
            start_at: dt,
            start_time: Ext.Date.clearTime(dt, true),
            end_at: dt,
            end_time: Ext.Date.parse('23:59', 'H:i'),
            is_new: true
        });

        store.insert(0, record);
        plugin.startEdit(record, 0);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onZoneDeleteBtnClick: function (component, e) {
        let me = this,
            grid = me.lookupReference('resourceZonelist'),
            store = me.getStore('ResourceZoneStore'),
            selModel = grid.getSelectionModel();

        grid.findPlugin('rowediting').cancelEdit();

        Ext.showQuestion('Datensatz löschen?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(selModel.getSelection());

                    if (store.getCount() > 0) {
                        selModel.select(0);
                    }

                }
            }
        );

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('ResourceZoneStore');

        store.load({params: {id: currentRecord.get('id')}});
    }
});