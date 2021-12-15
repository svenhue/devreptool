/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.model.hv.HVUser', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.validator.Format',
        'Ext.data.validator.Presence'
    ],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'ident', type: 'string'},
        {name: 'lastname', type: 'string'},
        {name: 'firstname', type: 'string'},
        {name: 'street', type: 'string'},
        {name: 'zip', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'hv_country_id', type: 'int'},
        {name: 'country_ident', type: 'string', persist: false},
        {name: 'loginname', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'office_email', type: 'string'},
        {name: 'office_email_2', type: 'string'},
        {name: 'office_phone', type: 'string'},
        {name: 'office_mobile', type: 'string'},
        {name: 'qualifications', type: 'string'},
        {name: 'web_access', type: 'boolean', defaultValue: true},
        {name: 'web_access_until', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'mobile_device_access', type: 'boolean'},
        {name: 'mobile_device_access_until', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_login_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_access_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_logout_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'session_token', type: 'string', persist: false},
        {name: 'reset_token', type: 'string', persist: false},
        {name: 'reset_token_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'qualifications', type: 'string'},
        {name: 'hv_company_id', type: 'int', persist: false},
        {name: 'hv_user_group_id', type: 'int'},
        {name: 'hv_report_id', type: 'int'},
        {name: 'user_group_ident', type: 'string', persist: false},
        {name: 'hv_company_department_id', type: 'int'},
        {name: 'department_ident', type: 'string', persist: false},
        {name: 'hv_resource_type_id', type: 'int'},
        {name: 'resource_type_ident', type: 'string', persist: false},
        {name: 'resource_email_notification', type: 'boolean', persist: false},
        {name: 'last_mobile_access_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'app_version', type: 'string', persist: false},
        {name: 'os', type: 'string', persist: false},
        {name: 'os_version', type: 'string', persist: false},
        {name: 'current_task_id', type: 'int', persist: false},
        {
            name: 'current_distance_to_task', type: 'number', persist: false, calculate: function (v, a) {
                return v / 10000;
            }
        },
        {name: 'task_ident', type: 'string', persist: false},
        {name: 'task_name', type: 'string', persist: false},
        {name: 'task_status_type_id', type: 'int', persist: false},
        {name: 'created_by', type: 'int', persist: false},
        {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'updated_by', type: 'int',  persist: false},
        {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
    ],

    validators: [
        {field: 'ident', type: 'presence'},
        {field: 'lastname', type: 'presence'},
        {field: 'hv_user_group_id', type: 'format', matcher: /^[1-9]\d*$/}
    ],

    proxy: {
        type: 'rest',
        url: '/api/hv/users',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
