Ext.define('MyApp.ux.NumberFieldEx', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.numberfieldex',

    requires: [
        'Ext.util.Format'
    ],

    forcePrecision: true,
    format: '0.00',
    mouseWheelEnabled: false,
    decimalPrecision: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    hideTrigger: true,

    initComponent: function () {
        var me = this;

        me.mon(me, 'focus', me._onFocus, me);

        this.callParent();
    },

    parseValue: function (value) {
        if (this.currencySymbol || this.thousandSeparator) value = String(value).replace(this.currencySymbol, '').replace(this.thousandSeparator, '').trim();

        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));

        return isNaN(value) ? null : value;
    },

    _onFocus: function () {
        if (this.readOnly) return;
        var value = this.getRawValue();

        if (this.currencySymbol || this.thousandSeparator) value = String(value).replace(this.currencySymbol, '').replace(this.thousandSeparator, '').trim();    //.replace('.', this.decimalSeparator);

        this.setRawValue(Ext.isEmpty(value) ? null : value);
    },

    valueToRaw: function (value) {
        // Extend current routine with formatting the output
        var me = this,
            decimalSeparator = me.decimalSeparator,
            thousandSeparator = me.thousandSeparator;

        // value =  parseFloat(String(value).replace(thousandSeparator,'').replace(decimalSeparator, '.'))
        // value = me.parseValue(value);
        // value = me.fixPrecision(value);
        // value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        // value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);

        //Add formatting
        // if (this.thousandSeparator) {
        //     var regX = /(\d+)(\d{3})/,
        //         value = String(value).replace(/^\d+/, function (val) {
        //             while (regX.test(val)) {
        //                 val = val.replace(regX, '$1' + thousandSeparator + '$2');
        //             }
        //             return val;
        //         });
        // }


        return Ext.util.Format.number(value, me.format);
    },

    valueToRawx: function (value) {
        let me = this,
            decimalSeparator = me.decimalSeparator;
        // value = me.parseValue(value);
        // value = me.fixPrecision(value);
        // value =
        //     Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        // value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);

        return Ext.util.Format.number(value, me.format);
    },

});
