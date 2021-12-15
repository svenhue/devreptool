/**
 * Created by kko on 08.12.21.
 */
Ext.define('MyApp.model.tm.TMUniversalTour', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name: 'id', mapping: 'TourNumber', type: 'string'},
        {name: 'TourNumber', type: 'string'},
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
        url: 'api/tm/mapping/universal/allTours',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
