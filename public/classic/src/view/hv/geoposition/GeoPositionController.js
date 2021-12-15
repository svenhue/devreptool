/**
 * Created by kko on 31.05.18.
 */
Ext.define('MyApp.view.hv.geoposition.GeoPositionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hvgeoposition',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onMapReady: function (component, map) {
        var me = this;
        me.gmap = map;
        me.trafficLayer = new google.maps.TrafficLayer();
        me.refreshPosition();
    },

    updateMarker: function (lat, lon, speed, shortname) {
        var me = this,
            latLng = new google.maps.LatLng(lat, lon);

        if (me.marker) {
            me.marker.setMap(null);
            me.marker = null;
        }

        if (speed < 10)
            image = 'drive_0_32.png';
        else
            image = 'drive_1_32.png';

        imageUrl = 'resources/images/' + image;

        me.marker = new MarkerWithLabel({
            map: me.gmap,
            position: latLng,
            draggable: false,
            raiseOnDrag: true,
            labelContent: shortname,
            labelAnchor: new google.maps.Point(-5, 10),
            labelClass: 'map_label',
            labelStyle: {opacity: 0.9},
            icon: imageUrl
        });
        me.gmap.setCenter(latLng);
        me.gmap.setZoom(13);
    },

    refreshPosition: function () {
        let me = this,
            viewModel = me.getViewModel(),
            store;

        if (!viewModel) return;
        store = viewModel.get('store');

        if (viewModel) {
            let rec = store.findRecord('id', viewModel.get('id'), 0, false, false, true);
            viewModel.set('date', rec.get('last_location_at'));
            if (rec && rec.get('last_lat') !== 0) {
                let gpsTime = Ext.Date.format(rec.get('last_location_at'), 'd.m.y H:i:s'),
                    speed = rec.get('last_speed');

                if (viewModel.get('gpsTime') !== gpsTime) {
                    viewModel.set('name', rec.get('lastname') + ', ' + rec.get('firstname'));
                    if (speed < 10) speed = 0;
                    viewModel.set('gpsTime', gpsTime);
                    viewModel.set('gpsSpeed', speed.toString());
                    viewModel.set('lastGpsDate', rec.get('last_location_at'));
                    me.updateMarker(rec.get('last_lat'), rec.get('last_lon'), speed, rec.get('ident'));
                }
                viewModel.set('success', true);
            } else {
                viewModel.set('shortcut', '<b>Keine Positionsdaten vorhanden!</b>');
                viewModel.set('success', false);
                viewModel.set('gpsTime', '--.--');
                viewModel.set('gpsSpeed', '0');

            }

            Ext.defer(me.refreshPosition, 20000, me);
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onTrackClick: function (component, e) {
        // var me = this,
        //     viewModel = me.getViewModel(),
        //     name = viewModel.get('name'),
        //     from_date = Ext.Date.clearTime(viewModel.get('lastGpsDate')),
        //     from_time = from_date,
        //     to_date = Ext.Date.add(from_date, Ext.Date.SECOND, 86399),
        //     to_time = to_date;
        //
        // win = Ext.create('MyApp.view.hv.trackmap.TrackMap', {
        //     viewModel: {
        //         data: {
        //             id: viewModel.get('id'),
        //             name: name,
        //             fromDate: from_date,
        //             fromTime: from_time,
        //             toDate: to_date,
        //             toTime: to_time
        //         }
        //     }
        // });
        // win.show();


        let me = this,
            modulePanel = MyApp.modulePanel,
            viewModel = me.getViewModel(),
            view = modulePanel.addViewById('m_hv_track_map', null);

        if (view) {
            let mapViewModel = view.getController().getViewModel();
            mapViewModel.set('hv_user_id', null);
            mapViewModel.set('date', viewModel.get('date'));
            mapViewModel.set('userId', viewModel.get('id'));

            view.getController().filter();

            me.getView().close();
        }
    },

    /**
     * @param {Ext.form.field.Field} component
     * @param {Object} newValue
     * @param {Object} oldValue
     */
    onShowTrafficMap: function (component, newValue, oldValue) {
        let me = this;
        me.trafficLayer.setMap((me.trafficLayer.getMap()) ? null : me.gmap);
    }
});
