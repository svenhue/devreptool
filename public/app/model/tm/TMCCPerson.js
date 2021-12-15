/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMCCPerson',
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
            {name: 'code', type: 'string'},
            {name: 'lastname', type: 'string'},
            {name: 'firstname', type: 'string'},
            {name: 'phone', type: 'string'},
            {name: 'mobile', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'staff_sub_section', type: 'string'},
            {name: 'staff_section', type: 'string'},
            {name: 'status_ident', type: 'string', persist: false},
            {name: 'assignment', type: 'string'},
            {name: 'vaccination_1_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_2_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_3_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_4_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_5_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_6_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'vaccination_protection_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'recovered_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'notes', type: 'string'},
            {name: 'test_needed', type: 'boolean', persist: false},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_cc_vaccination_status_id', type: 'integer'},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
        ],

        validators: [
            {field: 'lastname', type: 'presence'},
        ],

        proxy: {
            type: 'rest',
            url: '/api/tm/coronacheck/persons',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
