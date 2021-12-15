/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.coronacheck.PersonEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.tmPersonEdit',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.form.field.ComboBox} combo
     * @param {Ext.data.Model/Ext.data.Model[]} record
     */
    onVaccinationStatusSelect: function (combo, record) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

            currentRecord.set('status_ident', record.get('ident'));
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onVaccinationStatusChange: function (component, newValue, oldValue) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord');

        if (!newValue || newValue === '') {
            currentRecord.set('status_ident', null);
        }
    }
});
