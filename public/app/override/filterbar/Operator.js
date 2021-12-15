Ext.define('MyApp.override.filterbar.Operator', {
    override: 'Ext.grid.plugin.filterbar.Operator',
    onFieldRender: function (textField) {
        var me = this,
            op = me.getOperator(),
            btn;

        // if (textField.xtype === 'textfield') {
        //
        //     btn = me.operatorButtonEl = textField.triggerWrap.insertFirst({
        //         tag: 'div',
        //         cls: [me.operatorCls, me.triggerCls, me.operatorsIconsMap[op]],
        //         'data-qtip': me.operatorsTextMap[op]
        //     });
        //
        //     btn.on({
        //         click: 'onOperatorClick',
        //         scope: me
        //     });
        // }
    },

    onChangeOperator: function(menu) {
        this.setOperator(menu.operator);
    },
});
