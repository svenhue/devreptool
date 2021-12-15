/**
 * Created by kko on 2019-07-25.
 */
Ext.define('MyApp.view.tm.system.SystemEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.tmSystemEdit',

    requires: [
        'MyApp.model.tm.TMSystemBinary',
        'MyApp.model.tm.TMSystemExam',
        'MyApp.view.hv.binaryviewer.BinaryViewer'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onBeforeClose: function (panel) {
        let me = this,
            view = me.getView(),
            binaryStore = me.getStore('SystemBinaryStore'),
            examStore = me.getStore('SystemExamStore'),
            currentRecord = me.getViewModel().get('currentRecord');
        if (me.closeMe) return true;
        if (currentRecord.dirty ||
            binaryStore.getNewRecords().length > 0 ||
            binaryStore.getModifiedRecords().length > 0 ||
            binaryStore.getRemovedRecords().length > 0 ||
            examStore.getNewRecords().length > 0 ||
            examStore.getModifiedRecords().length > 0 ||
            examStore.getRemovedRecords().length > 0
        ) {
            Ext.Msg.show({
                title: 'Frage',
                msg: 'Wollen Sie die Änderungen verwerfen?',
                buttons: Ext.Msg.YESNO,
                callback: function (btn) {
                    if ('yes' === btn) {
                        currentRecord.reject();
                        me.closeMe = true;
                        view.close();
                        return false;
                    }
                }
            })
        } else
            return true;
        return false;
    },

    /**
     * @param {Ext.ux.form.FileUploadField} component
     * @param {String} value
     */
    onImageFieldChange: function (component, value) {
        let me = this,
            view = me.getView(),
            store = me.getStore('SystemBinaryStore'),
            data = new FormData(),
            binaryFile = me.lookupReference('photofilefield').fileInputEl.dom.files[0];

        data.append('file', binaryFile);

        view.mask(Ext._wait);

        Ext.Ajax.request({
            method: 'post',
            url: '/api/tm/systembinaries/upload',
            rawData: data,
            params: {},
            headers: {'Content-Type': null}, //to use content type of FormData
            success: function (response) {
                let respObj = Ext.decode(response.responseText);
                view.unmask();
                let rec = new MyApp.model.tm.TMSystemBinary({
                    ext_id: respObj.data.ext_id,
                    filename: respObj.data.filename,
                    filename_org: respObj.data.filename_org,
                    url: respObj.data.url,
                    user_ident: respObj.data.user_ident,
                    created_at: respObj.data.created_at
                })
                store.add(rec);
            },
            failure: function () {
                view.unmask();
            }
        });
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteDocBtnClick: function (component, e) {
        let me = this,
            grid = me.lookupReference('binaryGrid'),
            store = me.getStore('SystemBinaryStore'),
            sel = grid.getSelection();
        Ext.showQuestion('Wollen Sie das Dokument löschen?', function (button) {
            if (button === 'yes') {
                store.remove(sel[0]);
            }
        });
    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onBinaryGridItemDblClick: function (component, record, item, index, e) {
        let me = this,
            view = me.getView(),
            win = Ext.create('MyApp.view.hv.binaryviewer.BinaryViewer', {
                height: view.getHeight() - 15,
                width: view.getWidth() - 15,
                viewModel: {data: {currentRecord: record}}
            });
        win.show();
    },

    /**
     * @param {Ext.Component} component
     */
    onBinaryGridAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        if (!currentRecord.phantom)
            me.getStore('SystemBinaryStore').filter([
                {property: 'tm_system_id', operator: '=', value: currentRecord.get('id')}
            ]);
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this;
        me.callParent(arguments);
    },

    /**
     * @param {Ext.form.field.ComboBox} combo
     * @param {Ext.data.Model/Ext.data.Model[]} record
     */
    onExamSelect: function (combo, record) {
        let me = this,
            grid = me.lookupReference('tmSystemExams'),
            sel = grid.getSelection();

        console.log(sel);


        sel[0].set('tm_exam_id', record.get('id'));
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onExamChange: function (component, newValue, oldValue) {
        let me = this,
            grid = me.lookupReference('tmSystemExams'),
            sel = grid.getSelection();

        if (!newValue || newValue === '') {
            sel[0].set('tm_exam_id', null);
            sel[0].set('exam_ident', null);
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNewSystemExamClick: function (component, e) {
        let me = this,
            store = me.getStore('SystemExamStore'),
            plugin = me.lookupReference('tmSystemExams').plugins[0];

        let rec = store.add(Ext.create(MyApp.model.tm.TMSystemExam, {
            created_at: new Date(),
            updated_at: new Date(),
            user_ident: MyApp.userName
        }));

        me.lookupReference('tmSystemExams').getSelectionModel().select(rec, true);

        // plugin.startEditByPosition({
        //     column: 0
        // });

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteSystemExamClick: function (component, e) {
        let me = this,
            grid = me.lookupReference('tmSystemExams'),
            store = me.getStore('SystemExamStore'),
            sel = grid.getSelection();
        Ext.showQuestion('Wollen Sie den Eintrag löschen?', function (button) {
            if (button === 'yes') {
                store.remove(sel[0]);
            }
        });
    },

    saveBinaries: function () {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('SystemBinaryStore');

        if (store.getNewRecords().length > 0 || store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0) {
            store.each(function (rec, index, all) {
                rec.set('tm_system_id', currentRecord.get('id'));
            });

            store.sync({
                    success: function () {
                        me.saveExams();
                    },
                    failure: function () {
                        view.unmask();
                        Ext.showError('Beim Speichern der Dokumente ist ein Fehler aufgetreten!');
                    }

                }
            );
        } else
            me.saveExams();
    },

    saveExams: function () {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord'),
            store = me.getStore('SystemExamStore');

        if (store.getNewRecords().length > 0 || store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0) {
            store.each(function (rec, index, all) {
                rec.set('tm_system_id', currentRecord.get('id'));
            });

            store.sync({
                    success: function () {
                        view.unmask();
                        view.close();
                    },
                    failure: function () {
                        view.unmask();
                        Ext.showError('Beim Speichern der Prüfprotokolle ist ein Fehler aufgetreten!');
                    }
                }
            );
        } else {
            view.unmask();
            view.close();
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            currentRecord = me.getViewModel().get('currentRecord');

        if (me.validate()) {
            view.mask(Ext._wait);
            currentRecord.save({
                success: function (record, operation) {
                    if (operation.action === 'create') {
                        me.getViewModel().get('store').add(currentRecord);
                    }
                    me.saveBinaries();
                },
                failure: function (record, operation) {
                    let resultObj;

                    view.unmask();

                    if (!operation.getError())
                        resultObj = operation.getResponse().responseJson;

                    if (resultObj && resultObj.error === 'exists') {
                        Ext.showError(me.getView().objCaption + ' existiert bereits!');
                        me.lookupReference(resultObj.field).markInvalid('existiert bereits');
                    } else
                        Ext.showServerActionFailed();
                }
            });
        }
    },

    /**
     * @param {Ext.Component} component
     */
    onExamGridAfterRender: function (component) {
        let me = this,
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        if (!currentRecord.phantom)
            me.getStore('SystemExamStore').filter([
                {property: 'tm_system_id', operator: '=', value: currentRecord.get('id')}
            ]);
    },
});
