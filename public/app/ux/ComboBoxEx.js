Ext.define('MyApp.ux.ComboBoxEx', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboboxex',

    allowBlank: false,
    minChars: 2,

    forceSelection: true,
    typeAhead: false,
    queryMode: 'remote',

    listWidth: 400,

    tpl: '',

    initComponent: function (config) {
        let me = this;

        me.displayField = me.valueField;

        Ext.apply(me, config || {

            listConfig: {
                minWidth: me.listWidth,
                itemTpl: me.tpl
            },
        });

        me.callParent(arguments);
    }

});
