/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMCCTestItem',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'value', type: 'unknown'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_cc_test_id', type: 'integer'},
            {name: 'hv_form_dev_item_id', type: 'integer'},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
        ],

        validators: [],

        proxy: {
            type: 'rest',
            url: '/api/tm/coronacheck/tests/items',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
