/**
 * Created by kko on 25.11.21.
 */
Ext.define('MyApp.view.tm.mapping.UniversalMapOverview', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Template',
        'Ext.layout.container.Border',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.ux.GMapPanel',
        'MyApp.lib.ux.SearchField',
        'MyApp.view.tm.mapping.UniversalMapOverviewController',
        'MyApp.view.tm.mapping.UniversalMapOverviewModel'
    ],

    xtype: 'tmUniversalMapOverview',

    viewModel: {
        type: 'tmUniversalMapOverview'
    },

    controller: 'tmUniversalMapOverview',

    title: 'Übersicht',

    layout: 'border',

    standalone: true,

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    style: 'border-bottom: 1px #CBCBCB solid !important;border-top: 1px #CBCBCB solid !important',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Schliessen',
                            iconCls: 'far fa-times',
                            listeners: {
                                click: 'onCloseBtnClick'
                            },
                            focusCls: false,
                            hidden: !me.closable
                        },
                        '-',
                        {
                            xtype: 'search',
                            emptyText: 'Fahrzeug / Einheit suchen',
                            width: 230
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Art',
                            width: 230
                        },
                        '->',
                        {
                            xtype: 'button',
                            iconCls: 'far fa-sigma',
                            text: '134',
                            pressed: true,
                            enableToggle: true,
                            listeners: {
                                click: 'onAllUnitsFilterClick'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'far fa-steering-wheel',
                            text: '14',
                            pressed: true,
                            enableToggle: false,
                            listeners: {
                                click: 'onDrivingUnitsFilterClick'
                            }

                        },
                        {
                            xtype: 'button',
                            iconCls: 'far fa-hourglass',
                            text: '51',
                            pressed: true,
                            enableToggle: false,
                            listeners: {
                                click: 'onStandingUnitsFilterClick'
                            }

                        },
                        '-',
                        {
                            xtype: 'button',
                            text: 'CH',
                            tooltip: 'auf Schweiz zoomen',
                            listeners: {
                                click: 'onCHClick'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'EU',
                            tooltip: 'auf Europa zoomen',
                            listeners: {
                                click: 'onEUClick'
                            }
                        },

                        {
                            xtype: 'button',
                            tooltip: 'Aktualisieren',
                            iconCls: 'far fa-sync',
                            listeners: {
                                click: 'onSearchClick'
                            }
                        },

                    ]
                },
            ],
            items: [
                {
                    xtype: 'gmappanel',
                    flex: 1,
                    region: 'center',
                    cls: 'border-top',

                    center: {
                        geoCodeAddr: "86510 Ried"
                    },

                    mapOptions: {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        zoom: 13
                    },

                    listeners: {
                        mapready: 'onMapReady'
                    }
                },
                {
                    xtype: 'grid',
                    region: 'west',
                    title: 'Fahrzeuge / Einheiten',
                    hideHeaders: true,
                    reference: 'resourceGrid',
                    split: true,
                    width: 380,
                    viewConfig: {
                        stripeRows: false
                    },
                    tools: [
                        {
                            iconCls: 'far fa-sync',
                            callback: function () {
                                me.getController().getStore('TourStore').clearFilter();
                            }
                        }, {
                            iconCls: 'far fa-cog',
                            callback: function () {
                            }
                        }
                    ],
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            dataIndex: 'lastname',
                            flex: 1,
                            tpl:
                                '<div style="height:26px;background-color:#edecec"><img style="height: 24px" src="{icon}"><span class="unit-top">&nbsp;&nbsp;{country_code}</span><span class="unit-top">&nbsp;&nbsp;{movement_state}</span><span class="unit-top">&nbsp;&nbsp;{speed:number("0")} km/h</span></div>' +
                                '<div style="height:20px"><span class="unit-additional">Name:</span><span class="unit-additional-value">{label}</span></div>' +
                                '<div style="height:20px"><span class="unit-additional">Fahrer:</span><span class="unit-additional-value">{driver}</span></div>' +
                                '<div style="height:20px"><span class="unit-additional">Kilometerstand:</span><span class="unit-additional-value">{mileage:number("0")} km</span></div>' +
                                '<div style="height:20px"><span class="unit-additional">VIN:</span><span class="unit-additional-value">{vin}</span></div>'
                        },
                    ],
                    bind: {
                        store: '{UnitStore}',
                    },
                    listeners: {
                        itemclick: 'onUnitItemClick'
                    }
                },
                {
                    xtype: 'grid',
                    title: 'Tourdaten',
                    stateId: 'tmTourGrid',
                    region: 'east',
                    width: 300,
                    split: true,
                    bind: {
                        store: '{TourStore}',
                    },
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            text: 'Tour',
                            dataIndex: 'TourNumber',
                            stateId: 'TourNumber',
                            tpl: '<div>{TourNumber}</div><div>{TourName}</div><div>{ActualDriverName}</div>',
                            minWidth: 140,
                            flex: 1
                        }
                    ]


                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        resize: 'onResize'
    }
});
