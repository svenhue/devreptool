/**
 * Created by kko on 16.06.17.
 */
Ext.define('MyApp.lib.DBStateProvider', {
    extend: 'Ext.state.Provider',

    requires: [
        'Ext.util.DelayedTask',
        'MyApp.lib.HttpProvider'
    ],

    saveSuccessText: 'Save Success',
    saveFailureText: 'Save Failure',
    readSuccessText: 'Read Success',
    readFailureText: 'Read Failure',
    dataErrorText: 'Data Error',
    delay: 750,
    queue: [],
    dirty: false,
    started: false,
    autoStart: true,
    autoRead: false,
    context: 'all',
    logFailure: false,
    logSuccess: false,
    url: '.',
    readUrl: undefined,
    saveUrl: undefined,
    method: 'POST',

    paramNames: {
        name: 'name'
        , value: 'value'
        , context: 'context'
        , data: 'data'
    },
    saveExtraParams: {},
    readExtraParams: {},

    constructor: function () {
        var me = this;

        // backwards compatibility
        me.saveExtraParams = me.saveBaseParams || me.saveExtraParams;
        me.readExtraParams = me.readBaseParams || me.readExtraParams;

        // init queue
        me.queue = [];

        me.callParent(arguments);

        if (me.autoRead) {
            me.readState();
        }

        me.dt = new Ext.util.DelayedTask(me.saveState, me);

        if (me.autoStart) {
            me.start();
        }

    },

    initState: function (state) {
        var me = this;
        if (state instanceof Array) {
            Ext.each(state, function (item) {
                me.state[item[me.paramNames.name]] = me.decodeValue(item[me.paramNames.value]);
            }, me);
        }
        else {
            me.state = state || {};
        }
    },

    saveState: function () {
        var me = this
            , o = {
                url: me.saveUrl || me.url
                , method: me.method
                , scope: me
                , success: me.onSaveSuccess
                , failure: me.onSaveFailure
                , queue: Ext.clone(me.queue)
                , params: {}
            }
            , params = Ext.apply({}, me.saveExtraParams)
        ;
        if (!me.dirty) {
            if (me.started) {
                me.dt.delay(me.delay);
            }
            return;
        }

        me.dt.cancel();

        params[me.paramNames.context] = me.context;
        params[me.paramNames.data] = Ext.encode(o.queue);

        Ext.apply(o.params, params);

        // be optimistic
        me.dirty = false;

        Ext.Ajax.request(o);
    },

    readState: function () {
        var me = this
            , o = {
                url: me.readUrl || me.url
                , method: me.method
                , async: false
                , scope: me
                , success: me.onReadSuccess
                , failure: me.onReadFailure
                , params: {}
            }
            , params = Ext.apply({}, me.readExtraParams)
        ;
        params[me.paramNames.id] = me.id;
        params[me.paramNames.user] = me.user;
        params[me.paramNames.context] = me.context;

        Ext.apply(o.params, params);
        Ext.Ajax.request(o);
    },

    onReadFailure: function (response) {
        var me = this;
        if (true === me.logFailure) {
            me.log(me.readFailureText, response);
        }
        me.fireEvent('readfailure', me);

    },

    onReadSuccess: function (response) {
        var me = this, o = {}, data;
        try {
            o = Ext.decode(response.responseText);
        }
        catch (e) {
            if (true === me.logFailure) {
                me.log(me.readFailureText, e, response);
            }
            return;
        }
        if (true !== o.success) {
            if (true === me.logFailure) {
                me.log(me.readFailureText, o, response);
            }
        }
        else {
            data = o[me.paramNames.data];
            if (!(data instanceof Array) && true === me.logFailure) {
                me.log(me.dataErrorText, data, response);
                return;
            }
            Ext.each(data, function (item) {
                me.state[item[me.paramNames.name]] = me.decodeValue(item[me.paramNames.value]);
            }, me);
            me.queue = [];
            me.dirty = false;
            if (true === me.logSuccess) {
                me.log(me.readSuccessText, data, response);
            }
            me.fireEvent('readsuccess', me);
        }
    },

    onSaveSuccess: function (response, options) {
        var me = this
            , o = {}
            , name
            , value
            , i
            , j
            , found
        ;
        try {
            o = Ext.decode(response.responseText);
        }
        catch (e) {
            if (true === me.logFailure) {
                me.log(me.saveFailureText, e, response);
            }
            me.dirty = true;
            return;
        }
        if (true !== o.success) {
            if (true === me.logFailure) {
                me.log(me.saveFailureText, o, response);
            }
            me.dirty = true;
        }
        else {
            Ext.each(options.queue, function (item) {
                if (!item) {
                    return;
                }
                name = item[me.paramNames.name];
                value = me.decodeValue(item[me.paramNames.value]);

                if (undefined === value || null === value) {
                    MyApp.lib.HttpProvider.superclass.clear.call(me, name);
                }
                else {
                    // parent sets value and fires event
                    MyApp.lib.HttpProvider.superclass.set.call(me, name, value);
                }
            }, me);
            if (false === me.dirty) {
                me.queue = [];
            }
            else {
                for (i = 0; i < options.queue.length; i++) {
                    found = false;
                    for (j = 0; j < me.queue.length; j++) {
                        if (options.queue[i].name === me.queue[j].name) {
                            found = true;
                            break;
                        }
                    }
                    if (true === found && me.encodeValue(options.queue[i].value) === me.encodeValue(me.queue[j].value)) {
                        Ext.Array.remove(me.queue, me.queue[j]);
                    }
                }
            }
            if (true === me.logSuccess) {
                me.log(me.saveSuccessText, o, response);
            }
            me.fireEvent('savesuccess', me);
        }
    },

    onSaveFailure: function (response) {
        if (true === this.logFailure) {
            this.log(this.saveFailureText, response);
        }
        this.dirty = true;
        this.fireEvent('savefailure', this);
    },

    start: function () {
        var me = this;
        me.dt.delay(me.delay);
        me.started = true;
    },

    stop: function () {
        this.dt.cancel();
        this.started = false;
    },

    set: function (name, value) {
        if (!name) {
            return;
        }
        this.queueChange(name, value);
    },

    queueChange: function (name, value) {
        var me = this, o = {}, i, found = false, lastValue = this.state[name], changed;

        for (i = 0; i < me.queue.length; i++) {
            if (me.queue[i].name === name) {
                lastValue = me.decodeValue(me.queue[i].value);
            }
        }

        // value can be object or array so we need to encode it to effectively compare it
        changed = undefined === lastValue || Ext.encode(lastValue) !== Ext.encode(value);

        if (changed) {
            o[me.paramNames.name] = name;
            o[me.paramNames.value] = me.encodeValue(value);
            for (i = 0; i < me.queue.length; i++) {
                if (me.queue[i].name === o.name) {
                    me.queue[i] = o;
                    found = true;
                }
            }
            if (false === found) {
                me.queue.push(o);
            }
            me.dirty = true;
        }
        if (me.started) {
            me.start();
        }
        return changed;
    },


    clear: function (name) {
        this.set(name, undefined);
    },

    isDirty: function () {
        return !!this.dirty;
    },

    isStarted: function () {
        return !!this.started;
    },

    log: function () {
        if (console) {
            console.log.apply(console, arguments);
        }
    }

});
