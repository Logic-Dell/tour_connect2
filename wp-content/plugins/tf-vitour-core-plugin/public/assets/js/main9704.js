(function ($) {
    var handleAddWishlist = function () {
        $(document).on('click', '.btn-wishlist.add-wishlist:not(.loading)', function (e) {
            e.preventDefault();
            var $this = $(this);
            var tour_id = $this.data('tour-id'),
                title_wishlist = $this.attr('data-title-wishlist'),
                icon_wishlist = $this.attr('data-icon-wishlist'),
                title_not_wishlist = $this.attr('data-title-not-wishlist'),
                icon_not_wishlist = $this.attr('data-icon-not-wishlist');
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: main_variables.ajaxUrl,
                data: {
                    'action': 'handle_add_wishlist',
                    'tour_id': tour_id,
                    'mode': 'add',
                    'security': main_variables.wishlist_nonce,
                },
                beforeSend: function () {
                    $this.children('img').remove();
                    $this.append('<i class="far fa-spinner fa-spin"></i>');
                    $this.addClass('loading');
                },
                success: function (response) {
                    $this.children('i').remove();
                    if (response.logged_in) {
                        if (response.action === 'add') {
                            $this.removeClass('add-wishlist').addClass('remove-wishlist')
                            $this.append('<img src="' + icon_wishlist + '" alt="' + title_wishlist + '">');
                            $this.attr('data-tooltip', title_wishlist);
                        }
                    } else {
                        $this.append('<img src="' + icon_not_wishlist + '" alt="' + title_not_wishlist + '">');
                        // alert(response.message);
                        $("#tfvt_login_register_modal").modal('show');
                    }
                    $this.removeClass('loading');
                },
                error: function (error) {
                    $this.children('i').remove();
                    console.log('error');
                }
            });
        });
    }


    var handleRemoveWishlist = function () {
        $(document).on('click', '.btn-wishlist.remove-wishlist:not(.loading)', function (e) {
            e.preventDefault();
            var $this = $(this);
            var tour_id = $this.data('tour-id'),
                title_not_wishlist = $this.attr('data-title-not-wishlist'),
                icon_not_wishlist = $this.attr('data-icon-not-wishlist');
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: main_variables.ajaxUrl,
                data: {
                    'action': 'handle_add_wishlist',
                    'tour_id': tour_id,
                    'mode': 'remove',
                    'security': main_variables.wishlist_nonce,
                },
                beforeSend: function () {
                    $this.children('img').remove();
                    $this.append('<i class="far fa-spinner fa-spin"></i>');
                    $this.addClass('loading');
                },
                success: function (response) {     
                    $this.children('i').remove();
                    if (response.logged_in) {
                        if (response.action === 'remove') {
                            $this.removeClass('remove-wishlist').addClass('add-wishlist')
                            $this.append('<img src="' + icon_not_wishlist + '" alt="' + title_not_wishlist + '">');
                            $this.attr('data-tooltip', title_not_wishlist);
                        }
                    } else {
                        alert(response.message);
                    }
                    $this.removeClass('loading');
                },
                error: function (error) {
                    $this.children('i').remove();
                    console.log('error');
                }
            });
        });
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

    var custom_checkout = function() {
        $('#checkout_form_block > :nth-child(1), #checkout_form_block > :nth-child(2)').wrapAll('<div class="checkout-order"></div>');
        $('#checkout_form_block > :nth-child(2), #checkout_form_block > :nth-child(3), #checkout_form_block > :nth-child(4)').wrapAll('<div class="checkout-form-information"></div>');
    }

    var customSearchForm = function (classWrapperFormSearch) {

        $('.tf-search-form-inner-mobile .title-field').remove();
        $(classWrapperFormSearch + ' #search_form .input-group > .search-field-inner').contents().unwrap();
        if ($('#search_form .input-group>div').length) {
            $('.tf-search-form-inner-mobile .input-group>div.is-active:not(.input_select_field_time_from,.input_select_field_time_to)').wrap('<div class="search-field-inner"></div>');
        }

        //Keyword Title
        if ($('.default-title-search-field-mobile .keyword-title-field').length) {
            var keyword_title = $('.default-title-search-field-mobile .keyword-title-field').text();
            
            $('.is-active[data-tax="keyword"]').find('.fa-search').hide();
            $('.tf-search-form-inner-mobile .is-active[data-tax="keyword"]').before('<span class="title-field"> <i class="fas fa-search search-icon"></i> ' + keyword_title + ' </span>');
        }

        // Destination Title
        if ($('.default-title-search-field-mobile .destination-title-field').length) {
            
            var location_title = $('.default-title-search-field-mobile .destination-title-field').text();
            $('.tf-search-form-inner-mobile .is-active[data-tax="ba_booking-locations"]').before('<span class="title-field"> <img alt="" src='+main_variables.destination_icon+' class="search-icon" />' + location_title + ' </span>');
           
        }

         //Amenities Title
         if ($('.default-title-search-field-mobile .amenities-title-field').length) {
            var amenities_title = $('.default-title-search-field-mobile .amenities-title-field').text();
            $('.tf-search-form-inner-mobile .is-active[data-tax="ba_amenities"]').before('<span class="title-field"> ' + amenities_title + ' </span>');
        }

        // Type Title
        if ($('.default-title-search-field-mobile .type-title-field').length) {
            var type_title = $('.default-title-search-field-mobile .type-title-field').text();
            $('.tf-search-form-inner-mobile .is-active[data-tax="ba_booking-type"]').before('<span class="title-field"> <img alt="" src='+main_variables.type_icon+' class="search-icon type-icon" /> ' + type_title + ' </span>');
        }

        // Start Date Title
        if ($('.default-title-search-field-mobile .start-date-title-field').length) {
            var sd_title = $('.default-title-search-field-mobile .start-date-title-field').text();
            $('.tf-search-form-inner-mobile .search_date_wrapper_date_from').before('<span class="title-field"> <img alt="" src='+main_variables.duration_icon+' class="search-icon" /> ' + sd_title + ' </span>');
        }

        // End Date Title
        if ($('.default-title-search-field-mobile .end-date-title-field').length) {
            var ed_title = $('.default-title-search-field-mobile .end-date-title-field').text();
            $('.tf-search-form-inner-mobile .search_date_wrapper_date_to').before('<span class="title-field"> <img alt="" src='+main_variables.duration_icon+' class="search-icon" /> ' + ed_title + ' </span>');
            
        }

        // Guests Title
        if ($('.default-title-search-field-mobile .guests-title-field').length) {
            var guests_title = $('.default-title-search-field-mobile .guests-title-field').text();
            $('.tf-search-form-inner-mobile .search_guests_field.is-active').before('<span class="title-field"> <img alt="" src='+main_variables.guests_icon+' class="search-icon" /> ' + guests_title + ' </span>');
            
        }
    }

    var collap_filter = function() {
        // $('.widget-tf-booking-search-filter .tf-search-filter-terms-wrap').hide();
        $('.widget-tf-booking-search-filter .widget-title').on('click',function(){
            $(this).closest('.widget-tf-booking-search-filter').find('.tf-search-filter-terms-wrap').toggle();
            $(this).toggleClass('active');
           
        })

        // $('.widget-tf-booking-price-filter .widget-title').on('click',function(){
        //     $(this).closest('.widget-tf-booking-price-filter').find('.tf-booking-price-filter').toggle();
        //     $(this).toggleClass('active');           
        // })
    }


    jQuery(document).ready(function () {
        handleAddWishlist();
        handleRemoveWishlist();
        viewGalleryMagnificPopup();
        custom_checkout();
        customSearchForm('.tf-search-form-inner-mobile');
        collap_filter();
    })

    jQuery(document).on('touchstart', '.babe_price_slider .ui-slider-handle', function (e) {
        let t = e.touches[0] || e;
        jQuery(this).addClass('ui-state-hover').addClass('ui-state-active').addClass('ui-state-focus')
        var newEvent = new MouseEvent('mousedown', {
          screenX: t.screenX, screenY: t.screenY,
          clientX: t.clientX, clientY: t.clientY,
          relatedTarget: t.target,
        })
        Object.defineProperty(newEvent, 'target', {value: t.target, enumerable: true});
        Object.defineProperty(newEvent, 'currentTarget', {value: t.target, enumerable: true});
        jQuery(this).parent().slider("instance")._mouseDown(newEvent)
    });
    jQuery(document).on('touchend', '.babe_price_slider .ui-slider-handle', function (e) {
        let t = e.touches[0] || e;
        jQuery(this).removeClass('ui-state-hover').removeClass('ui-state-active').removeClass('ui-state-focus')
        var newEvent = new MouseEvent('mouseup', {
          screenX: t.screenX, screenY: t.screenY,
          clientX: t.clientX, clientY: t.clientY,
          relatedTarget: t.target,
        })
        Object.defineProperty(newEvent, 'target', {value: t.target, enumerable: true});
        Object.defineProperty(newEvent, 'currentTarget', {value: t.target, enumerable: true});
        jQuery(this).parent().slider("instance")._mouseUp(newEvent)
    });
    jQuery(document).on('touchmove', '.babe_price_slider .ui-slider-handle', function (e) {
        let t = e.touches[0] || e;
        var newEvent = new MouseEvent('mousemove', {
          screenX: t.screenX, screenY: t.screenY,
          clientX: t.clientX, clientY: t.clientY,
          relatedTarget: t.target,
          'bubbles': true,
          'cancelable': true,
        });
        Object.defineProperty(newEvent, 'target', {value: t.target, enumerable: true});
        Object.defineProperty(newEvent, 'currentTarget', {value: t.target, enumerable: true});
        jQuery(this).parent().slider("instance")._mouseMove(newEvent);
    });

    
    
})(jQuery);