/**
 * Created by kko on 2019-08-15.
 */
Ext.define('MyApp.model.hv.HVReport', {
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
        {name: 'uuid', type: 'string'},
        {name: 'definition', type: 'string', critical: true},
        {name: 'is_system_report', type: 'boolean'},
        {name: 'is_hidden', type: 'boolean'},
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
        url: '/api/hv/reports',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
