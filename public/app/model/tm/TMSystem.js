/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMSystem',
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
            {name: 'term', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'manufacturer', type: 'string'},
            {name: 'model', type: 'string'},
            {name: 'construction_year', type: 'integer'},
            {name: 'service_contract', type: 'boolean'},
            {name: 'is_active', type: 'boolean'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_service_provider_contact_id', type: 'integer'},
            {name: 'tm_building_id', type: 'integer'},
            {name: 'tm_service_provider_id', type: 'integer'},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'building_ident', type: 'string', persist: false},
            {name: 'stock_ident', type: 'string', persist: false},
        ],

        validators: [
            {field: 'ident', type: 'presence'},
            {field: 'term', type: 'presence'},
        ],

        proxy: {
            type: 'rest',
            url: '/api/tm/systems',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
