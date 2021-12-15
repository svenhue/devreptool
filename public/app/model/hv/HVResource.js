/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.model.hv.HVResource', {
    extend: 'Sch.model.Resource',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.validator.Format',
        'Ext.data.validator.Presence'
    ],

    idProperty : 'id',
    nameField: 'lastname',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'ident', type: 'string'},
        {name: 'lastname', type: 'string'},
        {name: 'firstname', type: 'string'},
        {name: 'loginname', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'office_email', type: 'string'},
        {name: 'office_phone', type: 'string'},
        {name: 'office_mobile', type: 'string'},
        {name: 'qualifications', type: 'string'},
        {name: 'web_access', type: 'boolean'},
        {name: 'web_access_until', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'mobile_device_access', type: 'boolean'},
        {name: 'mobile_device_access_until', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_login_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_access_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_logout_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'session_token', type: 'string', persist: false},
        {name: 'mobile_session_token', type: 'string', persist: false},
        {name: 'reset_token', type: 'string', persist: false},
        {name: 'reset_token_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'qualifications', type: 'string'},
        {name: 'hv_company_id', type: 'int', persist: false},
        {name: 'hv_user_group_id', type: 'int'},
        {name: 'user_group_ident', type: 'string', persist: false},
        {name: 'hv_company_department_id', type: 'int'},
        {name: 'department_ident', type: 'string', persist: false},
        {name: 'hv_resource_type_id', type: 'int'},
        {name: 'resource_type_ident', type: 'string', persist: false},
        {name: 'resource_email_notification', type: 'boolean', persist: false},
        {name: 'last_mobile_access_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'accu_level', type: 'int', persist: false},
        {name: 'app_version', type: 'string', persist: false},
        {name: 'os', type: 'string', persist: false},
        {name: 'os_version', type: 'string', persist: false},
        {name: 'last_location_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'last_lon', type: 'number', persist: false},
        {name: 'last_lat', type: 'number', persist: false},
        {name: 'last_speed', type: 'int', persist: false},

        {
            name: 'transfer_status',
            type: 'string',
            convert: function (v, all) {
                if (all.get('mobile_session_token')) {
                    let access_at = all.get('last_mobile_access_at');
                    if (access_at) {
                        if (Ext.dateDiff.inHours(access_at, new Date()) >= 1)
                            return 'far fa-exclamation-triangle sq_warning';
                        else
                            return 'far fa-check-circle sq_ok';
                    }
                    else
                        return 'far fa-exclamation-triangle sq_unknown';
                }
                else
                    return 'far fa-circle sq_neutral'
            }
        },
        {
            name: 'drive_status',
            type: 'string',
            persist: false,
            convert: function (v, all) {
                let gps_at = all.get('last_location_at');

                if (gps_at && all.get('mobile_session_token')) {
                    if (Ext.dateDiff.inHours(gps_at, new Date()) >= 1) {
                        return 'neutral';
                    }
                    else
                        return (all.get('last_speed') < 10) ? 'warning' : 'ok';
                }
                else
                    return 'neutral'
            }
        },
        {
            name: 'accu_status',
            type: 'string',
            persist: false,
            convert: function (v, all) {
                let accu = all.get('accu_level');
                if (all.get('mobile_session_token')) {
                    if (accu >= 75)
                        return 'full sq_unkown';
                    else if (accu > 50)
                        return 'three-quarters sq_unkown';
                    else if (accu > 25)
                        return 'half sq_unkown';
                    else if (accu > 10)
                        return (accu > 15) ? 'quarter sq_warning' : 'quarter sq_critical';
                    else
                        return 'empty sq_critical';
                }
                else
                    return 'empty sq_neutral';
            }
        },
        {name: 'current_task_id', type: 'int', persist: false},
        {
            name: 'current_distance_to_task', type: 'number', persist: false, convert: function (v, a) {
                return v / 1000;
            }
        },
        {name: 'orders', type: 'int', persist: false},
        {name: 'created_by', type: 'int', persist: false},
        {name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false},
        {name: 'updated_by', type: 'int', persist: false},
        {name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s', persist: false}
    ],

    validators: [
        {field: 'ident', type: 'presence'},
        {field: 'lastname', type: 'presence'},
        {field: 'hv_user_group_id', type: 'format', matcher: /^[1-9]\d*$/}
    ],

    proxy: {
        type: 'rest',
        url: '/api/hv/resources',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
