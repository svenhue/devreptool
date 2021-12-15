/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.hv.HVQualification',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json',
            'Ext.data.validator.Presence'
        ],

        fields: [
            {name: 'id', type: 'int'},
            {name: 'ident', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'hv_company_id', type: 'int', persist: false},
            {name: 'created_by', type: 'int', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
            {name: 'updated_by', type: 'int', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
        ],

        validators: [{
            field: 'ident',
            type: 'presence'
        }],

        proxy: {
            type: 'rest',
            url: '/api/hv/qualifications',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
