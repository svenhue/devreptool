/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.dom.Helper',
    ],

    name: 'MyApp',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    startView: 'MyApp.view.hv.viewport.Viewport',
    specialHost: '',

    launch: function () {
        let me = this;

        // customer declaration
        me.startView = 'MyApp.view.mm.viewport.MMViewport';






        switch (window.location.pathname) {
            case '/piet/MyApp/index.html':
                me.specialHost = 'https://printcop-ts.de/dxnt1/public';
                break;
            case '/msh4/':
                me.specialHost = 'https://printcop-ts.de/mshnt1/public';
                me.startView = 'MyApp.view.msh.viewport.Viewport';
                break;
            case '/tecdirect/':
                me.specialHost = 'https://printcop-ts.de/tecdnt1/public';
                me.startView = 'MyApp.view.tecd.viewport.Viewport';
                break;
            case '/ths/':
                me.specialHost = 'http://localhost/ths/index.php';
                me.startView = 'MyApp.view.ths.viewport.Viewport';
                break;
        }

        if (location.host.toLowerCase() === 'msh-portal.de') {
            me.specialHost = 'https://msh-portal.de/beta/public';
        }

        if (Ext.History.currentToken === 'view') {
            me.startView = 'MyApp.view.hv.viewport.SimpleViewport';
        }

        Ext.ariaWarn = Ext.emptyFn;

        Ext._wait = 'Bitte warten...';

        if (Ext.grid.RowEditor) {
            Ext.grid.RowEditor.prototype.saveBtnText = 'Übernehmen';
            Ext.grid.RowEditor.prototype.cancelBtnText = 'Abbrechen';
        }

        if (Ext.ux.TabCloseMenu) {
            Ext.ux.TabCloseMenu.prototype.closeTabText = 'Tab schließen';
            Ext.ux.TabCloseMenu.prototype.closeOtherTabsText = 'Alle anderen Tabs schließen';
            Ext.ux.TabCloseMenu.prototype.closeOthersTabsText = 'Alle anderen Tabs schließen';
            Ext.ux.TabCloseMenu.prototype.closeAllTabsText = 'Alle Tabs schließen';
        }

        if (Ext.grid.plugin.filterbar.filters.Boolean) {
            Ext.grid.plugin.filterbar.filters.Boolean.prototype.trueText = 'Ja';
            Ext.grid.plugin.filterbar.filters.Boolean.prototype.falseText = 'Nein';
        }

        Ext.Ajax.on('beforerequest', function (conn, options, eOpts) {

            if (me.specialHost)
                options.url = me.specialHost + options.url;

            if (MyApp.sessionToken && options.params && !options.params.token) {
                options.params.token = MyApp.sessionToken;
            }

            if (Ext.showMask)
                Ext.getBody().mask('Bitte warten...');

        });

        Ext.Ajax.on('requestcomplete', function () {
            if (Ext.showMask) {
                Ext.getBody().unmask();
                Ext.showMask = false;
            }
        });

        Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {

            if (Ext.showMask) {
                Ext.getBody().unmask();
                Ext.showMask = false;
            }

            if (response.status === 403) {
                Ext.showError('Ihre Anmeldung ist nicht mehr gültig!', function () {
                    window.location.reload();
                });
            }
        });

        Ext.handleFormErrors = function (controller, errors) {
            errors.each(function (item, index, length) {
                let message = item.message;

                switch (message) {
                    case 'Is not a valid email address':
                        message = Ext.form.field.VTypes.emailText;
                        break;
                    default:
                        message = Ext.form.field.Text.prototype.blankText;

                }
                controller.lookupReference(item.field).markInvalid(message);
            });
            Ext.resumeLayouts();
            Ext.showInputWarning();
        };

        Ext.showHint = function (message, fn) {
            Ext.Msg.show({
                title: 'Hinweis',
                msg: message,
                closable: false,
                buttons: Ext.MessageBox.OK,
                icon: Ext.Msg.WARNING,
                scope: this,
                fn: fn
            });
        };

        Ext.showError = function (message, fn) {
            Ext.Msg.show({
                title: 'Fehler',
                msg: message,
                buttons: Ext.MessageBox.OK,
                icon: Ext.Msg.ERROR,
                scope: this,
                fn: fn
            });
        };

        Ext.showQuestion = function (message, fn) {
            Ext.Msg.bottomTb.layout.pack = 'end';
            Ext.Msg.show({
                title: 'Frage',
                msg: message,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.Msg.QUESTION,
                closable: false,
                scope: this,
                fn: fn
            });
            Ext.Msg.bottomTb.layout.pack = 'center';
        };

        Ext.showInputWarning = function () {
            Ext.showError('Überprüfen Sie Ihre Eingaben!');
        };

        Ext.showServerActionFailed = function () {
            Ext.showError('Bei der Ausführung der Aktion ist ein Fehler aufgetreten!');
        };

        Ext.deleteRecord = function (record, view) {
            let store = record.store;
            Ext.showQuestion('Datensatz löschen?',
                function (choice) {
                    if (choice === 'yes') {

                        record.erase({
                            success: function () {
                                if (view) view.close();
                            },
                            failure: function (r, operation) {
                                let resultObj;


                                if (store) store.reload();

                                if (!operation.getError())
                                    resultObj = operation.getResponse().responseJson;

                                if (resultObj && resultObj.error === 'relations_exists') {
                                    Ext.showError('Der Datensatz konnte nicht gelöscht werden.<br>Es existieren Verknüpfungen zu anderen Daten!');
                                } else
                                    Ext.showServerActionFailed();
                            }
                        });
                    }
                }
            );
        };

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 2);
        };

        Ext.roundGridValues = function (value) {
            return Math.round(value * 100) / 100;
        };

        Ext.dateDiff = {

            inDays: function (d1, d2) {
                let t2 = d2.getTime(),
                    t1 = d1.getTime();
                return parseInt((t2 - t1) / (24 * 3600 * 1000));
            },

            inHours: function (d1, d2) {
                let t2 = d2.getTime(),
                    t1 = d1.getTime();
                return parseInt((t2 - t1) / (3600 * 1000));
            },

            inMinutes: function (d1, d2) {
                let t2 = d2.getTime(),
                    t1 = d1.getTime();
                return parseInt((t2 - t1) / (60 * 1000));
            }
        };


        Ext.download = function (config) {
            let form,
                removeNode = Ext.download.removeNode,
                frameId = Ext.id(),

                iframe = Ext.core.DomHelper.append(document.body, {
                    id: frameId,
                    name: frameId,
                    style: 'display:none',
                    tag: 'iframe'
                }),

                inputs = paramsToInputs(config.params);

            iframe.onload = Ext.download.onload;

            form = Ext.DomHelper.append(document.body, {
                action: me.specialHost + config.url,
                cn: inputs,
                method: config.method || 'GET',
                tag: 'form',
                target: frameId
            });

            form.submit();

            removeNode(form);

            Ext.defer(removeNode, 1000 * 60 * 10, null, [iframe]);

            function paramsToInputs(params) {
                let inputs = [];

                for (var key in params) {
                    let values = [].concat(params[key]);

                    Ext.each(values, function (value) {
                        inputs.push(createInput(key, value));
                    });
                }

                return inputs;
            }

            function createInput(key, value) {
                return {
                    name: Ext.htmlEncode(key),
                    tag: 'input',
                    type: 'hidden',
                    value: Ext.htmlEncode(value)
                };
            }
        };

        Ext.download.onload = function () {
            let response = this.contentDocument.body.innerHTML;
        };

        Ext.download.removeNode = function (node) {
            node.onload = null;
            node.parentNode.removeChild(node);
        };

        Ext.get(window.document).on('contextmenu', function (e) {
            if (e.target.localName === 'img' || e.target.localName === 'input' || e.target.localName === 'textarea')
                return true;
            else {
                e.preventDefault();
                return false;
            }
        });

        Ext.getURLParam = function (param) {
            let v = window.location.search.match(new RegExp('(?:[\?\&]' + param + '=)([^&]+)'));
            return v ? v[1] : null;
        };

        Ext.generateUUID = function () { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };

        let token = Ext.getURLParam('token');

        if (token && token !== '') {
            localStorage.setItem('session_token',token);
        }

        Ext.create(me.startView);

    },

    onAppUpdate: function () {
        Ext.showHint('Die Applikation wurde aktualisiert und muß neu gestartet werden!',
            function (button) {
                window.location.reload();
            }
        );
    }
});



























































































































































































