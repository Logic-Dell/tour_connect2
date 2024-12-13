(function ($) {
    var listingOwlCarousel = function ($scope) {
        if ($().owlCarousel) {
            $scope.find('.tf-listing-wrap.has-carousel .owl-carousel').each(function () {
                var
                    $this = $(this),
                    item = $this.data("column"),
                    item2 = $this.data("column2"),
                    item3 = $this.data("column3"),
                    item4 = $this.data("column4"),
                    spacing = $this.data("spacing"),
                    prev_icon = $this.data("prev_icon"),
                    next_icon = $this.data("next_icon");

                var loop = false;
                if ($this.data("loop") == 'yes') {
                    loop = true;
                }

                var arrow = false;
                if ($this.data("arrow") == 'yes') {
                    arrow = true;
                }

                var bullets = false;
                if ($this.data("bullets") == 'yes') {
                    bullets = true;
                }

                var auto = false;
                if ($this.data("auto") == 'yes') {
                    auto = true;
                }
                $('.has-overlay').on('initialized.owl.carousel translate.owl.carousel', function(e){
                    idx = e.item.index;
                    $(this).find('.owl-item').removeClass('active_overlay');
                    $(this).find('.owl-item').eq(idx+2).addClass('active_overlay');
                });

                $this.owlCarousel({
                    loop: loop,
                    margin: spacing,
                    nav: arrow,
                    dots: bullets,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    autoplayHoverPause: true,
                    navText: ["<i class=\"" + prev_icon + "\"></i>", "<i class=\"" + next_icon + "\"></i>"],
                    responsive: {
                        0: {
                            items: item3
                        },
                        768: {
                            items: item2
                        },
                        1000: {
                            items: item4
                        },
                        1400: {
                            items: item
                        }
                    }
                });
            });
        }
    }

    var listingFilterTabsTaxonomy = function ($scope) {
        $scope.find('.show_filter_tabs .wrap-listing-post').each(function () {
            var $wrap_container = $(this).closest('.wrap-listing-post');
            var loading = '<span class="loading-icon"><span class="dot-flashing"></span></span>';
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show().addClass('active');

            $(this).find('.filter-bar').children('a').hover(function (e) {
                e.preventDefault();
                var itemActive = $(this).index(),
                    contentActive = $(this).siblings().parents('.show_filter_tabs .wrap-listing-post').children('.content-tab').children().eq(itemActive);
                var numItems = contentActive.find('.listing').find('.item').length;
                $(this).closest('.filter-bar').find('.content').text(numItems + ' property');
            });

            $(this).find('.filter-bar').children('a').on('click', function (e) {
                e.preventDefault();

                $wrap_container.find('.content-tab').children().children().append(loading);
                var itemActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.show_filter_tabs .wrap-listing-post').children('.content-tab').children().eq(itemActive);
                $(this).addClass('active')
                contentActive.addClass('active').fadeIn('slow');
                var numItems = contentActive.find('.listing').find('.item').length;

                $(this).closest('.filter-bar').find('.content').text(numItems + ' property');

                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.show_filter_tabs .wrap-listing-post').children('.content-tab').children().eq(itemActive).siblings().hide();

                setTimeout(function () {
                    $wrap_container.find('.listing .loading-icon').fadeOut('', function () {
                        setTimeout(function () {
                            $wrap_container.find('.listing .loading-icon').remove();
                        }, 500);
                    });
                }, 700);
            });
        });
    }

    var swiperGalleryImages = function () {
        $(this).delay().queue(function () {
            new Swiper(".swiper-container.carousel-image-box", {
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                    clickable: true,
                    nextEl: ".swiper-button-next2",
                    prevEl: ".swiper-button-prev2",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 1
                },
            });
            $(this).dequeue();
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

    var viewVideoPopup = function() {
        $('span.view-tour-video').on('click', function (event) {
            event.preventDefault();
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

    var checkViewListing = function () {
        if ($('.tfvt-my-listing-search').length > 0) {
            var type = localStorage.getItem('VIEW_LISTING_TYPE');
            var dataCol = $('.wrap-tfvt-listing-card').data("col");
            switch (type) {
                case 'grid':
                    $('.wrap-tfvt-listing-card.cards-item').removeClass('list');
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
    

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_tour_listing.default', listingOwlCarousel);
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_tour_listing.default', function () {
            swiperGalleryImages();
            $('.show_filter_tabs .wrap-listing-post').find('.filter-bar').children('a').on('click', function (e) {
                swiperGalleryImages();
            })
        });
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_tour_listing.default', listingFilterTabsTaxonomy);
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_tour_listing.default', viewGalleryMagnificPopup);
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_tour_listing.default', viewVideoPopup);
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_booking_search_result.default', checkViewListing);
    });
})(jQuery);