Ext.define('MyApp.override.MessageBox', {
    override: 'Ext.window.MessageBox',

    OK: 2, //0001
    CANCEL: 1, //0010
    NO: 4, //0100
    YES: 8, //1000

    OKCANCEL: 3, //0011
    YESNO: 12, //1100
    YESNOCANCEL: 14, //1110

    buttonIds: [
        'cancel', 'ok', 'no', 'yes'
    ],

    initComponent: function (cfg) {
        let me = this;
        me.callParent();
    },
});