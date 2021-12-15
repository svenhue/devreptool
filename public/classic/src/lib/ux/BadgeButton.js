Ext.define('MyApp.lib.ux.BadgeButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.badgebutton',

    afterRender: function () {
        var me = this;

        me.badgeText = me.badgeText || '';

        if (!me.el) {
            me.on('render', Ext.pass(me.setBadgeText, [me.badgeText, true], me), me, {
                single: true
            });
            return;
        }

        me.el.addCls('abp-badge');
        me.setText(me.badgeText, true);

    },

    setText: function (text, force) {

        var me = this,
            oldBadgeText = me.badgeText,
            el = me.el,
            dom = el && el.dom;

        if (text === 0) text = '0';

        if (el && dom) {
            if (force || oldBadgeText !== text) {
                me.badgeText = text;

                dom.setAttribute('data-abp-badge', me.badgeText || '');

                if (Ext.isEmpty(me.badgeText)) {
                    el.addCls('hide-badge');
                } else {
                    el.removeCls('hide-badge');
                }

                me.fireEvent('badgetextchange', me, oldBadgeText, text);
            } else {
                //console.log('Badge text is already set to ', text);
            }
        } else {
            //console.warn('Unable to set badge without valid el and dom references');
        }

    },

    getText: function () {
        return me.badgeText;
    }
});