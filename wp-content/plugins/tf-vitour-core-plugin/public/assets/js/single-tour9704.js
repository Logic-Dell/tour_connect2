(function ($) {
    'use strict';
    var galleryCarousel = function () {
        if ($('.gallery-style-1 .container-images-gallery').length > 0) {
            if ($().owlCarousel) {
                $('.container-images-gallery').owlCarousel({
                    items: 3,
                    loop: false,
                    margin: 25,
                    nav: true,
                    dots: false,
                    smartSpeed: 500,
                    slideSpeed: 500,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    autoplayHoverPause: true,
                    navText: ['<i class="fas fa-angle-left">', '<i class="fas fa-angle-right">'],
                    responsive: {
                        0: {
                            items: 1,
                            nav: true
                        },
                        600: {
                            items: 2,
                            nav: false
                        },
                        1000: {
                            items: 3,
                            nav: true,
                            loop: false
                        }
                    }
                });
                // $('.container-images-gallery').trigger('to.owl.carousel', 1);
            }
        }
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
            console.log('tét');
            var $src = $(this).attr('data-src');
            $(this).lightGallery({
                dynamic: true,
                dynamicEl: [{
                    'src': $src,
                    'thumb': '',
                    'subHtml': ''
                }]
            });
        });
    }

    var initMapSingleListing = function () {
        var latlng, marker, mapSingle,
            mapContainer = $('.map-container'),
            latlngSearching = mapContainer.find('.latlng_searching');

        if (!document.getElementById('map-single')) return;

        if (latlngSearching.length && latlngSearching.val() != '') {
            latlng = latlngSearching.val();
            latlng = latlng.split(',');
        }
        else {
            latlng = [0, 0];
        }

        if (document.getElementById('map-single')) {
            mapboxgl.accessToken = tour_listing_vars.api_key_map_box ? tour_listing_vars.api_key_map_box : 'pk.eyJ1IjoidGhlbWVzZmxhdCIsImEiOiJjbGt3NGxtYncwa2F2M21saHM3M21uM3h2In0.9NbzjykXil1nELxQ1V8rkA';

            mapSingle = new mapboxgl.Map({
                container: 'map-single',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [0, 0], // [lng, lat]
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
            mapSingle.addControl(new mapboxgl.NavigationControl());
            // Create custom marker
            // const el = document.createElement('div');
            // el.className = 'marker';
            // el.style.backgroundImage = `url(${tour_listing_vars.default_marker_image ? tour_listing_vars.default_marker_image :
            //     tour_listing_vars.plugin_url + 'public/assets/image/map/map-marker.png'})`;
            // el.style.width = tour_listing_vars.marker_image_width;
            // el.style.height = tour_listing_vars.marker_image_height;
            // el.style.backgroundSize = '100%';
            // el.style.backgroundRepeat = 'no-repeat';
            // // Initialize the marker
            // marker = new mapboxgl.Marker({ element: el, draggable: false });

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'custom-marker';
            el.innerHTML = '<span><b>' + document.getElementById('map-single').dataset.price + '</b></span>';
            marker = new mapboxgl.Marker(el);

            var popupHtml = '<div class="pop-up-map">'
            + '<div class = "popup-content"> '
            + '<div class="popup-thumb"><img loading="lazy" src="' + document.getElementById('map-single').dataset.image + '" alt="' + document.getElementById('map-single').dataset.title + '"></div>'
            + '<div class="pop-main-content">'
           
            + '<div class="popup-title">' + document.getElementById('map-single').dataset.title + '</div>'
            
            + '</div>'
            + '</div>'
            + '</div>';


            const popup = new mapboxgl.Popup({
                
                closeButton: true,
                closeOnClick: true,
                offset: 5,
                focusAfterOpen: true,
            }).setHTML(popupHtml);




            if (latlng) {
                mapSingle.flyTo({
                    center: [latlng[1], latlng[0]],
                    zoom: tour_listing_vars.map_zoom,
                    pitch: 45,
                    bearing: 0,
                    essential: true,
                    duration: 3000,
                    speed: 1,
                    offset: [0, -150],
                });
                marker.setLngLat([latlng[1], latlng[0]]).setPopup(popup).addTo(mapSingle).togglePopup();
            }
        }
    }

    var onClickTabLocationSingleTour = function () {
        if ($('#map-single').length) {
            $('#tabs-single-tour li[aria-controls="tour-location"]').on('click', function () {
                initMapSingleListing();
            });
        }
    }

    var onChangeRatingStar = function () {
        $('.star-rating').on('click', 'i:not(.disabled-click)', function () {
            var rating = $(this).data('rating');
            var stars = $(this).parent('.star-rating').children();
            for (let i = 0; i < 5; i++) {
                stars[i].classList.remove('fas');
                stars[i].classList.add('far');
            }
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('fas');
                stars[i].classList.remove('far');
            }
        });
    }

    var handleEditReviewSingleListing = function () {
        $('.tfvt-btn-edit-review').on('click', function (e) {
            e.preventDefault();
            var reviewItem = $(this).closest('.comment_content');
            var editForm = reviewItem.find('.tfvt-form-edit-review');
            editForm.slideToggle();
        });

        $('.tfvt-btn-update-review').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            var reviewItem = $this.closest('.comment');
            var editForm = reviewItem.find('.tfvt-form-edit-review');
            var commentID = editForm.data('id');
            var reviewContent = editForm.siblings('.comment_text p');
            var ratingWrap = editForm.siblings('.comment-total-rating-stars');
            var newReview = $('#tfvt-edit-review-' + commentID).val().trim();
            var security_nonce = $('#tfvt_security_update_review').val();
            var updateReviewMessage = reviewItem.find('.tfvt_update_review_message');
            var starRatingEl = reviewItem.find('.rating-box #rating_service');
            var ratingElement = document.getElementById('rating_service');
            var newRatingValue = editForm.find('.edit_rating').val();
            ratingElement.value = editForm.find('#rating_service.star-rating > i.fas').length;
            var data = {
                'action': 'tfvt_update_review_listing_ajax',
                'tfvt_security_update_review': security_nonce,
                'reviewID': commentID,
                'newReview': newReview,
                'newRating': ratingElement.value,
            }

            $.ajax({
                type: 'POST',
                url: tour_listing_vars.ajax_url,
                data: data,
                beforeSend: function () {
                    $this.children('i').remove();
                    $this.append('<i class="fa-left fa fa-spinner fa-spin"></i>');
                },
                success: function (response) {
                    $this.children('i').removeClass('fa fa-spinner fa-spin');
                    if (response.status) {
                        setTimeout(() => {
                            location.reload();
                        }, 300);
                    } else {
                        $this.children('i').removeClass('fa-spinner fa-spin');
                        updateReviewMessage.text(response.message).css('color', 'red').fadeIn();
                    }
                },
                error: function (xhr, status, error) {
                    $this.children('i').removeClass('fa-spinner fa-spin');
                    console.log('The following error occurred: ' + status, error);
                },
                complete: function () {
                    $this.children('i').removeClass('fa fa-spinner fa-spin');
                }
            });
        });
    }

    var fixed_tab = function() {
        $(window).on("load resize", function () {
            // if (matchMedia("only screen and (min-width: 991px)").matches) {
                var class_fixed = $(".listing-tab-item");
                var fixed_height = class_fixed.height();
                var injectSpace = $("<div />", { height: fixed_height }).insertAfter( class_fixed );
                injectSpace.hide();
                $(window).on("load scroll resize", function () {
                        var top_height = $(".header-boxed #header").height(),
                            wpadminbar = $("#wpadminbar").height();
                        if (top_height == undefined) {
                            top_height = 0;
                        }
                        if (wpadminbar == undefined) {
                            wpadminbar = 0;
                        }

                       

                        if ($(window).scrollTop() >= top_height  + 270) {
                            class_fixed.addClass("fixed-show");
                            injectSpace.show();
                        } else {
                            class_fixed.removeClass("fixed-show");
                            injectSpace.hide();
                        }
                        if ( $(window).scrollTop() > 500 ) {
                            class_fixed.addClass('add-sticky');
                            $('#tabs-single-tour div.listing-tab-item ').css("margin-top",0);
                            class_fixed.css("top",top_height + wpadminbar );
                        } else {
                            $(".add-sticky").removeAttr("style");
                            class_fixed.removeClass('add-sticky');
                        }
                });
            }
        // }
    )}

    var check_available = function() {
        $('.check-available').on('click',function(e){
            e.preventDefault();
            scrollToTopWithOffset('widget-babe-booking-form', 180);
        })
    }

    function scrollToTopWithOffset(elementId, offset) {        
        const element = document.getElementById(elementId);
       
        if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - offset;
            
            console.log(scrollTop);
            window.scrollTo({
              top: scrollTop,
              behavior: 'smooth'
            });
          } else {
            console.error(`Không tìm thấy phần tử có ID "${elementId}".`);
          }
    }

    var carouselpopup = function() {    
        if ($('.popup-gallery-tour').length) {
            $('.popup-gallery-tour').magnificPopup({
                delegate: '.owl-item:not(.cloned) a',
                type: 'image',
                removalDelay: 500,
                mainClass: 'mfp-3d-unfold', 
                gallery:{
                    enabled:true
                },
                // zoom: {
                //     enabled: true, 
                //     duration: 300, 
                //     easing: 'ease-in-out', 
                // }
                callbacks: {
                    beforeOpen: function() {
                       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');                      
                    }
                },
                closeOnContentClick: true,
                 midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            });
        }
    }

    $(document).ready(function () {
        galleryCarousel();
        viewGalleryMagnificPopup();
        viewVideoPopup();
        initMapSingleListing();
        carouselpopup();
        if($("#tabs-single-tour").length > 0) {
            $("#tabs-single-tour").tabs();
        }
        onClickTabLocationSingleTour();
        onChangeRatingStar();
        handleEditReviewSingleListing();
        fixed_tab();
        check_available();
    })
}(jQuery));