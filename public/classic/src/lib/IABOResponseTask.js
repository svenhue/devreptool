/**
 * Created by kko on 2020-02-22.
 */
Ext.define('MyApp.lib.IABOResponseTask', {
    requires: [
        'Ext.util.DelayedTask'
    ],

    responseCounter: 0,
    interval: 10000,
    ticket: null,
    callBack: null,
    parameter: null,
    maxRepeatTime: 60,

    constructor: function (ticket, callBack, interval = 5000, parameter = null) {
        let me = this;

        me.ticket = ticket;
        me.interval = interval;
        me.callBack = callBack;
        me.parameter = parameter;

        me.responseTask = new Ext.util.DelayedTask(function () {
            me.checkResponse();
        });

        me.responseTask.delay(2000);
    },

    checkResponse: function () {
        let me = this;
        me.responseCounter += me.interval;

        if (me.responseCounter > me.maxRepeatTime * 1000) {
            let resultObj = {
                status: false,
                message: 'Das OABO System hat nicht geantwortet!<br>Versuchen Sie es bitte nochmal.'
            };
            eval(me.callBack(resultObj));
            return;
        }

        Ext.Ajax.request({
            url: '/api/iabo/sti/responses',
            method: 'GET',
            timeout: 500000,
            params: {
                ticket: me.ticket,
                parameter: me.parameter
            },
            success: function (response, opts) {
                let respObj = Ext.decode(response.responseText);
                if (respObj.status === 'finished') {
                    eval(me.callBack(respObj))
                } else
                    me.responseTask.delay(me.interval);
            },

            failure: function (response, opts) {
                let respObj = Ext.decode(response.responseText);
                respObj.errorCode = response.status;
                eval(me.callBack(respObj));
            }
        });
    }
});
