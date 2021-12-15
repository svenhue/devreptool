/**
 * Created by kko on 16.06.17.
 */
Ext.define('MyApp.lib.ux.SearchField', {
    extend: 'Ext.form.field.Text',

    xtype: 'search',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    initComponent: function () {
        let me = this;

        me.callParent(arguments);

        me.on('specialkey', function (f, e) {
            if (e.getKey() === e.ENTER) {
                me.onSearchClick();
            }
        });

        me.on('change', function (component, newValue, oldValue, eOpts) {
            me.onSearchClick();
        });
    },

    onClearClick: function () {
        var me = this;
        me.setValue('');
        me.onSearchClick();
    },

    onSearchClick: function () {
        var me = this,
            newValue = me.getValue();
        if (newValue !== '') me.getTrigger('clear').show(); else me.getTrigger('clear').hide();
        me.updateLayout();
        me.fireEvent('search', me, newValue);
    }
});