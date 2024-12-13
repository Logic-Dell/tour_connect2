(function ($) {
    var customSearchForm = function () {
        $('.tf-search-form-inner .title-field').remove();
        $('.tf-search-form-inner #search_form .input-group > .search-field-inner').contents().unwrap();
        if ($('#search_form .input-group>div').length) {
            $('.tf-search-form-inner #search_form .input-group>div.is-active:not(.input_select_field_time_from,.input_select_field_time_to)').wrap('<div class="search-field-inner"></div>');
        }

        //Keyword Title
        if ($('.default-title-search-field .keyword-title-field').length) {
            var keyword_title = $('.default-title-search-field .keyword-title-field').text();
            $('.tf-search-form-inner .is-active[data-tax="keyword"]').find('.fa-search').hide();
            $('.tf-search-form-inner .is-active[data-tax="keyword"]').before('<span class="title-field"> <i class="fas fa-search search-icon"></i> ' + keyword_title + ' </span>');
        }

        // Destination Title
        if ($('.default-title-search-field .destination-title-field').length) {
            var location_title = $('.default-title-search-field .destination-title-field').text();
            // $('#search_form .search-field-inner:nth-child(1)').prepend('<span class="title-field"> <img alt="" src='+tf_search_form_vars.destination_icon+' class="search-icon" /> ' + location_title + ' </span>');
            $('.tf-search-form-inner .is-active[data-tax="ba_booking-locations"]').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.destination_icon+' class="search-icon" /> ' + location_title + ' </span>');
        }

        //Amenities Title
        if ($('.default-title-search-field .amenities-title-field').length) {
            var amenities_title = $('.default-title-search-field .amenities-title-field').text();
            $('.tf-search-form-inner .is-active[data-tax="ba_amenities"]').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.amenities_icon+' class="search-icon" /> ' + amenities_title + ' </span>');
        }

        // Type Title
        if ($('.default-title-search-field .type-title-field').length) {
            var type_title = $('.default-title-search-field .type-title-field').text();
            // $('#search_form .search-field-inner:nth-child(2)').prepend('<span class="title-field"> <img alt="" src='+tf_search_form_vars.type_icon+' class="search-icon type-icon" /> ' + location_title + ' </span>');
            $('.tf-search-form-inner .is-active[data-tax="ba_booking-type"]').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.type_icon+' class="search-icon type-icon" /> ' + type_title + ' </span>');
        }

        // Start Date Title
        if ($('.default-title-search-field .start-date-title-field').length) {
            var sd_title = $('.default-title-search-field .start-date-title-field').text();
            // $('#search_form .search-field-inner:nth-child(3)').prepend('<span class="title-field"> <img alt="" src='+tf_search_form_vars.duration_icon+' class="search-icon" /> ' + sd_title + ' </span>');
            $('.tf-search-form-inner #search_form .search_date_wrapper_date_from').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.duration_icon+' class="search-icon" /> ' + sd_title + ' </span>');
        }

        // End Date Title
        if ($('.default-title-search-field .end-date-title-field').length) {
            var ed_title = $('.default-title-search-field .end-date-title-field').text();
            // $('#search_form .search-field-inner:nth-child(4)').prepend('<span class="title-field"> <img alt="" src='+tf_search_form_vars.duration_icon+' class="search-icon" /> ' + ed_title + ' </span>');
            $('.tf-search-form-inner #search_form .search_date_wrapper_date_to').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.duration_icon+' class="search-icon" /> ' + ed_title + ' </span>');
            
        }

        // Guests Title
        if ($('.default-title-search-field .guests-title-field').length) {
            var guests_title = $('.default-title-search-field .guests-title-field').text();
            // $('#search_form .search-field-inner:nth-child(5)').prepend('<span class="title-field"> <img alt="" src='+tf_search_form_vars.guests_icon+' class="search-icon" /> ' + guests_title + ' </span>');
            $('.tf-search-form-inner #search_form .search_guests_field.is-active').before('<span class="title-field"> <img alt="" src='+tf_search_form_vars.guests_icon+' class="search-icon" /> ' + guests_title + ' </span>');
            
        }

    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_booking_search_form.default', customSearchForm);
        elementorFrontend.hooks.addAction('frontend/element_ready/tf_booking_search_result.default', customSearchForm);
    });
})(jQuery);