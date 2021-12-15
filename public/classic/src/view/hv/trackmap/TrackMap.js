/**
 * Created by kko on 2019-08-05.
 */

Ext.define('MyApp.view.hv.trackmap.HVZoom', {

    extend: 'Ext.chart.interactions.Abstract',

    type: 'hvzoom',
    alias: 'interaction.hvzoom',

    requires: [],

    isCrossZoom: true,

    config: {
        axes: true,

        gestures: {
            dragstart: 'onGestureStart',
            drag: 'onGesture',
            dragend: 'onGestureEnd',
            dblclick: 'onDoubleTap'
        }
    },

    stopAnimationBeforeSync: false,

    zoomAnimationInProgress: false,

    constructor: function () {
        this.callParent(arguments);
        this.zoomHistory = [];
    },

    applyAxes: function (axesConfig) {
        var result = {};

        if (axesConfig === true) {
            return {
                top: {},
                right: {},
                bottom: {},
                left: {}
            };
        } else if (Ext.isArray(axesConfig)) {
            // array of axis names - translate to full object form
            result = {};
            Ext.each(axesConfig, function (axis) {
                result[axis] = {};
            });
        } else if (Ext.isObject(axesConfig)) {
            Ext.iterate(axesConfig, function (key, val) {
                // axis name with `true` value -> translate to object
                if (val === true) {
                    result[key] = {};
                } else if (val !== false) {
                    result[key] = val;
                }
            });
        }

        return result;
    },

    getSurface: function () {
        return this.getChart() && this.getChart().getSurface('overlay');
    },

    setSeriesOpacity: function (opacity) {
        var surface = this.getChart() && this.getChart().getSurface('series');

        if (surface) {
            surface.element.setStyle('opacity', opacity);
        }
    },

    onGestureStart: function (e) {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            rect = chart.getInnerRect(),
            innerPadding = chart.getInnerPadding(),
            minX = innerPadding.left,
            maxX = minX + rect[2],
            minY = innerPadding.top,
            maxY = minY + rect[3],
            xy = chart.getEventXY(e),
            x = xy[0],
            y = xy[1];


        e.claimGesture();

        if (me.zoomAnimationInProgress) {
            return;
        }

        if (x > minX && x < maxX && y > minY && y < maxY) {
            me.gestureEvent = 'drag';
            me.lockEvents(me.gestureEvent);
            me.startX = x;
            me.startY = y;
            me.selectionRect = surface.add({
                type: 'rect',
                globalAlpha: 0.5,
                fillStyle: 'rgba(80,80,140,0.5)',
                strokeStyle: 'rgba(80,80,140,1)',
                lineWidth: 2,
                x: x,
                y: y,
                width: 0,
                height: 0,
                zIndex: 10000
            });
            me.setSeriesOpacity(0.8);

            return false;
        }
    },

    onGesture: function (e) {
        var me = this;

        if (me.zoomAnimationInProgress) {
            return;
        }

        if (me.getLocks()[me.gestureEvent] === me) {
            // eslint-disable-next-line vars-on-top, one-var
            var chart = me.getChart(),
                surface = me.getSurface(),
                rect = chart.getInnerRect(),
                innerPadding = chart.getInnerPadding(),
                minX = innerPadding.left,
                maxX = minX + rect[2],
                minY = innerPadding.top,
                maxY = minY + rect[3],
                xy = chart.getEventXY(e),
                x = xy[0],
                y = xy[1];

            if (x < minX) {
                x = minX;
            } else if (x > maxX) {
                x = maxX;
            }

            if (y < minY) {
                y = minY;
            } else if (y > maxY) {
                y = maxY;
            }

            y = maxY;
            me.startY = 0;

            me.selectionRect.setAttributes({
                width: x - me.startX,
                height: maxY
            });

            if (Math.abs(me.startX - x) < 11 || Math.abs(me.startY - y) < 11) {
                me.selectionRect.setAttributes({
                    globalAlpha: 0.5
                });
            } else {
                me.selectionRect.setAttributes({
                    globalAlpha: 1
                });
            }

            surface.renderFrame();

            return false;
        }
    },

    onGestureEnd: function (e) {
        var me = this;

        if (me.zoomAnimationInProgress) {
            return;
        }

        if (me.getLocks()[me.gestureEvent] === me) {
            // eslint-disable-next-line vars-on-top, one-var
            var chart = me.getChart(),
                surface = me.getSurface(),
                rect = chart.getInnerRect(),
                innerPadding = chart.getInnerPadding(),
                minX = innerPadding.left,
                maxX = minX + rect[2],
                minY = innerPadding.top,
                maxY = minY + rect[3],
                rectWidth = rect[2],
                rectHeight = rect[3],
                xy = chart.getEventXY(e),
                x = xy[0],
                y = xy[1];

            if (x < minX) {
                x = minX;
            } else if (x > maxX) {
                x = maxX;
            }

            if (y < minY) {
                y = minY;
            } else if (y > maxY) {
                y = maxY;
            }

            y = maxY;
            me.startY = 0;

            if (Math.abs(me.startX - x) < 11 || Math.abs(me.startY - y) < 11) {
                surface.remove(me.selectionRect);
            } else {
                me.zoomBy([
                    Math.min(me.startX, x) / rectWidth,
                    1 - Math.max(me.startY, y) / rectHeight,
                    Math.max(me.startX, x) / rectWidth,
                    1 - Math.min(me.startY, y) / rectHeight
                ]);

                me.selectionRect.setAttributes({
                    x: Math.min(me.startX, x),
                    y: Math.min(me.startY, y),
                    width: Math.abs(me.startX - x),
                    height: Math.abs(me.startY - y)
                });

                me.selectionRect.setAnimation(chart.getAnimation() || {
                    duration: 0
                });
                me.selectionRect.setAttributes({
                    globalAlpha: 0,
                    x: 0,
                    y: 0,
                    width: rectWidth,
                    height: rectHeight
                });

                me.zoomAnimationInProgress = true;

                chart.suspendThicknessChanged();
                me.selectionRect.getAnimation().on('animationend', function () {
                    chart.resumeThicknessChanged();

                    surface.remove(me.selectionRect);
                    me.selectionRect = null;

                    me.zoomAnimationInProgress = false;
                });
            }

            surface.renderFrame();
            me.sync();
            me.unlockEvents(me.gestureEvent);
            me.setSeriesOpacity(1.0);

            if (!me.zoomAnimationInProgress) {
                surface.remove(me.selectionRect);
                me.selectionRect = null;
            }
        }
    },

    zoomBy: function (rect) {
        var me = this,
            axisConfigs = me.getAxes(),
            chart = me.getChart(),
            axes = chart.getAxes(),
            isRtl = chart.getInherited().rtl,
            zoomMap = {},
            config, axis, x1, x2, isSide, oldRange, i;

        if (isRtl) {
            rect = rect.slice();
            x1 = 1 - rect[0];
            x2 = 1 - rect[2];
            rect[0] = Math.min(x1, x2);
            rect[2] = Math.max(x1, x2);
        }

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];

            config = axisConfigs[axis.getPosition()];

            if (config && config.allowZoom !== false) {
                isSide = axis.isSide();
                oldRange = axis.getVisibleRange();

                zoomMap[axis.getId()] = oldRange.slice(0);

                if (!isSide) {
                    axis.setVisibleRange([
                        (oldRange[1] - oldRange[0]) * rect[0] + oldRange[0],
                        (oldRange[1] - oldRange[0]) * rect[2] + oldRange[0]
                    ]);
                } else {
                    axis.setVisibleRange([
                        (oldRange[1] - oldRange[0]) * rect[1] + oldRange[0],
                        (oldRange[1] - oldRange[0]) * rect[3] + oldRange[0]
                    ]);
                }
            }
        }

        me.zoomHistory.push(zoomMap);
    },

    resetZoomHistory() {
        var zoomMap = this.zoomHistory.length > 0 ? this.zoomHistory[0] : null,
            axes = this.getChart().getAxes(),
            axis, i;
        if (zoomMap) {
            for (i = 0; i < axes.length; i++) {
                axis = axes[i];

                if (zoomMap[axis.getId()]) {
                    axis.setVisibleRange(zoomMap[axis.getId()]);
                }
            }
        }

        this.sync();

        this.zoomHistory = [];
    },

    undoZoom: function () {
        var zoomMap = this.zoomHistory.pop(),
            axes = this.getChart().getAxes(),
            axis, i;

        if (zoomMap) {
            for (i = 0; i < axes.length; i++) {
                axis = axes[i];

                if (zoomMap[axis.getId()]) {
                    axis.setVisibleRange(zoomMap[axis.getId()]);
                }
            }
        }

        this.sync();
    },

    onDoubleTap: function (e) {
        this.undoZoom();
    },

    destroy: function () {
        this.callParent();
    }
});

