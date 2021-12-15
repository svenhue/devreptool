/**
 * Created by kko on 2019-08-13.
 */
Ext.define('MyApp.model.hv.HVResourceType',
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
            {name: 'email_notification', type: 'boolean'},
            {name: 'is_external', type: 'boolean'},
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
            url: '/api/hv/resourcetypes',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
