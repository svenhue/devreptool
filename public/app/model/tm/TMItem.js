/**
 * Created by kko on 2019-07-29.
 */
Ext.define('MyApp.model.tm.TMItem', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.validator.Presence'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'ident', type: 'string'},
        {name: 'term', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'minimum_stock', type: 'number'},
        {name: 'item_unit_ident', type: 'string', persist: false},
        {name: 'hv_company_id', type: 'int', persist: false},
        {name: 'tm_item_unit_id', type: 'int'},
        {name: 'created_by', type: 'int', persist: false},
        {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'updated_by', type: 'int', persist: false},
        {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
    ],

    validators: [
        {field: 'ident', type: 'presence'},
    ],

    proxy: {
        type: 'rest',
        url: '/api/tm/items',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
