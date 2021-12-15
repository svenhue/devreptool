/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMSystemBinary',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'filename', type: 'string'},
            {name: 'filename_org', type: 'string'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_system_id', type: 'integer'},
            {name: 'url', type: 'string', persist: false},
            {name: 'is_new', type: 'boolean', persist: false},
            {name: 'user_ident', type: 'string', persist: false},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        ],

        validators: [],

        proxy: {
            type: 'rest',
            url: '/api/tm/systembinaries',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
