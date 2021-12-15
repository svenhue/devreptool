/**
 * Created by kko on 2019-08-05.
 */
Ext.define('MyApp.view.hv.trackmap.TrackMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvTrackMap',

    requires: [
        'Ext.util.Format'
    ],
    /**
     * Called when the view is created
     */
    init: function () {
    },

    filter: function () {
        let me = this,
            viewModel = me.getViewModel(),
            store = me.getStore('Store');

        if (me.line) me.line.setMap(null);
        if (me.overMarker) me.overMarker.setMap(null);
        if (me.startMarker) me.startMarker.setMap(null);
        if (me.stopMarker) me.stopMarker.setMap(null);

        me.lookupReference('propertygrid').setSource({});

        store.removeAll();

        if (viewModel.get('hv_user_id')) {

            Ext.showMask = true;
            store.load({
                params: {
                    'user_id': viewModel.get('hv_user_id'),
                    'date': viewModel.get('date')
                }
            });
        }
    },

    onMapReady: function (component, map) {
        let me = this,
            viewModel = me.getViewModel();

        me.gmap = map;

        if (!viewModel.get('date')) {
            viewModel.set('hv_user_id', null);
            viewModel.set('date', new Date());
        }

        // me.filter();
    },

    fillMap: function (minDate, maxDate) {
        let me = this,
            view = me.getView(),
            store = me.getStore('Store'),
            firstPositionAt = null,
            lastPositionAt = null,
            firstMoveAt = null,
            lastMoveAt = null,
            duration = null,
            maxSpeed = 0,
            lastSpeed = 0,
            distance = 0,
            points = [],
            lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                strokeWeight: 1,
                strokeColor: '#ffffff',
                fillColor: '#157eb1',
                fillOpacity: 1.00,
                scale: 6
            };

        if (!me.gmap) return;

        me.bounds = new google.maps.LatLngBounds();

        if (me.line) me.line.setMap(null);
        if (me.overMarker) me.overMarker.setMap(null);
        if (me.startMarker) me.startMarker.setMap(null);
        if (me.stopMarker) me.stopMarker.setMap(null);

        store.each(function (item, index, all) {
            if (!minDate || item.get('location_at') >= minDate && item.get('location_at') <= maxDate) {
                let position = new google.maps.LatLng(item.get('lat'), item.get('lon'));


                if (!firstPositionAt) firstPositionAt = item.get('location_at');
                lastPositionAt = item.get('location_at');

                let speed = item.get('speed');

                if (speed > 10) {
                    if (!firstMoveAt) firstMoveAt = item.get('location_at');

                    if (lastSpeed !== 0)
                        lastMoveAt = item.get('location_at');
                }

                maxSpeed = Math.max(maxSpeed, speed);

                lastSpeed = speed;
                points.push(position);
                me.bounds.extend(position);
            }
        });


        if (points.length > 0) {

            me.startMarker = new MarkerWithLabel({
                position: new google.maps.LatLng(points[0].lat(), points[0].lng()),
                draggable: false,
                raiseOnDrag: false,
                clickable: false,
                map: me.gmap,
                labelContent: 'Start',
                labelAnchor: new google.maps.Point(-10, 10),
                labelClass: 'map_label',
                icon: {url: 'resources/images/drive_1_32.png'},
                labelStyle: {opacity: 0.9}
            });

            me.stopMarker = new MarkerWithLabel({
                position: new google.maps.LatLng(points[points.length - 1].lat(), points[points.length - 1].lng()),
                draggable: false,
                raiseOnDrag: false,
                clickable: false,
                map: me.gmap,
                labelContent: 'Stop',
                labelAnchor: new google.maps.Point(-10, 10),
                labelClass: 'map_label',
                icon: {url: 'resources/images/drive_0_32.png'},
                labelStyle: {opacity: 0.9}
            });

            me.line = new google.maps.Polyline({
                path: points,
                icons: [{
                    icon: lineSymbol,
                    offset: '0%',
                    repeat: '180px'
                }],
                clickable: false,
                strokeColor: '#3371af',
                geodesic: true,
                strokeOpacity: 1.00,
                strokeWeight: 4,
                map: me.gmap
            });

            me.gmap.fitBounds(me.bounds);

            distance = google.maps.geometry.spherical.computeLength(me.line.getPath());

            me.lookupReference('propertygrid').setSource({
                firstPosition: (firstPositionAt) ? Ext.Date.format(firstPositionAt, 'd.m.y H:i:s') : '',
                lastPosition: (lastPositionAt) ? Ext.Date.format(lastPositionAt, 'd.m.y H:i:s') : '',
                firstMove: (firstMoveAt) ? Ext.Date.format(firstMoveAt, 'd.m.y H:i:s') : '',
                lastMove: (lastMoveAt) ? Ext.Date.format(lastMoveAt, 'd.m.y H:i:s') : '',
                speed: Ext.util.Format.number(maxSpeed, '0.0'),
                // duration: Ext.Date.diff(firstMoveAt,lastMoveAt ,Ext.Date.MILLI),
                distance: Ext.util.Format.number(distance / 1000, '0.0')
            });
        }

        view.unmask();

    },

    /**
     * @param {Ext.data.Store} component
     * @param {Ext.data.Model[]} records
     * @param {Boolean} successful
     * @param {Ext.data.operation.Read} operation
     */
    onTrackLoad: function (component, records, successful, operation) {
        let me = this;
        if (records.length === 0)
            Ext.toast({
                html: 'Keine Daten für das eingestellte Datum vorhanden',
                // title: 'My Title',
                //width: 200,
                // align: '',
                // hideDuration: 200,
                autoCloseDelay: 2000
            });

        me.fillMap();
    },

    /**
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    onItemMouseOver: function (series, item, event) {
        let me = this,
            latLng = new google.maps.LatLng(item.record.get('lat'), item.record.get('lon'));

        if (me.overMarker) {
            if (item.record.get('lat') === me.overMarker.position.lat()) return;
            me.overMarker.setMap(null);
            me.overMarker = null;
        }

        me.overMarker = new google.maps.Marker({
            map: me.gmap,
            position: latLng,
            icon: {
                url: 'resources/images/location_32.png',
                anchor: new google.maps.Point(16, 16)
            }
        });

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCloseBtnClick: function (component, e) {
        let me = this;
        me.getView().close();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onOptimalZoomBtnClick: function (component, e) {
        let me = this,
            chart = me.lookupReference('chart');
        me.gmap.fitBounds(me.bounds);
        // chart.getInteraction('hvzoom').undoZoom();
        chart.getInteraction('hvzoom').resetZoomHistory();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onPrevDayBtnClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel(),
            date = Ext.Date.subtract(viewModel.get('date'), Ext.Date.DAY, 1);

        viewModel.set('date', date);

        // me.filter();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onNextDayBtnClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel(),
            date = Ext.Date.add(viewModel.get('date'), Ext.Date.DAY, 1);

        viewModel.set('date', date);

        // me.filter();
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onDateChange: function (component, newValue, oldValue) {
        let me = this,
            viewModel = me.getViewModel();

        viewModel.set('date', newValue);

        me.filter();
    },

    /**
     * @param {Ext.chart.axis.Axis} axis
     * @param {Array} visibleRange
     */
    onVisibleRangeChange: function (axis, visibleRange) {
        let me = this,
            layout = axis.getLayout(),
            range = axis.getRange(),
            segmenter = axis.getSegmenter(),
            attr = Ext.Object.chain(axis.getSprites()[0].attr);

        attr.min = range[0];
        attr.max = range[1];
        attr.visibleMin = visibleRange[0];
        attr.visibleMax = visibleRange[1];
        context = {
            attr: attr,
            segmenter: segmenter
        };

        layout.calculateLayout(context);
        if (context.majorTicks)
            me.fillMap(context.majorTicks.min, context.majorTicks.max);
        else
            me.fillMap(null, null);
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onResourceChange: function (component, newValue, oldValue) {
        let me = this,
            viewModel = me.getViewModel();

        component.getTriggers().clear.setHidden(false);

        if (newValue !== 0)
            viewModel.set('hv_user_id', newValue);
        else
            viewModel.set('hv_user_id', null);

        me.filter();
    }
});