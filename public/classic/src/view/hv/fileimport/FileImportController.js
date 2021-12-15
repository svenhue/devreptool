/**
 * Created by kko on 2020-03-02.
 */
Ext.define('MyApp.view.hv.fileimport.FileImportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvFileImport',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCancelBtnClick: function (component, e) {
        let me = this;

        me.getView().close();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onImportBtnClick: function (component, e) {
        let me = this,
            data = new FormData(),
            view = me.getView(),
            viewModel = me.getViewModel(),
            file = me.lookupReference('filename').fileInputEl.dom.files[0];

        data.append('file', file);

        view.mask(Ext._wait);

        Ext.Ajax.request({
            url: viewModel.get('url'),
            timeout: 180000,
            rawData: data,
            params: {},
            headers: {'Content-Type': null}, //to use content type of FormData
            success: function (response) {
                let respObj = Ext.decode(response.responseText),
                    store = viewModel.get('store');

                view.unmask();

                store.load();

                if (respObj.hint.length) {
                    Ext.showHint('Die Übermittlung der Datei war erfolgreich!' + '<br><br>' + respObj.hint);
                } else {
                    Ext.showHint('Die Übermittlung der Datei war erfolgreich!');
                }

                me.getView().close();
            },
            failure: function (response) {
                view.unmask();
                Ext.showError('Die Übermittlung der Datei ist fehlgeschlagen!')
            }
        });
    }
});