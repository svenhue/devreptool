/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.model.hv.HVCompanyDepartment',
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
            {name: 'hv_country_id', type: 'int', defaultValue: 17},
            {name: 'street', type: 'string'},
            {name: 'zip', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'country_ident', type: 'string'},
            {name: 'lat', type: 'number'},
            {name: 'lon', type: 'number'},
            {name: 'created_by', type: 'int', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
            {name: 'updated_by', type: 'int', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
        ],

        validators: [{
            field: 'ident',
            type: 'presence'
        },
            {
                field: 'name_1',
                type: 'presence'
            }
        ],

        proxy: {
            type: 'rest',
            url: '/api/hv/companydepartments',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
