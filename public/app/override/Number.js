Ext.define('MyApp.override.Number', {
    override: 'Ext.form.field.Number',

    requires: [
        'Ext.util.Format'
    ],

    /**
     * @cfg forcePrecision
     * if true - retains precision else default behavior
     */
    forcePrecision: false,

    /**
     * @method valueToRaw
     * Overridden method to retain precision
     *      0.1 --> 0.100 (if decimal precision set to 3 and so on...)
     * @param {number} value - number field value
     */
    valueToRaw: function (value) {
        var me = this;
        return me.forcePrecision ? Ext.util.Format.number(value, me.format) : parseFloat(Ext.Number.toFixed(parseFloat(value), me.decimalPrecision));
    }
});