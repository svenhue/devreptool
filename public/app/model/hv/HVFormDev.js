/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.hv.HVFormDev',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json',
            'Ext.data.validator.Presence'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'ident', type: 'string'},
            {name: 'version', type: 'integer'},
            {name: 'term', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'is_hidden', type: 'boolean'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
        ],

        validators: [
            {field: 'ident', type: 'presence'},
        ],

        proxy: {
            type: 'rest',
            url: '/api/hv/formdevs',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
