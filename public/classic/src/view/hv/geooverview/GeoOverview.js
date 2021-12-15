/**
 * Created by kko on 25.05.21.
 */
Ext.define('MyApp.view.hv.geooverview.GeoOverview', {
    extend: 'Ext.Panel',

    requires: [
        'MyApp.view.hv.geooverview.GeoOverviewModel',
		'MyApp.view.hv.geooverview.GeoOverviewController'
    ],

    xtype: 'geooverview',

    viewModel: {
        type: 'geooverview'
    },

    controller: 'geooverview',

    items: [
        /* include child components here */
    ]
});
