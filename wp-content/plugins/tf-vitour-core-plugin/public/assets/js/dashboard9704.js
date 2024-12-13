(function ($) {
    'use strict';

    var delete_post = function () {
        $('.delete-post').on('click', function (event) {
            event.preventDefault();
            var post_id = $(this).attr('data-postid');
            $.ajax({
                type: 'post',
                url: dashboard_vars.ajax_url,
                dataType: 'json',
                data: {
                    'action': 'action_dashboard',
                    'property_id': post_id,
                    'security': dashboard_vars.nonce
                },
                success: function (response) {
                    if (response.status) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                },
                error: function (xhr, status, error) {
                    // Handle the registration error response
                    console.log(error);
                }
            });
        });
    }

    var updateUserInfo = function(){
        $('.edit_user_profile_submit').on('click', function(event){
            event.preventDefault();
            var firstName = $(this).parents('.submit_group').siblings('.user_profile_fields_group').find('#first_name').val();
            var lastName = $(this).parents('.submit_group').siblings('.user_profile_fields_group').find('#last_name').val();
            $.ajax({
                type: 'post',
                url: dashboard_vars.ajax_url,
                dataType: 'json',
                data: {
                    'action': 'handle_update_user',
                    'first_name': firstName,
                    'last_name': lastName,
                    'security': dashboard_vars.nonce
                },
                success: function (response) {
                    if (response.status) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                },
                error: function (xhr, status, error) {
                    // Handle the registration error response
                    console.log(error);
                }
            });
        })
    }

    $(document).ready(function () {
        delete_post();
        updateUserInfo();
    })
}(jQuery));