Ext.define('MyApp.view.hv.trackmap.TrackMap', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.Crosshair',
        'Ext.chart.series.Line',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.property.Grid',
        'Ext.layout.container.Border',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Separator',
        'Ext.ux.GMapPanel',
        'MyApp.view.hv.trackmap.HVZoom',
        'MyApp.view.hv.trackmap.TrackMapController',
        'MyApp.view.hv.trackmap.TrackMapModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvTrackMap',
    */

    viewModel: {
        type: 'hvTrackMap'
    },

    controller: 'hvTrackMap',

    layout: 'border',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Schliessen',
                            iconCls: 'far fa-remove',
                            listeners: {
                                click: 'onCloseBtnClick'
                            },
                            focusCls: false,
                            hidden: !me.closable
                        },
                        {
                            xtype: 'tbseparator',
                            hidden: !me.closable
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Techniker',
                            reference: 'hv_user_id',
                            minChars: 2,
                            width: 350,
                            typeAhead: true,
                            forceSelection: true,
                            valueField: 'id',
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{ident} - {lastname}, {firstname}',
                                '</tpl>'
                            ),
                            listConfig: {
                                minWidth: 500,
                                shadow: 'frame',
                                itemTpl: '<div>{ident} - {lastname}, {firstname}</div>'
                            },
                            bind: {
                                store: '{ResourceStore}',
                                value: '{userId}'
                            },
                            listeners: {
                                change: 'onResourceChange'
                            },
                            triggers: {
                                clear: {
                                    weight: -1,
                                    cls: 'x-fa fa-times',
                                    hidden: true,
                                    handler: function () {
                                        this.clearValue();
                                        this.getTriggers().clear.setHidden(true);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Original Zoomstufe',
                            iconCls: 'far fa-arrows-alt',
                            listeners: {
                                click: 'onOptimalZoomBtnClick'
                            }
                        },
                        {
                            xtype: 'datefield',
                            margin: '0 0 0 5',
                            hideLabel: true,
                            bind: '{date}',
                            width: 130,
                            listeners: {
                                change: 'onDateChange'
                            }
                        },

                        {
                            xtype: 'button',
                            iconCls: 'fas fa-arrow-left',
                            margin: '0 0 0 10',
                            tooltip: 'Tag zurück',
                            listeners: {
                                click: 'onPrevDayBtnClick'
                            }

                        },
                        {
                            xtype: 'button',
                            iconCls: 'fas fa-arrow-right',
                            tooltip: 'Tag vor',
                            listeners: {
                                click: 'onNextDayBtnClick'
                            }
                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gmappanel',
                            flex: 1,
                            cls: 'border-top',

                            center: {
                                geoCodeAddr: "Geseke"
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
                            xtype: 'cartesian',
                            reference: 'chart',

                            bind: {
                                store: '{Store}'
                            },

                            height: 250,
                            colors: [
                                '#115fa6'
                            ],

                            axes: [{
                                type: 'time',
                                dateFormat: 'H:i:s',
                                fields: [
                                    'location_at'
                                ],
                                position: 'bottom',
                                label: {
                                    rotate: {
                                        degrees: -45
                                    }
                                },
                                listeners: {
                                    visiblerangechange: 'onVisibleRangeChange'
                                }
                            },
                                {
                                    type: 'numeric',
                                    fields: [
                                        'speed'
                                    ],
                                    title: 'km/h',
                                    grid: {
                                        odd: {
                                            fill: '#e8e8e8'
                                        }
                                    },
                                    position: 'left'
                                }
                            ],
                            series: [{
                                type: 'line',
                                xField: 'location_at',
                                yField: [
                                    'speed'
                                ],
                                curve: {
                                    type: 'step-after'
                                },
                                fill: true,
                                marker: {
                                    color: '#dedede',
                                    opacity: 0,
                                    scaling: 0.01,
                                    animation: {
                                        duration: 200,
                                        easing: 'easeOut'
                                    }
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: function (component, item) {
                                        component.setHtml(Ext.Date.format(item.get('location_at'), 'd.m.Y H:i:s'));
                                    }
                                },
                                highlightCfg: {
                                    opacity: 1,
                                    scaling: 1.5
                                },
                                listeners: {
                                    itemmouseover: 'onItemMouseOver',
                                }
                            }],
                            plugins: {
                                chartitemevents: {
                                    moveEvents: true
                                }
                            },
                            interactions: [
                                {
                                    type: 'hvzoom'
                                },
                                {
                                    type: 'crosshair'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'propertygrid',
                    reference: 'propertygrid',
                    sortableColumns: false,
                    hideHeaders: true,
                    nameColumnWidth: 150,
                    region: 'east',
                    title: 'Details',
                    split: true,
                    collapsible: true,
                    sourceConfig: {
                        firstPosition: {
                            displayName: 'erste Position'
                        },
                        lastPosition: {
                            displayName: 'letzte Position'
                        },
                        firstMove: {
                            displayName: 'erste Bewegung'
                        },
                        lastMove: {
                            displayName: 'letzte Bewegung'
                        },
                        duration: {
                            displayName: 'Dauer (Std/Min)'
                        },
                        speed: {
                            displayName: 'km/h (max.)'
                        },
                        distance: {
                            displayName: 'Strecke (km)'
                        }
                    },
                    width: 280,
                    listeners: {
                        'beforeedit': {
                            fn: function () {
                                return false;
                            }
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
