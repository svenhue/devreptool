/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMStock',
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
            {name: 'building_ident', type: 'string', persist: false},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        ],

        validators: [
            {field: 'ident', type: 'presence'},
        ],

        proxy: {
            type: 'rest',
            url: '/api/tm/stocks',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
