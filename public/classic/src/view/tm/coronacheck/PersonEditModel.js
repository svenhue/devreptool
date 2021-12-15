/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.coronacheck.PersonEditModel', {
    extend: 'MyApp.view.abstract.AbstractEditModel',
    alias: 'viewmodel.tmPersonEdit',

    requires: [
        'MyApp.model.tm.TMCCVaccinationStatus'
    ],

    formulas: {
        objCaption: function () {
            return this.getView().objCaption;
        },

        recordCaption: {
            bind: '{currentRecord.lastname}',
            get: function (lastname) {
                return lastname ? lastname : '* Neu *';
            }
        },

        toolbarCaption: {
            bind: '{currentRecord.lastname}',
            get: function (lastname) {
                return lastname ? lastname : '* Neu *';
            }
        }
    },

    stores: {
        VaccinationStatusStore: {
            model: 'MyApp.model.tm.TMCCVaccinationStatus',
            pageSize: 1000,
            autoLoad: true,
            remoteFilter: false,
            remoteSort: false,
            sorters: [
                {
                    property: 'sort_id',
                    direction: 'asc'
                }
            ]
        },
    },

    data: {}
});
