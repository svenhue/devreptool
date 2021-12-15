/**
 * Created by kko on 30.04.20.
 */
Ext.define('MyApp.view.hv.binaryviewer.BinaryViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binaryviewer',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            image = me.lookupReference('image'),
            pdfViewer = me.lookupReference('pdf'),
            currentRecord = viewModel.get('currentRecord');

        if (currentRecord) {
            if (currentRecord.get('filename').toLowerCase().includes('.pdf')) {
                view.setActiveItem(1);
                pdfViewer.setSrc(currentRecord.get('url'));
            } else {
                view.setActiveItem(0);
                image.setSrc(currentRecord.get('url'));
            }

            view.setTitle(currentRecord.get('filename_org'));
        } else {
            view.setActiveItem(1);
            pdfViewer.setSrc(me.getViewModel().get('filename'));
        }
    }
});
