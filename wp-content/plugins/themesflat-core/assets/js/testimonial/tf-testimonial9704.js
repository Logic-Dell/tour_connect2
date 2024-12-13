;(function($) {

    "use strict";

    var testimonialTypeGroup_Carousel = function() {
        if ( $().owlCarousel ) {
            $('.tf-testimonial-carousel-type-group').each(function(){
                var
                $this = $(this),
                spacer = Number($this.data("spacer")),
                prev_icon = $this.data("prev_icon"),
                next_icon = $this.data("next_icon");

                var arrow = false;
                if ($this.data("arrow") == 'yes') {
                    arrow = true;
                } 

                var testimonial = $this.find('.owl-carousel.testimonial');
                var thumbs = $this.find('.owl-carousel.thumbs'); 
                var syncedSecondary = true;             

                testimonial.owlCarousel({
                    items: 1,
                    loop: true,
                    margin: 0,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    slideSpeed: 500,
                    nav: arrow,
                    dots: false,
                    navText : ["<i class=\""+prev_icon+"\"></i>","<i class=\""+next_icon+"\"></i>"]
                }).on("changed.owl.carousel", syncPosition);

                function syncPosition(el) {
                    
                    var count = el.item.count - 1;
                    var odd = count == 1 ? 1 : 0.5;
                    var current = Math.round(el.item.index - el.item.count / 2 - odd);

                    if (current < 0) {
                        current = count;
                    }
                    if (current > count) {
                        current = 0;
                    }
                    thumbs.find(".owl-item").removeClass("current").eq(current).addClass("current");
                    var onscreen = thumbs.find(".owl-item.active").length - 1;
                    var start = thumbs.find(".owl-item.active").first().index();
                    var end = thumbs.find(".owl-item.active").last().index();
                    if (current > end) {
                        thumbs.data("owl.carousel").to(current, 1000, true);
                    }
                    if (current < start) {
                        thumbs.data("owl.carousel").to(current - onscreen, 1000, true);
                    }
                }

                thumbs.on("initialized.owl.carousel", function() {
                    thumbs.find(".owl-item").eq(0).addClass("current");
                }).owlCarousel({
                    items: 1,
                    margin: 30,
                    dots: false,
                    nav: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    slideSpeed: 500,
                    slideBy: 1,
                    navText : ["<i class=\""+prev_icon+"\"></i>","<i class=\""+next_icon+"\"></i>"]                    
                }).on("changed.owl.carousel", syncPosition2);

                function syncPosition2(el) {
                    if (syncedSecondary) {
                        var number = el.item.index;
                        testimonial.data("owl.carousel").to(number, 1000, true);
                    }
                }  

                thumbs.on("click", ".owl-item", function(e) {
                    e.preventDefault();
                    var number = $(this).index();
                    testimonial.data("owl.carousel").to(number, 1000, true);
                });
            });

        }
    }

    var listCarousel = function() {
        if ( $().owlCarousel ) {
            $('.tf-list-carousel').each(function(){
                var
                $this = $(this),
                tes1 = $this.data("column"),
                tes2 = $this.data("column2"),
                tes3 = $this.data("column3");

                var dot = false;
                if ($this.data("dot") == 'yes') {
                    dot = true;
                } 

                $('.owl-carousel').on('initialized.owl.carousel translate.owl.carousel', function(e){
                    var idx = e.item.index;
                    $(this).find('.owl-item').removeClass('active_center');
                    $(this).find('.owl-item').eq(idx+1).addClass('active_center');
                });

                $this.find('.owl-carousel').owlCarousel({
                    loop: true,
                    margin: 24,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    slideSpeed: 500,
                    nav: false,
                    dots: dot,
                    responsive: {
                        0: {
                            items: tes3
                        },
                        768: {
                            items: tes2
                        },
                        1000: {
                            items: tes1
                        },
                    }
                });
            });

        }
    }
    var swiperCarousel = function() { 
        // style 1
        var swiper = new Swiper(".testimonial-swiper-thumb", {
            spaceBetween: 22,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var swiper2 = new Swiper(".testimonial-swiper-content", {
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
        });

         // style 3
        var swiper3 = new Swiper(".testimonial-swiper-thumb2", {
            spaceBetween: 0,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            pagination: {
                el: ".swiper-pagination3",
                clickable: true,
            },
            direction: 'vertical',

        });
        var swiper4 = new Swiper(".testimonial-swiper-content2", {
        spaceBetween: 0,
        hashNavigation: {
            watchState: true,
        },
        navigation: {
            nextEl: ".swiper-button-next3",
            prevEl: ".swiper-button-prev3",
        },
        pagination: {
            el: ".number-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              let sum = this.slides.length;
              return '<span class="' + className + '">'  +(index + 1) +"/<span>"  + sum + "</span></span>";
            //   if (index > 10) {
            //     return '<span class="' + className + '">'  +(index + 1) +"/<span>"  + sum + "</span></span>";
            //   } else {
            //     let prev = 0;
            //     return '<span class="' + className + '">' + prev +(index + 1) +"/<span>" + prev + sum + "</span></span>";
            //   }

              }
            },

        thumbs: {
            swiper: swiper3,
        },
        
        
        });

        swiper4.on('slideChange', function() {
            swiper4.pagination.render();
            swiper4.pagination.update();
        });
        swiper3.on('slideChange', function() {
            swiper3.pagination.render();
            swiper3.pagination.update();
        });

        
         // style 2
        var swiper5 = new Swiper(".testimonial-swiper-slider2", {
            slidesPerView: 1,
            spaceBetween: 29,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination2",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next2",
                prevEl: ".swiper-button-prev2",
            },
            breakpoints: {
                450: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                868: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });

        swiper5.on('slideChange', function() {
            swiper5.pagination.render();
            swiper5.pagination.update();
        });

        
        // style 4
        var swiper6 = new Swiper(".testimonial-swiper-slider4", {
            slidesPerView: 1,
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination4",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next4",
                prevEl: ".swiper-button-prev4",
            },
        });
        swiper6.on('slideChange', function() {
            swiper6.pagination.render();
            swiper6.pagination.update();
        });
    }

    


    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-testimonial-carousel-type-group.default', testimonialTypeGroup_Carousel );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-list-carousel.default', listCarousel );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-testimonial-carousel-type-group.default', swiperCarousel );
    });

})(jQuery);
