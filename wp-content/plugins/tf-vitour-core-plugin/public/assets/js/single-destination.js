(function ($) {
    'use strict';
    var galleryCarousel = function () {
        if ($('.gallery-destination .image-gallery').length > 0) {
            if ($().owlCarousel) {
                $('.image-gallery').owlCarousel({
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
                    responsive:{
                        0:{
                            items:1,
                            nav:true
                        },
                        600:{
                            items:2,
                            nav:false
                        },
                        1000:{
                            items:3,
                            nav:true,
                            loop:false
                        }
                    }
                });
                // $('.image-gallery').trigger('to.owl.carousel', 1);
            }
        }
    }

    var relatedCarousel = function () {
        if ($('.related-tour .group-card-item-listing').length > 0) {
            if ($().owlCarousel) {
                $('.group-card-item-listing').owlCarousel({
                    items: 3,
                    loop: false,
                    margin: 0,
                    nav: true,
                    dots: false,
                    smartSpeed: 500,
                    slideSpeed: 500,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    autoplayHoverPause: true,
                    navText: ['<i class="fas fa-angle-left">', '<i class="fas fa-angle-right">'],
                    responsive:{
                        0:{
                            items:1,
                            nav:true
                        },
                        600:{
                            items:2,
                            nav:false
                        },
                        1000:{
                            items:3,
                            nav:true,
                            loop:false
                        }
                    }
                });
                // $('.group-card-item-listing').trigger('to.owl.carousel', 1);
            }
        }
    }

    $(document).ready(function () {
        galleryCarousel();
        relatedCarousel();
    })
}(jQuery));