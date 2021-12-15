/**
 * Created by kko on 01.06.21.
 */
Ext.define('MyApp.view.mm.viewport.MMViewport', {
    extend: 'MyApp.view.hv.viewport.Viewport',

    xtype: 'mmViewport',

    requires: [
        'MyApp.view.mm.viewport.MMViewportController'
    ],

    controller: 'mmViewport',

    id: 'mmViewport'

});
