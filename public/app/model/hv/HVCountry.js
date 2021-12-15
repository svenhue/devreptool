/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.model.hv.HVCountry',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json'
        ],

        fields: [
            {name: 'id', type: 'int'},
            {name: 'iso_code_1', type: 'string'},
            {name: 'iso_code_2', type: 'string'},
            {name: 'ident', type: 'string'},
            {name: 'sort_id', type: 'int'},
            {name: 'created_by', type: 'int', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
            {name: 'updated_by', type: 'int', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
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
            url: '/api/hv/countries',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
