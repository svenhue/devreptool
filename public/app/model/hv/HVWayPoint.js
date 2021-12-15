/**
 * Created by kko on 2019-08-11.
 */
Ext.define('MyApp.model.hv.HVWayPoint', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'location_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'altitude', type: 'int'},
        {name: 'speed', type: 'int'},
        {name: 'direction', type: 'int'},
        {name: 'precision', type: 'int'},
        {name: 'angle', type: 'int'},
        {name: 'distance', type: 'int'},
        {name: 'hv_company_id', type: 'int', persist: false},
        {name: 'hv_user_id', type: 'int'},
        {name: 'hv_mobile_device_id', type: 'int'}
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
        url: '/api/hv/users/track',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
