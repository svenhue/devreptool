/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.hv.HVFormDevItem',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'term', type: 'string'},
            {name: 'input_type_ident', type: 'string', persist: false},
            {name: 'description', type: 'string'},
            {name: 'input_format', type: 'string'},
            {name: 'output_format', type: 'string'},
            {name: 'content', type: 'string'},
            {name: 'input_len', type: 'integer'},
            {name: 'visible_in_list', type: 'boolean', defaultValue: true},
            {name: 'visible_in_detail', type: 'boolean',defaultValue: true},
            {name: 'is_mandatory', type: 'boolean', defaultValue: false},
            {name: 'is_hidable', type: 'boolean', defaultValue: true},
            {name: 'read_only', type: 'boolean',  defaultValue: false},
            {name: 'is_hidden', type: 'boolean', defaultValue: false},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'hv_form_dev_id', type: 'integer'},
            {name: 'hv_input_type_id', type: 'integer'},
            {name: 'is_new', type: 'boolean', persist: false},
            {name: 'sort_id', type: 'integer'},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
        ],

        validators: [],

        proxy: {
            type: 'rest',
            url: '/api/hv/formdev/items',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
