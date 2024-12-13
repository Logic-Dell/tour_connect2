(function ($) {
    'use strict';
    if (document.getElementById('map')) {
        var geoData = {
            "type": "FeatureCollection",
            "features": []
        };
        mapboxgl.accessToken = tour_listing_vars.api_key_map_box ? tour_listing_vars.api_key_map_box : 'pk.eyJ1IjoidGhlbWVzZmxhdCIsImEiOiJjbGt3NGxtYncwa2F2M21saHM3M21uM3h2In0.9NbzjykXil1nELxQ1V8rkA';
    }

    var sortListing = function () {
        $('select#listing_order_by').on('change', function () {
            console.log('test');
            var selected = $(this).find(":selected").val();
            var currentUrl = window.location.href;

            if (currentUrl.indexOf('?') !== -1) {
                if (currentUrl.indexOf('orderBy=') !== -1) {
                    var regex = /(\?|&)orderBy=[^&]*/;
                    currentUrl = currentUrl.replace(regex, '$1orderBy=' + selected);
                } else {
                    currentUrl += '&orderBy=' + selected;
                }
            } else {
                currentUrl += '?orderBy=' + selected;
            }

            window.history.pushState({ path: currentUrl }, '', currentUrl);
            window.location.href = currentUrl;
        })
    }

    var viewGalleryMagnificPopup = function () {
        $('[data-mfp-event]').each(function () {
            var $this = $(this),
                defaults = {
                    type: 'image',
                    closeOnBgClick: true,
                    closeBtnInside: false,
                    mainClass: 'mfp-zoom-in',
                    midClick: true,
                    removalDelay: 500,
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            switch (this.st.type) {
                                case 'image':
                                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                    break;
                                case 'iframe':
                                    this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                                    break;
                            }
                        },
                        beforeClose: function () { },
                        close: function () { },
                        change: function () {
                            var _this = this;
                            if (this.isOpen) {
                                this.wrap.removeClass('mfp-ready');
                                setTimeout(function () {
                                    _this.wrap.addClass('mfp-ready');
                                }, 10);
                            }
                        }
                    }
                },
                mfpConfig = $.extend({}, defaults, $this.data("mfp-options"));

            var gallery = $this.data('gallery');
            if ((typeof (gallery) !== "undefined")) {
                var items = [],
                    items_src = [];

                if (gallery && gallery.length !== 0) {
                    for (var i = 0; i < gallery.length; i++) {
                        var src = gallery[i].image;
                        if (items_src.indexOf(src) < 0) {
                            items_src.push(src);
                            items.push({
                                src: src
                            });
                        }
                    }
                }

                mfpConfig.items = items;
                mfpConfig.gallery = {
                    enabled: true
                };
                mfpConfig.callbacks.beforeOpen = function () {
                    switch (this.st.type) {
                        case 'image':
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            break;
                        case 'iframe':
                            this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                            break;
                    }
                };
            }

            $this.magnificPopup(mfpConfig);
        });
    }

    var viewVideoPopup = function () {
        $('span.view-tour-video').on('click', function (event) {
            event.preventDefault();
            var $src = $(this).attr('data-src');
            setTimeout(() => {
                $(this).lightGallery({
                    dynamic: true,
                    dynamicEl: [{
                        'src': $src,
                        'thumb': '',
                        'subHtml': ''
                    }]
                });   
            });
        });
    }

    var onClickViewListingType = function () {
        if ($('.tfvt-my-listing-search').length > 0) {
            $('a.btn-display-listing-grid').click(function (event) {
                event.preventDefault();
                localStorage.setItem('VIEW_LISTING_TYPE', 'grid');
                checkViewListing();
            });
            $('a.btn-display-listing-list').click(function (event) {
                event.preventDefault();
                localStorage.setItem('VIEW_LISTING_TYPE', 'list');
                checkViewListing();
            });
        }
    }

    var checkViewListing = function () {
        if ($('.tfvt-my-listing-search').length > 0) {
            var type = localStorage.getItem('VIEW_LISTING_TYPE');
            var dataCol = $('.wrap-tfvt-listing-card').data("col");
            switch (type) {
                case 'grid':
                    $('.wrap-tfvt-listing-card.cards-item').removeClass('col-md-12 list');
                    $('.wrap-tfvt-listing-card.cards-item').addClass('col-md-6');
                    $('a.btn-display-listing-grid').addClass('active');
                    $('a.btn-display-listing-list').removeClass('active');
                    break;
                case 'list':
                    $('.wrap-tfvt-listing-card.cards-item').removeClass(dataCol);
                    $('.wrap-tfvt-listing-card.cards-item').addClass(' list col-md-12');
                    $('a.btn-display-listing-list').addClass('active');
                    $('a.btn-display-listing-grid').removeClass('active');
                    break;
                default:
                    break;
            }
        }
    }

    var customSearchForm = function (classWrapperFormSearch) {
        if(!$('.tf-search-form-tour-listing').length) return;

        $('.tf-search-form-tour-listing .title-field').remove();
        $(classWrapperFormSearch + ' #search_form .input-group > .search-field-inner').contents().unwrap();
        if ($('.tf-search-form-tour-listing .input-group>div').length) {
            $('.tf-search-form-tour-listing .input-group>div.is-active:not(.input_select_field_time_from,.input_select_field_time_to)').wrap('<div class="search-field-inner"></div>');
        }

        //Keyword Title
        if ($('.default-title-search-field .keyword-title-field').length) {
            var keyword_title = $('.default-title-search-field .keyword-title-field').text();
            $('.is-active[data-tax="keyword"]').find('.fa-search').hide();
            $('.is-active[data-tax="keyword"]').before('<span class="title-field"> <i class="fas fa-search search-icon"></i> ' + keyword_title + ' </span>');
        }

        // Destination Title
        if ($('.default-title-search-field .destination-title-field').length) {
            var location_title = $('.default-title-search-field .destination-title-field').text();
            $('.is-active[data-tax="ba_booking-locations"]').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.destination_icon+' class="search-icon" /> ' + location_title + ' </span>');
        }

         //Amenities Title
         if ($('.default-title-search-field .amenities-title-field').length) {
            var amenities_title = $('.default-title-search-field .amenities-title-field').text();
            $('.is-active[data-tax="ba_amenities"]').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.amenities_icon+' class="search-icon" /> ' + amenities_title + ' </span>');
        }

        // Type Title
        if ($('.default-title-search-field .type-title-field').length) {
            var type_title = $('.default-title-search-field .type-title-field').text();
            $('.is-active[data-tax="ba_booking-type"]').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.type_icon+' class="search-icon type-icon" /> ' + type_title + ' </span>');
        }

        // Start Date Title
        if ($('.default-title-search-field .start-date-title-field').length) {
            var sd_title = $('.default-title-search-field .start-date-title-field').text();
            $('.tf-search-form-tour-listing .search_date_wrapper_date_from').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.duration_icon+' class="search-icon" /> ' + sd_title + ' </span>');
        }

        // End Date Title
        if ($('.default-title-search-field .end-date-title-field').length) {
            var ed_title = $('.default-title-search-field .end-date-title-field').text();
            $('.tf-search-form-tour-listing .search_date_wrapper_date_to').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.duration_icon+' class="search-icon" /> ' + ed_title + ' </span>');
            
        }

        // Guests Title
        if ($('.default-title-search-field .guests-title-field').length) {
            var guests_title = $('.default-title-search-field .guests-title-field').text();
            $('.tf-search-form-tour-listing .search_guests_field.is-active').before('<span class="title-field"> <img alt="" src='+tour_listing_vars.guests_icon+' class="search-icon" /> ' + guests_title + ' </span>');
            
        }
    }

    var listingInMap = function () {
        var attributesArray = [];
        var elements = document.querySelectorAll('[data-id]');

        elements.forEach(function (element) {
            var attributes = element.attributes;
            var attributeObject = {};
            for (var i = 0; i < attributes.length; i++) {
                var attributeName = attributes[i].name;
                var attributeValue = attributes[i].value;
                attributeObject[attributeName] = attributeValue;
            }
            attributesArray.push(attributeObject);
        });

        const delay = 100;

        if (document.getElementById('map') && tour_listing_vars.map_service == 'google-map') {
            var mapOptions = {
                center: new google.maps.LatLng(16.076305, 108.221548),
                zoom: parseInt(tour_listing_vars.map_zoom),
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var infoObj = [];
            var markers = [];
            var markerClusterOptions = {
                gridSize: 40,
                maxZoom: 15,
                styles: [{
                    width: 50,
                    height: 50,
                    url: 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="#D01818" stroke="#D01818" stroke-width="10" stroke-opacity="0.25" d="M15,5c5.524,0,10,4.478,10,10s-4.478,10-10,10S5,20.522,5,15S9.478,5,15,5z"/></svg>'),
                    textColor: '#000',
                    textSize: 12
                }]
            };
        }

        if (document.getElementById('map') && tour_listing_vars.map_service == 'map-box') {
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [108.221548, 16.076305], // [lng, lat]
                zoom: tour_listing_vars.map_zoom,
                minZoom: 1,
                gestureHandling: 'cooperative',
                locations: [],
                draggable: false,
                scrollwheel: true,
                navigationControl: true,
                mapTypeControl: true,
                streetViewControl: false,
                pitchWithRotate: false,
                projection: 'equirectangular'
            });

            map.addControl(new mapboxgl.NavigationControl());

            map.on('load', () => {
                if (geoData.features.length == 0) return;
                jumpToListing(map, geoData.features[0]);

                map.loadImage(
                    tour_listing_vars.default_marker_image ? tour_listing_vars.default_marker_image :
                        tour_listing_vars.plugin_url + 'public/assets/image/map/mapbox-marker.png',
                    (error, image) => {
                        if (error) throw error;
                        map.addImage('custom-marker', image);
                    });

                map.addSource('properties', {
                    type: 'geojson',
                    data: geoData,
                    cluster: true,
                    clusterMaxZoom: 6, // Max zoom to cluster points on
                    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });

                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'properties',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#D01818',
                            100,
                            '#f1f075',
                            750,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40
                        ]
                    }
                });

                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'properties',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                });

                // map.addLayer({
                //     id: 'unclustered-point',
                //     type: 'symbol',
                //     source: 'properties',
                //     filter: ['!', ['has', 'point_count']],
                //     layout: {
                //         'icon-image': 'custom-marker',
                //         'icon-size': 0.55
                //     }
                // });

                // inspect a cluster on click
                map.on('click', 'clusters', (e) => {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: ['clusters']
                    });
                    const clusterId = features[0].properties.cluster_id;
                    map.getSource('properties').getClusterExpansionZoom(
                        clusterId,
                        (err, zoom) => {
                            if (err) return;

                            map.easeTo({
                                center: features[0].geometry.coordinates,
                                zoom: zoom
                            });
                        }
                    );
                });

                map.on('click', 'unclustered-point', (e) => {
                    createPopupMap(map, e.features[0])
                });

                map.on('mouseenter', 'clusters', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', 'clusters', () => {
                    map.getCanvas().style.cursor = '';
                });
                map.scrollZoom.disable();
            });
            mouseoverListingMapBox(map, geoData);


        }

        attributesArray.forEach(function (attribute) {
            if (attribute['data-location']) {
                setTimeout(function () {
                    if (document.getElementById('map') && tour_listing_vars.map_service == 'map-box') {
                        $.ajax({
                            type: "GET",
                            url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + attribute['data-location'] + ".json?access_token=" + mapboxgl.accessToken,
                            success: function (res) {
                                var currentListing = getMarkers(res.features[0], attribute);
                                geoData.features.push(currentListing);
                                //Popup
                                var popupHtml = '<div class="pop-up-map">'
                                    + '<div class = "popup-content"> '
                                    + '<div class="popup-thumb"><img loading="lazy" src="' + currentListing.properties.image + '" alt="' + currentListing.properties.title + '"></div>'
                                    + '<div class="pop-main-content">'
                                    + '<div class="popup-title">' + currentListing.properties.title + '</div>'
                                    + '<div class="popup-address">' + currentListing.properties.location + '</div>'
                                    + '<div class="popup-price">' + currentListing.properties.price + '</div>'
                                    + '</div>'
                                    + '</div>'
                                    + '</div>';

                                const popUps = document.getElementsByClassName('mapboxgl-popup');
                                if (popUps[0]) popUps[0].remove();

                                const popup = new mapboxgl.Popup({
                                    closeButton: true,
                                    closeOnClick: true,
                                    offset: 5,
                                    focusAfterOpen: false,
                                }).setHTML(popupHtml);

                                // create a HTML element for each feature
                                var el = document.createElement('div');
                                el.className = 'custom-marker';
                                el.innerHTML = '<span><b>' + currentListing.properties.price + '</b></span>';
                                new mapboxgl.Marker(el).setLngLat(currentListing.geometry.coordinates).setPopup(popup).addTo(map);
                            }
                        });
                    }
                    if (document.getElementById('map') && tour_listing_vars.map_service == 'google-map') {
                        geocoder.geocode({ 'address': attribute['data-location'] }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                map.setCenter(results[0].geometry.location);
                                map.setOptions({ draggable: true });

                                // Create a marker with custom content, image, and title
                                var marker = new google.maps.Marker({
                                    position: results[0].geometry.location,
                                    map: map,
                                    title: attribute['title'],
                                });
                                markers.push(marker);

                                // Create a custom info window
                                var infoWindow = new google.maps.InfoWindow({
                                    maxWidth: 240,
                                    pixelOffset: new google.maps.Size(0, -10),
                                    content: '<div class="pop-up-map">'
                                        + '<div class = "popup-content"> '
                                        + '<div class="popup-thumb"><img src="' + attribute['data-image'] + '" alt="' + attribute['title'] + '"></div>'
                                        + '<div class="pop-main-content">'
                                        + '<div class="popup-title">' + attribute['title'] + '</div>'
                                        + '<div class="popup-address">' + attribute['data-location'] + '</div>'
                                        + '<div class="popup-price">' + attribute['data-price-prefix'] + attribute['data-price'] + attribute['data-price-postfix'] + '</div>'
                                        + '</div>'
                                        + '</div>'
                                        + '</div>'
                                });
                                clickMarkerEvent(map, infoWindow, marker, infoObj);
                                mouseoverListingGoogleMap(map, infoWindow, marker, infoObj, attribute['data-id']);
                            } else {
                                console.log('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    }
                }, delay)
            }
        });

        if (document.getElementById('map') && tour_listing_vars.map_service == 'google-map') {
            setTimeout(() => {
                new MarkerClusterer(map, markers, markerClusterOptions);
            }, 1500);
        }
    }

    var mouseoverListingMapBox = function (map, geoData) {
        $('.wrap-tfvt-listing-card').on('mouseover', function () {
            for (const feature of geoData.features) {
                if ($(this).find('.tfvt-data-map').attr('data-id') == feature.properties.property_id) {
                    jumpToListing(map, feature);
                    createPopupMap(map, feature);
                }
            }
        });
    }

    var getMarkers = function (res, attribute) {
        return {
            "type": "Feature",
            "properties": {
                "id": res.id,
                "title": attribute['title'],
                "location": attribute['data-location'],
                "image": attribute['data-image'],
                "price": attribute['data-price'],
                "property_id": attribute['data-id']
            },
            "geometry": {
                "type": "Point",
                "coordinates": res.center
            }
        }
    }

    var createPopupMap = function (map, currentListing) {
        var popupHtml = '<div class="pop-up-map">'
            + '<div class = "popup-content"> '
            + '<div class="popup-thumb"><img loading="lazy" src="' + currentListing.properties.image + '" alt="' + currentListing.properties.title + '"></div>'
            + '<div class="pop-main-content">'
            + '<div class="popup-title">' + currentListing.properties.title + '</div>'
            + '<div class="popup-address">' + currentListing.properties.location + '</div>'
            + '<div class="popup-price">' + currentListing.properties.price + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';

        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();

        new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            offset: 1,
            focusAfterOpen: false,
        }).setLngLat(currentListing.geometry.coordinates).setHTML(popupHtml).addTo(map);
    }

    var jumpToListing = function (map, currentListing) {
        map.jumpTo({
            center: currentListing.geometry.coordinates,
            zoom: tour_listing_vars.map_zoom,
            pitch: 0,
            bearing: 0,
            essential: true,
            duration: 3000,
            speed: 1,
        });
    }

    var onLoadFixedMap = function () {
        if ($('#map').hasClass('no-fixed')) return;
        if (document.getElementById('map')) {
            $('#map').addClass('fixed').removeAttr('style').css({
                width: $('.map-container').innerWidth() + 'px',
            });
            window.scrollBy(0, 1);

            var top = $('#map').offset().top - parseFloat($('#map').css('marginTop').replace(/auto/, 0));
            var footTop = $('.fixed-map-stopper').offset().top - parseFloat($('.fixed-map-stopper').css('marginTop').replace(/auto/, 0));
            var maxY = footTop - $('#map').innerHeight();
            var windowTop = $(window).scrollTop();

            if (windowTop >= top) {
                if (windowTop <= maxY) {
                    $('#map').addClass('fixed').removeAttr('style').css({
                        width: $('.map-container').innerWidth() + 'px',
                        top: $('.map-container').offset().top
                    });
                } else {
                    $('#map').removeClass('fixed').css({
                        position: 'absolute',
                        top: 'auto',
                        bottom: '0',
                        width: $('.map-container').innerWidth() + 'px',
                        height: '100vh'
                    });
                }
            } else {
                $('#map').removeClass('fixed');
            }
        }
    }

    var onScrollFixedMap = function () {
        if ($('#map').hasClass('no-fixed')) return;
        if (document.getElementById('map')) {
            onLoadFixedMap();
            var top = $('#map').offset().top - parseFloat($('#map').css('marginTop').replace(/auto/, 0));
            var footTop = $('.fixed-map-stopper').offset().top - parseFloat($('.fixed-map-stopper').css('marginTop').replace(/auto/, 0));
            var maxY = footTop - $('#map').innerHeight();

            $(window).scroll(function (evt) {
                $('#main-content').css('overflow','hidden');
                var y = $(this).scrollTop();
                if (y >= top) {
                    if (y <= maxY) {
                        $('#map').addClass('fixed').removeAttr('style').css({
                            width: $('.map-container').innerWidth() + 'px',
                            top: '0px',
                        });
                    } else {
                        $('#map').removeClass('fixed').css({
                            position: 'absolute',
                            top: 'auto',
                            bottom: '0',
                            width: $('.map-container').innerWidth() + 'px',
                            height: '100vh'
                        });
                    }
                } else {
                    $('#map').removeClass('fixed');
                }
            });
        }
    }

    $(document).ready(function () {
        sortListing();
        viewGalleryMagnificPopup();
        viewVideoPopup();
        localStorage.removeItem('VIEW_LISTING_TYPE');
        onClickViewListingType();
        checkViewListing();
        customSearchForm('.tf-search-form-tour-listing');
        listingInMap();
        onLoadFixedMap();
        onScrollFixedMap();
    })
}(jQuery));