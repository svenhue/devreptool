/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMCCTest',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'ident', type: 'string', persist: false},
            {name: 'staff_section', type: 'string', persist: false},
            {name: 'lastname', type: 'string', persist: false},
            {name: 'firstname', type: 'string', persist: false},
            {name: 'code', type: 'string', persist: false},
            {name: 'notes', type: 'string'},
            {name: 'status_1', type: 'string'},
            {name: 'status_2', type: 'string'},
            {
                name: 'status_icon', type: 'string', persist: false, convert: function (v, a) {
                    return a.get('status_1') === 'positiv' ? '<span class="fa fa-virus"/>' : '';
                }
            },
            {name: 'is_done', type: 'boolean'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_cc_person_id', type: 'integer'},
            {name: 'hv_form_dev_id', type: 'integer'},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: true},
        ],

        validators: [],

        proxy: {
            type: 'rest',
            url: '/api/tm/coronacheck/tests',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
