/**
 * Created by kko on 21.11.20.
 */
Ext.define('MyApp.lib.ux.RowEditing', {
    extend: 'Ext.grid.plugin.RowEditing',
    alias: 'plugin.rowedit',

    cancelEdit: function () {
        let me = this;
        me.callParent();

        if (me.context && me.context.record.get('is_new')) {
            me.context.store.remove(me.context.record);
        }
    },

    completeEdit: function() {
        let me = this;
        me.callParent();
        me.context.record.set('is_new', false);
    }
});