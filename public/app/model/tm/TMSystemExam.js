/**
 * Created by kko on 2019-07-04.
 */
Ext.define('MyApp.model.tm.TMSystemExam',
    {
        extend: 'Ext.data.Model',

        requires: [
            'Ext.data.proxy.Rest',
            'Ext.data.reader.Json',
            'Ext.data.validator.Format'
        ],

        fields: [
            {name: 'id', type: 'integer'},
            {name: 'interval', type: 'integer'},
            {name: 'warning_time', type: 'integer'},
            {name: 'last_exam_at', type: 'date', dateFormat: 'Y-m-d'},
            {name: 'hv_company_id', type: 'integer', persist: false},
            {name: 'tm_system_id', type: 'integer'},
            {name: 'hv_form_dev_id', type: 'integer'},
            {name: 'is_new', type: 'boolean', persist: false},
            {name: 'user_ident', type: 'string', persist: false},
            {name: 'exam_ident', type: 'string', persist: false},
            {name: 'created_by', type: 'integer', persist: false},
            {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
            {name: 'updated_by', type: 'integer', persist: false},
            {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        ],

        validators: {
            hv_form_dev_id: {type: 'format', matcher: /^[1-9]\d*$/}
        },

        proxy: {
            type: 'rest',
            url: '/api/tm/systemexams',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });
