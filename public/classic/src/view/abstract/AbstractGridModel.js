/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.abstract.AbstractGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.abstractgrid',

    stores: {},

    data: {
        noSelection: true
    }
});
