/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.qualification.QualificationGridModel', {
    extend: 'MyApp.view.abstract.AbstractGridModel',
    alias: 'viewmodel.hvQualificationGrid',

    requires: [
        'MyApp.model.hv.HVQualification'
    ],

    stores: {
        Store: {
            model: 'MyApp.model.hv.HVQualification',
            pageSize: 60,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'ident',
                direction: 'asc'
            }]
        }
    },

    data: {}
});