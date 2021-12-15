/**
* Created by kko on 2019-07-04.
*/
Ext.define('MyApp.model.tm.TMServiceProviderContact',
{
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.validator.Presence'
    ],

    fields: [
        {name: 'id', type: 'integer'},
        {name: 'contact_person', type: 'string'},
        {name: 'function_in_operation', type: 'string'},
        {name: 'contact_phone', type: 'string'},
        {name: 'contact_mobile', type: 'string'},
        {name: 'contact_email', type: 'string'},
        {name: 'hv_company_id', type: 'integer', persist: false},
        {name: 'tm_service_provider_id', type: 'integer'},
        {name: 'is_new', type: 'boolean', persist: false},
        {name: 'created_by', type: 'int', persist: false},
        {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'updated_by', type: 'int', persist: false},
        {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
],

    validators: [
        {field: 'contact_person', type: 'presence'}
    ],

    proxy: {
        type: 'rest',
        url: '/api/tm/serviceprovidercontacts',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
