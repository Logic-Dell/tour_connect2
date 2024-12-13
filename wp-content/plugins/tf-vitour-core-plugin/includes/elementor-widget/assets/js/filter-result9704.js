(function ($) {
    'use strict';

    var ajaxPagination = function () {
       
        $('.paging-navigation-ajax .page-numbers:not(.current)').each(function () {

            $(this).on('click', function (e) {
                e.preventDefault();

                var href = $(this).attr('href');
                var arr = href.split('/');
                var pageValue = arr[arr.indexOf('page') + 1];

                // var urlSearchParams = new URLSearchParams(href);
                // var pageValue = urlSearchParams.get('paged');
                // $('.paging-navigation .page-numbers').removeClass('current');
                // $(this).addClass('current');
                // var currentUrl = window.location.href;
                // var urlSearchParams = new URLSearchParams(window.location.search);
                // if (pageValue !== null) {
                //     urlSearchParams.set('page', pageValue);
                // } else {
                //     urlSearchParams.set('page', 1);
                // }
                // var newUrl = currentUrl.split('?')[0] + '?' + urlSearchParams.toString();
                // window.history.pushState({ path: newUrl }, '', newUrl);
                console.log(pageValue);
                var setValue;
                if(pageValue != null || pageValue != '' || !empty(pageValue)) {
                    setValue = pageValue;
                } 
                else setValue = 1;
                
                babe_search_form_submit(setValue);
                scrollToTopWithOffset('wrap-listing-post', 230);
            });
        });
    }

    function tf_set_search_min_max_prices( min, max ) {
        if ($('form#search_form').length > 0) {
            if ($('form#search_form input[name="min_price"]').length > 0) {
                $('form#search_form input[name="min_price"]').val(min);
            } else {
                $('form#search_form').append('<input type="hidden" name="min_price" value="' + min + '">');
            }
            if ($('form#search_form input[name="max_price"]').length > 0) {
                $('form#search_form input[name="max_price"]').val(max);
            } else {
                $('form#search_form').append('<input type="hidden" name="max_price" value="' + max + '">');
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

    function tfvt_get_number_text( $number, $many_text, $singular_text ) {
        if ( $number != 1 ) {
            return $many_text;
        } else {
            return $singular_text;
        }
    }

    function babe_search_form_submit(setValue ){
            
        $('#babe_search_result_refresh').css('display', 'block');
        
        $('.daterangepicker .drp-calendar.left .calendar-time .input_select_field').appendTo('#search_form .input-group');
        $('.daterangepicker .drp-calendar.right .calendar-time .input_select_field').appendTo('#search_form .input-group');
        
        if ( $('#search_form_tabs').length > 0 ){
            let tab_slug = $('#search_form input[name="search_tab"]').val();
            $('#search_form div[data-inputfield="1"]:not([data-active-'+tab_slug+'])').remove();        
        }
        
        $('#search_form input.input_select_input').removeAttr('name');
        
        $('#search_form .add_input_field[data-tax] .input_select_input_value').each(function(ind, elm){
        let term_taxonomy_id = $(elm).val();
        $('#search_form input[name="terms['+term_taxonomy_id+']"]').remove();
        if( term_taxonomy_id != 0){
            // append
            $('#search_form').append('<input type="hidden" name="terms['+term_taxonomy_id+']" value="'+term_taxonomy_id+'">');
        }        
        });

        // let $thumbnai_image = $('#thumbnai_image').val();


        let $show_cate = $('#show_cate').val();
        let $show_gallery = $('#show_gallery').val();
        let $show_video = $('#show_video').val();
        let $show_wishlist = $('#show_wishlist').val();
        let $show_review = $('#show_review').val();
        let $show_number_person = $('#show_number_person').val();
        let $show_day = $('#show_day').val();
        let $show_near_day = $('#show_near_day').val();
        let $show_price = $('#show_price').val();
        let $booking_pagination = $('#booking_pagination').val();

        
        let $item_per_page_archive_listing = $('#item_per_page_archive_listing').val();
        let $css_class_col = $('#css_class_col').val();
        let $layout_archive_listing = $('#layout_archive_listing').val();
        let $form = $('#search_form');
        let args = $('#search_form').serialize();
        let action = $('#search_form').attr('action');
        let action_args = action.split('?')[1];
        let url;
        
        if (action_args != undefined){
            url = action + '&' + args;
        } else {
            url = action + '?' + args;
        }
        // console.log(args);
        // document.location.href = url; 
        // $form.submit(function() {
        //     console.log('submit');
            $.ajax({
                type: 'POST',
                url: filter_result.ajax_url,               
                data:  args + '&action=handle_filter_result&security=' + filter_result.filter_nonce + '&item_per_page_archive_listing=' + $item_per_page_archive_listing + '&setValue=' + setValue + '&css_class_col=' + $css_class_col + '&layout_archive_listing=' + $layout_archive_listing + '&show_cate=' + $show_cate + '&show_gallery=' + $show_gallery + '&show_video=' + $show_video + '&show_wishlist=' + $show_wishlist + '&show_review=' + $show_review + '&show_number_person=' + $show_number_person + '&show_day=' + $show_day + '&show_near_day=' + $show_near_day  + '&show_price=' + $show_price + '&booking_pagination=' + $booking_pagination ,
                beforeSend: function () {
                    $('.tf-listing-wrap .wrap-listing-post').append('<div class="overlay-filter-tab" > <div class="filter-loader"></div> </div>');
                },
                success: function (response) {
                    // $('.pagination-wrap').hide();                                    
                    response = JSON.parse(response);
                    $('.tf-listing-wrap .wrap-listing-post').html(response.content);
                    $('.pagination-wrap').html(response.pagination);
                    $('.count-result.count-total').html(response.total_post);
                    $('.text-result').html(tfvt_get_number_text(response.total_post, 'Tours Results', 'Tour Result'));                   
                    viewGalleryMagnificPopup();
                    viewVideoPopup();
                    ajaxPagination();
             
                },
                error: function () {
                    console.log(error);
                },
            });
        // })
    }

    function update_term_values_in_search_form(elm){
        let term_taxonomy_id = $(elm).val();
        if($(elm).is(':checked')){
            // append
            $('form#search_form').append('<input type="hidden" name="terms['+term_taxonomy_id+']" value="'+term_taxonomy_id+'">');
        } else {
            // unchecked
            let fieldName = $(elm).attr('name').replace('filter_', '').replace(/\[.+?]/g, '');
           
            $('#search_form input[name="terms['+term_taxonomy_id+']"]').remove();
            $('#search_form .add_input_field[data-tax] .input_select_input_value[name="add_ids_'+fieldName+'"]').val(0);
        }
    }

    function update_term_values_in_search_form_advanted(elm){
        let term_taxonomy_id = $(elm).val();
        if($(elm).is(':checked')){
            // append
            $('form#search_form').append('<input type="hidden" name="terms['+term_taxonomy_id+']" value="'+term_taxonomy_id+'">');
        } else {
            // unchecked
            let fieldName = $(elm).attr('name').replace('filter_', '').replace(/\[.+?]/g, '');
            $('#search_form .add_input_field[data-tax] .input_select_input_value[name="add_ids_'+fieldName+'"]').val(0);
        }
    }

    function set_search_min_max_prices( min, max ) {
        if ($('form#search_form').length > 0) {
            if ($('form#search_form input[name="min_price"]').length > 0) {
                $('form#search_form input[name="min_price"]').val(min);
            } else {
                $('form#search_form').append('<input type="hidden" name="min_price" value="' + min + '">');
            }
            if ($('form#search_form input[name="max_price"]').length > 0) {
                $('form#search_form input[name="max_price"]').val(max);
            } else {
                $('form#search_form').append('<input type="hidden" name="max_price" value="' + max + '">');
            }
        }
    }

    var filter = function(){
        $('.tfvt-sidebar .term_item_checkbox label').on('click',function(){
            $(this).parent('.term_item').toggleClass('active-checkbox');
        });

      $( document.body ).unbind( 'babe_price_slider_change')
        $( document.body ).bind( 'babe_price_slider_change', function( event, min, max ) {
            set_search_min_max_prices( min, max );
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });
       
        $('.tf-search-filter-terms').on('change', 'input:checkbox', function(ev){
            update_term_values_in_search_form(this);
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });

        $('.search_advanced_field').unbind('change');
        $('.search_advanced_field').on('change', 'input:checkbox', function(ev){
            update_term_values_in_search_form_advanted(this);
        });

        $('.toolbar-search-list input[name="tf_sort_by"]').on('change', function(ev){
            $('input[name="search_results_sort_by"]').val($(this).val());

            switch($(this).val()) {
                case 'price_asc':
                    $('.input_select_sort').children("input").val('price_desc');
                    break;
                case 'title_asc':
                    $('.input_select_sort').children("input").val('title_desc');
                    break;
                case 'rating_asc':
                    $('.input_select_sort').children("input").val('rating_desc');
                    break;
                case 'avdatefrom_asc':
                    $('.input_select_sort').children("input").val('avdatefrom_desc');
                    break;
                default:
                    $('.input_select_sort').children("input").val('price_desc');
                    break;
               }  

            babe_search_form_submit();
        });

        $(".input_select_sort").unbind("click");
        $('.input_select_field_tf_sort_by  .input_select_sort').on('click', function(ev){
            $('input[name="search_results_sort_by"]').val($(this).children("input").val());
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });
        
        $( document.body ).bind( 'tf_price_slider_change', function( event, min, max ) {
            tf_set_search_min_max_prices( min, max );
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });

        $("#search_form .submit button").unbind("click");
        $('#search_form .submit button').on('click', function(ev){
            ev.preventDefault();
            //ev.stopPropagation();
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });

        $('.search_apply_btn').on('click', function(ev){
            $('#search_form .search_guests_select_wrapper').unbind('click');
            $('.close_by_apply_btn.is-active').css('display:none;');
            ev.preventDefault();
            //ev.stopPropagation();
            babe_search_form_submit();          
            
            scrollToTopWithOffset('wrap-listing-post', 230);
        });


        // $("#search_form .search_guests_title").unbind("click");
        // $('#search_form .search_guests_field > div').on('click', function(){        
        
        //     var window_width = $(window).width();
        //     var dropdown = $('#search_form .search_guests_select_wrapper');
        //     var block_left = $(this).offset().left;
        //     var dropdown_width = dropdown.outerWidth();
        //     var css_left = dropdown_width+'px';
            
        //     if (block_left + dropdown_width + 20 > window_width){
        //         //css_left = '-'+css_left;
        //         dropdown.css('right', '0');
        //     } else {
        //         dropdown.css('right', 'auto');
        //     }
            
        //     $('#search_form .search_guests_select_wrapper').show();
        //     $('#search_form .search_apply_btn').on('click', function(ev){
        //         $('#search_form .search_guests_select_wrapper').unbind('click');
        //         ev.preventDefault();
        //         $('.close_by_apply_btn.is-active').hide();
        //     });
        // });
        
        $('.add_input_field .add_ids_list .term_item').on('click', function(event){
            event.preventDefault();
            babe_search_form_submit();
            scrollToTopWithOffset('wrap-listing-post', 230);
        });

        // $('#date_to.search_date,#date_from.search_date').on('click', function(event){
        //     event.preventDefault();
        //     babe_search_form_submit();
        // });
        
        activate_search_form_daterangepicker( get_search_form_active_tab_slug() );
    }

    function init_search_form_daterangepicker( is_single ){

        if ( !$('#date_from.search_date').length ){
            return;
        }

        $('#date_from.search_date').daterangepicker({
            minDate: moment().format(babe_lst.drp_date_format),
            singleDatePicker: is_single,
            autoApply: true,
            autoUpdateInput: false,
            dateFormat: babe_lst.drp_date_format,
            customClass: 'search-popup-date',
            widthSingle: 500,
            timePickerIncrement: 60,
            timePickerSeconds: false,
            timePicker: false,
            locale: {
                "format": babe_lst.drp_date_format,
                "separator": " - ",
                "customRangeLabel": babe_lst.daterangepickerLocale.customRangeLabel,
                "weekLabel": babe_lst.daterangepickerLocale.weekLabel,
                "applyLabel": babe_lst.daterangepickerLocale.applyLabel,
                "cancelLabel": babe_lst.daterangepickerLocale.cancelLabel,
                "fromLabel": babe_lst.daterangepickerLocale.fromLabel,
                "toLabel": babe_lst.daterangepickerLocale.toLabel,
                "daysOfWeek": Object.keys(babe_lst.daterangepickerLocale.daysOfWeek).map(function (key) { return babe_lst.daterangepickerLocale.daysOfWeek[key]; }),
                "monthNames": Object.keys(babe_lst.daterangepickerLocale.monthNames).map(function (key) { return babe_lst.daterangepickerLocale.monthNames[key]; }),
                "firstDay": babe_lst.daterangepickerLocale.firstDay
            }
        });

        if ( babe_lst.date_from != null){
            $('#date_from.search_date').data('daterangepicker').setStartDate(babe_lst.date_from);
        }
        if ( babe_lst.date_to != null){
            $('#date_from.search_date').data('daterangepicker').setEndDate(babe_lst.date_to);
        }

        $('#date_from.search_date').on('apply.daterangepicker', function(ev, picker) {
            // var time_from = $('.babe-search-form').find("input[name='time_from']").val();
            // var time_to = $('.babe-search-form').find("input[name='time_to']").val();
            $(this).val(picker.startDate.format(babe_lst.drp_date_format));
            $('#date_to.search_date').val(picker.endDate.format(babe_lst.drp_date_format));
            babe_search_form_submit();
        });
    }

    function activate_search_form_daterangepicker( tab_slug ){
        var date_to_active = $("#search_form .search_date_wrapper_date_to[data-active-"+tab_slug+"]").data("active-"+tab_slug) != undefined ? true : false;
        var is_single = !date_to_active;
        init_search_form_daterangepicker( is_single );
    }

    function get_search_form_active_tab_slug(){
        var tab_slug = $('#search_form_tabs .search_form_tab.is-active').data('tab-slug');
        if (tab_slug == undefined){
            tab_slug = '0';
        }
        return tab_slug;
    }
    
    $("#search_form .search_guests_title").unbind("click");
    $('#search_form .search_guests_title,#search_form .search_guests_field').on('click', function(){        
        
        var window_width = $(window).width();
        var dropdown = $('#search_form .search_guests_select_wrapper');
        var block_left = $(this).offset().left;
        var dropdown_width = dropdown.outerWidth();
        var css_left = dropdown_width+'px';
        
        if (block_left + dropdown_width + 20 > window_width){
            //css_left = '-'+css_left;
            dropdown.css('right', '0');
        } else {
            dropdown.css('right', 'auto');
        }

        $('#search_form .search_guests_select_wrapper').show();
        $('#search_form .search_apply_btn').on('click', function(ev){
            $('#search_form .search_guests_select_wrapper').unbind('click');
            ev.preventDefault();
            $('.close_by_apply_btn.is-active').hide();
        });
        
        // $('#search_form .search_guests_select_wrapper').toggleClass('is-active');
    });

    
    $(document).on('click', '.filter-button', function(e) {
        e.preventDefault();
        tf_ToggleFilter('show');
    });

    $(document).on('click', '.filter-close,.popup-filter .overlay', function(e) {
        tf_ToggleFilter('hide');
    });

    function tf_ToggleFilter(toggle_type){
        var toggle_element = $('.popup-filter'),
            toggle_class   = 'active';

        if(toggle_type == 'show'){
            toggle_element.addClass(toggle_class);
        }
        else if(toggle_type == 'hide'){
            toggle_element.removeClass(toggle_class);
        }
        else{
            toggle_element.toggleClass('active');
        }
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
          } 
    }
    
    
    $(document).ready(function(){
        filter();  
        ajaxPagination();
    });

    
}(jQuery));