/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.model.hv.HVCompany',
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
            {name: 'name_1', type: 'string'},
            {name: 'name_2', type: 'string'},
            {name: 'street', type: 'string'},
            {name: 'zip', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'hv_country_id', type: 'int', defaultValue: 17},
            {name: 'contact_person', type: 'string'},
            {name: 'contact_office_phone', type: 'string'},
            {name: 'contact_office_mobile', type: 'string'},
            {name: 'contact_office_email', type: 'string'},
            {name: 'web', type: 'string'},
            {name: 'is_master', type: 'boolean'},
            {name: 'access_until', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'config', type: 'string'},
            {name: 'auto_password_change', type: 'boolean'},
            {name: 'domain_shortcut', type: 'string'},
            {name: 'copyright_label', type: 'string'},
            {name: 'favicon', type: 'string'},
            {name: 'browser_title', type: 'string'},
            {name: 'logo', type: 'string'},
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
            url: '/api/hv/companies',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
