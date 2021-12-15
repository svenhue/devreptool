/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMStockStoragePlace',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json',
            'Ext.data.validator.Format',
            'Ext.data.validator.Presence'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'ident', type: 'string'},
            {name: 'term', type: 'string'},
            {name: 'description', type: 'integer'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_stock_id', type: 'integer'},
            {name: 'is_new', type: 'boolean', persist: false},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        ],

        validators: {
            ident: {type: 'presence'},
            tm_stock_id: {type: 'format', matcher: /^[1-9]\d*$/}
        },

        proxy: {
            type: 'rest',
            url: '/api/tm/stockstorageplaces',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
