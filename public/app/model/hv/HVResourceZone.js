/**
 * Created by kko on 2020-01-22.
 */
Ext.define('MyApp.model.hv.HVResourceZone', {
    extend: 'Sch.model.Event',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    idProperty: 'id',

    startDateField: 'start_at',
    endDateField: 'end_at',
    resourceIdField: 'hv_user_id',
    nameField: 'ident',
    recurrenceRuleField: 'recurrence_rule',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'hv_user_id', type: 'int'},
        {name: 'ident', type: 'string'},
        {name: 'start_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'start_time', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'end_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'end_time', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'repeat_type_ident', type: 'string'},
        {name: 'interval', type: 'int'},
        {name: 'repeat_until_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'is_new', type: 'boolean', persist: false},
        {
            name: 'recurrence_rule', type: 'string', persist: false, convert: function (v, a) {
                return 'FREQ=' + a.get('repeat_type_ident');
            }
        },
    ],

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    proxy: {
        type: 'rest',
        url: '/api/hv/resourcezones',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
