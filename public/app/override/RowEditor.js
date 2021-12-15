Ext.define('MyApp.override.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    cancelEdit: function () {
        var me = this,
            form = me.getForm(),
            fields = form.getFields(),
            items = fields.items,
            length = items.length,
            i,
            record = null;


        if (me.context && me.context.record)
            record = me.context.record;

        if (me._cachedNode) {
            me.clearCache();
        }

        me.hide();

        // If we are editing a new record, and we cancel still in invalid state, then remove it.
        if (record && record.phantom && !record.modified && me.removeUnmodified) {
            me.editingPlugin.grid.store.remove(record);
        }

        form.clearInvalid();

        // temporarily suspend events on form fields before reseting the form to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            items[i].suspendEvents();
        }

        form.reset();

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }
    }
});