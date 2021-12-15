/**
 * Created by kko on 2020-03-02.
 */
Ext.define('MyApp.view.hv.fileimport.FileImport', {
    extend: 'Ext.Window',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.File',
        'Ext.layout.container.Anchor',
        'Ext.toolbar.Fill',
        'MyApp.view.hv.fileimport.FileImportController',
        'MyApp.view.hv.fileimport.FileImportModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvFileImport',
    */

    viewModel: {
        type: 'hvFileImport'
    },

    controller: 'hvFileImport',

    height: 150,
    width: 400,

    bodyPadding: 20,

    layout: 'anchor',

    title: 'Import',

    modal: true,

    resizable: false,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Abbrechen',
                    listeners: {
                        click: 'onCancelBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Import',
                    listeners: {
                        click: 'onImportBtnClick'
                    }
                }

            ]
        }
    ],

    items: [
        {
            xtype: 'fileuploadfield',
            reference: 'filename',
            anchor: '100%',
            text: 'XLS-Datei',
            emptyText: '*.xls',
            fileInputAttributes: {
                accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        }
    ]
});