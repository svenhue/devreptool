/**
 * Created by kko on 2019-08-01.
 */
Ext.define('MyApp.model.hv.HVMenuItem',
    {
        extend: 'Ext.data.Model',

        fields: [
            {name: 'id', type: 'string'},
            {name: 'text', type: 'string'},
            {name: 'iconCls', type: 'string'},
            {type: 'string', name: 'moduleClass'},
            {type: 'boolean', name: 'leaf'},
            {type: 'boolean', name: 'closable'},
            {name: 'sort_id', type: 'int'},
            {name: 'standalone', type: 'boolean'},
            {name: 'startalone', type: 'boolean'},
            {name: 'loadmask', type: 'boolean'},
            {name: 'ident', type: 'int'}
        ]

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

        /*
        Uncomment to add a rest proxy that syncs data with the back end.
        proxy: {
            type: 'rest',
            url : '/users'
        }
        */
    });