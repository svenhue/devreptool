/**
 * Created by kko on 08.12.21.
 */
Ext.define('MyApp.model.tm.TMUniversalTrackingUnit', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name: 'id', mapping: 'unit_id', type: 'int'},
        {name: 'box_id', type: 'int'},
        {name: 'company_id', type: 'int'},
        {name: 'country_code', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'number', type: 'string'},
        {name: 'shortcut', type: 'string'},
        {name: 'vehicle_title', type: 'string'},
        {name: 'driver', type: 'string'},
        {name: 'car_reg_certificate', type: 'string'},
        {name: 'vin', type: 'string'},
        {name: 'vin', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'lat', type: 'number'},
        {
            name: 'mileage', type: 'number', convert: function (v, a) {
                return v / 1000;
            }
        },
        {name: 'lon', mapping: 'lng', type: 'number'},
        {
            name: 'movement_state', type: 'string', convert: function (v, a) {
                switch (a.get('movement_state').name) {
                    case 'driving':
                        return 'fährt';
                    case'standing':
                        return 'steht';
                }
            }
        },
        {
            name: 'state', type: 'string', convert: function (v, a) {
                return a.get('movement_state').name;
            }
        },
        {
            name: 'icon', type: 'string', convert: function (v, a) {
                switch (v) {
                    case 'car' :
                        return 'resources/images/tm/128x128/' + a.get('movement_state').name + '/car_sedan.png';
                    case 'truck' :
                        return 'resources/images/tm/128x128/' + a.get('movement_state').name + '/delivery_truck.png';
                    case 'minibus' :
                        return 'resources/images/tm/128x128/' + a.get('movement_state').name + '/minibus.png';
                }
            }
        },
        {
            name: 'map_icon', type: 'string', convert: function (v, a) {
                return a.get('movement_state').name;
            }
        },

    ],

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    proxy: {
        type: 'rest',
        url: 'api/tm/mapping/universal/allUnits',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
