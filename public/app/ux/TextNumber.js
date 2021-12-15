Ext.define('MyApp.ux.TextNumber', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.numbertextfield',

    requires: [
        'Ext.util.Format'
    ],
    /**
     * @method valueToRaw
     * Overridden method to retain precision
     *      0.1 --> 0.100 (if decimal precision set to 3 and so on...)
     * @param {number} value - number field value
     */
    valueToRaw: function (value) {
        let me = this;
        return Ext.util.Format.number(value, me.format);
    }
});
