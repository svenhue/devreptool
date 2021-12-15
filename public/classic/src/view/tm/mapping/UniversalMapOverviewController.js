/**
 * Created by kko on 25.11.21.
 */
Ext.define('MyApp.view.tm.mapping.UniversalMapOverviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmUniversalMapOverview',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    lastViewPortCountry: localStorage.getItem('viewPortCountry'),

    carIcon: {
        url: 'resources/images/tm/128x128/car_sedan.png', // url
        scaledSize: new google.maps.Size(48, 48), // scaled size
        // origin: new google.maps.Point(0, 0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    },


    truckIcon: {
        url: 'resources/images/tm/128x128/delivery_truck.png', // url
        scaledSize: new google.maps.Size(48, 48), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(19, 19) // anchor
    },

    miniBusIcon: {
        url: 'resources/images/tm/128x128/minibus.png', // url
        scaledSize: new google.maps.Size(48, 48), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    },

    filterUnits: function () {
        let me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            store = me.getStore('UnitStore');


        store.clearFilter(false);

        store.filter(function (record) {

            if (record.get('label').includes('NEU_'))
                return false;
            else
                return true;
        });

        // if (viewModel.get('allUnitsFilter'))
        //     store.filter([{property: 'com_address', value: me.getView().port}]);

        // if (viewModel.get('drivingUnitsFilter'))
        //     store.filter([{property: 'state', value: 'driving'}]);
        //


    },

    filterTour: function (unitIdent) {
        let me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            store = me.getStore('TourStore');


        store.clearFilter(false);

        store.filter(function (record) {

            if (record.get('TourNumber').includes(unitIdent + 'x'))
                return true;
            else
                return false;
        });

        // if (viewModel.get('allUnitsFilter'))
        //     store.filter([{property: 'com_address', value: me.getView().port}]);

        // if (viewModel.get('drivingUnitsFilter'))
        //     store.filter([{property: 'state', value: 'driving'}]);
        //


    },

    onMapReady: function (component, gmap) {
        let me = this,
            options = {
                imagePath: 'resources/images/m',
                maxZoom: 12
            };

        me.gmap = gmap;

        me.resourceMarkers = [];

        me.markerClusterer = new MarkerClusterer(me.gmap, null, options);
        me.markerClusterer.setGridSize(30);

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': 'Schweiz'}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                me.mapCHViewport = results[0].geometry.viewport;
                me.mapCHCenter = results[0].geometry.location;
                me.onResize();
            }
        });

        geocoder.geocode({'address': 'Deutschland'}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                me.mapDEViewport = results[0].geometry.viewport;
                me.mapDECenter = results[0].geometry.location;
                me.onResize();
            }
        });

        geocoder.geocode({'address': 'Europa'}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                me.mapEUViewport = results[0].geometry.viewport;
                me.mapEUCenter = results[0].geometry.location;
                me.onResize();
            }
        });

        // me.oms = new OverlappingMarkerSpiderfier(me.gmap, {
        //     markersWontMove: true,
        //     markersWontHide: true,
        //     basicFormatEvents: true
        // });

        // me.omsUnassigned = new OverlappingMarkerSpiderfier(me.gmap, {
        //     markersWontMove: true,
        //     markersWontHide: true,
        //     basicFormatEvents: true
        // });

        me.getStore('UnitStore').load();
        me.getStore('TourStore').load();
    },

    fillMap: function () {
        let me = this,
            viewModel = me.getViewModel(),
            markers = [],
            store = me.getStore('UnitStore');

        try {

            let labelAnchor = new google.maps.Point(-15, 10);

            //clear map
            me.markerClusterer.clearMarkers();

            store.each(function (record, index, all) {
                let latLng = new google.maps.LatLng(record.get('lat'), record.get('lon'));

                // let marker = new MarkerWithLabel({
                //     position: latLng,
                //     draggable: false,
                //     raiseOnDrag: false,
                //     map: me.gmap,
                //     // title: record.get('id'),
                //     labelContent: record.get('vehicle_title'),
                //     labelAnchor: labelAnchor,
                //     labelClass: 'map_label',
                //     labelStyle: {opacity: 1},
                //     icon: (record.icon=='minibus'?me.miniBusIcon:(record.icon=='car'?me.carIcon:me.truckIcon)),
                // });

                let marker = new MarkerWithLabel({
                    position: latLng,
                    draggable: false,
                    raiseOnDrag: false,
                    labelContent: record.get('label'),
                    labelAnchor: labelAnchor,
                    labelClass: 'box2 s9',
                    labelStyle: {opacity: 1},
                    // icon: icon,
                    // icon: imageUrl,
                    icon: (record.icon === 'minibus' ? me.miniBusIcon : (record.icon === 'car' ? me.carIcon : me.truckIcon)),
                });


                markers.push(marker);

            });

            me.markerClusterer.addMarkers(markers);

        } catch (e) {
            console.log(e);
        }

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
    onSearchClick: function (component, e) {
        let me = this;
        me.filterUnits();
    },

    /**
     * @param {Ext.data.Store} component
     * @param {Ext.data.Model[]} records
     * @param {Boolean} successful
     * @param {Ext.data.operation.Read} operation
     */
    onUnitStoreLoad: function (component, records, successful, operation) {
        let me = this,
            view = me.getView();

        me.filterUnits();
        me.fillMap();
        view.unmask();
    },

    /**
     * @param {Ext.data.Store} component
     * @param {Ext.data.Model[]} records
     * @param {Boolean} successful
     * @param {Ext.data.operation.Read} operation
     */
    onTourStoreLoad: function (component, records, successful, operation) {
        let me = this,
            unitStore = me.getStore('UnitStore'),
            view = me.getView();

        Ext.each(records, function (rec, index, all) {
            let r = unitStore.findRecord('label', rec.get('ExtraField1'), 0, false, false, true);
            if (r) {
                r.set('driver',rec.get('ActualDriverName'));
            }


        });


        me.filterUnits();
        me.fillMap();
        view.unmask();
    },

    /**
     * @param {Ext.Component} component
     * @param {Number} width
     * @param {Number} height
     * @param {Number} oldWidth
     * @param {Number} oldHeight
     */
    onResize: function (component, width, height, oldWidth, oldHeight) {
        let me = this;
        if (me.gmap) {

            switch (me.lastViewPortCountry) {
                case 'DE':
                    me.gmap.setCenter(me.mapDECenter);
                    me.gmap.fitBounds(me.mapDEViewport);
                    break;
                case 'CH':
                    me.gmap.setCenter(me.mapCHCenter);
                    me.gmap.fitBounds(me.mapCHViewport);
                    break;
                case 'EU':
                    me.gmap.setCenter(me.mapEUCenter);
                    me.gmap.fitBounds(me.mapEUViewport);
                    break;
                default:
                    me.gmap.setCenter(me.mapEUCenter);
                    me.gmap.fitBounds(me.mapEUViewport);
            }
        }
    },

    setMapPosition: function (lat, lon) {
        let me = this;

        me.gmap.setCenter(new google.maps.LatLng(lat, lon));
        me.gmap.setZoom(10);
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onCHClick: function (component, e) {
        let me = this;

        me.gmap.setCenter(me.mapCHCenter);
        me.gmap.fitBounds(me.mapCHViewport);
        localStorage.setItem('viewPortCountry', 'CH');
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDEClick: function (component, e) {
        let me = this;

        me.gmap.setCenter(me.mapDECenter);
        me.gmap.fitBounds(me.mapDEViewport);
        localStorage.setItem('viewPortCountry', 'DE');

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onEUClick: function (component, e) {
        let me = this;

        me.gmap.setCenter(me.mapEUCenter);
        me.gmap.fitBounds(me.mapEUViewport);
        localStorage.setItem('viewPortCountry', 'EU');

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onAllUnitsFilterClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel();

        viewModel.set('allUnitsFilter', component.pressed);
        viewModel.set('drivingUnitsFilter', !component.pressed);
        viewModel.set('drivingUnitsFilter', !component.pressed);
        me.filter();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDrivingUnitsFilterClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel();

        viewModel.set('allUnitsFilter', !component.pressed);
        viewModel.set('drivingUnitsFilter', component.pressed);
        viewModel.set('drivingUnitsFilter', !component.pressed);
        me.filter();
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onStandingUnitsFilterClick: function (component, e) {
        let me = this,
            viewModel = me.getViewModel();

        me.filter();
    },

    /**
     * @param {Ext.view.View} component
     * @param {Ext.data.Model} record
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.event.Event} e
     */
    onUnitItemClick: function (component, record, item, index, e) {
        let me = this;

        me.filterTour(record.get('label'))
    }

});
