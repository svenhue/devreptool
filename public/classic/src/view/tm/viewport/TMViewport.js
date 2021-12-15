/**
 * Created by kko on 01.06.21.
 */
Ext.define('MyApp.view.tm.viewport.TMViewport', {
    extend: 'MyApp.view.hv.viewport.Viewport',

    requires: [
        'MyApp.view.tm.viewport.TMViewportController'
    ],

    xtype: 'tmViewport',

    controller: 'tmViewport',

    id: 'tmViewport',

});
