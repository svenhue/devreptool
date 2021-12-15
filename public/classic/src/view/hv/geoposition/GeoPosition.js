/**
 * Created by kko on 31.05.18.
 */
Ext.define('MyApp.view.hv.geoposition.GeoPosition', {
    extend: 'Ext.Window',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.TextItem',
        'Ext.ux.GMapPanel',
        'MyApp.view.hv.geoposition.GeoPositionController',
        'MyApp.view.hv.geoposition.GeoPositionModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvgeoposition',
    */

    viewModel: {
        type: 'hvgeoposition'
    },

    controller: 'hvgeoposition',


    width: 700,
    height: 600,

    modal: true,

    layout: 'fit',


    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            title: 'Position',

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Verkehrslage einblenden',
                            listeners: {
                                change: 'onShowTrafficMap'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Bewegungsprofil',
                            iconCls: 'fas fa-globe',
                            bind: {
                                disabled: '{!success}'
                            },
                            listeners: {
                                click: 'onTrackClick'
                            }
                        },
                        {
                            xtype: 'tbtext',
                            bind: '{name}',
                            margin: '0'
                        },
                        '->',
                        {
                            xtype: 'tbtext',
                            html: '<div class="far fa-clock"></div>',
                            margin: '0'
                        },
                        {
                            xtype: 'tbtext',
                            bind: '{gpsTime}',
                            margin: '0'
                        },
                        {
                            xtype: 'tbtext',
                            html: '<div class="fas fa-tachometer-alt"></div>',
                            margin: '0'
                        },
                        {
                            xtype: 'tbtext',
                            cls: 'speedLabel',
                            bind: '{gpsSpeed}',
                            margin: '0'
                        },
                        {
                            xtype: 'tbtext',
                            cls: 'speedLabel',
                            text: 'km/h',
                            margin: '0 5 0 0'

                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'gmappanel',
                    center: {
                        geoCodeAddr: "Koeln"
                    },

                    mapOptions: {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        zoom: 13
                    },

                    listeners: {
                        mapready: 'onMapReady'
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});
