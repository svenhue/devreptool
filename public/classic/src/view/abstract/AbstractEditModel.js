/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.abstract.AbstractEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.abstractedit',

    stores: {},

    formulas: {
        objCaption: function () {
            return this.getView().objCaption;
        },

        recordCaption: {
            bind: '{currentRecord.ident}',
            get: function (ident) {
                return ident ? ident : '* Neu *';
            }
        },

        toolbarCaption: {
            bind: '{currentRecord.ident}',
            get: function (ident) {
                return ident ? ident : '* Neu *';
            }
        }
    },

    data: {
        creator_ident: 'fffff',
        updated_by_ident: ''
    }

});