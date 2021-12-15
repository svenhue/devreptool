/**
 * Created by kko on 02.06.18.
 */
Ext.define('MyApp.override.FieldAttributes', {
    override: 'Ext.form.field.File',

    onRender: function () {
        var me = this,
            attr = me.fileInputAttributes,
            fileInputEl, name;

        me.callParent(arguments);

        fileInputEl = me.getTrigger('filebutton').component.fileInputEl.dom;
        for (name in attr) {
            fileInputEl.setAttribute(name, attr[name]);
        }
    }
});