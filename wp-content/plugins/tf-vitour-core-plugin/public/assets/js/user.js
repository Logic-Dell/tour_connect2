(function ($) {
    'use strict';
    var handleLogin = function () {
        $('#tfvt_custom_login_form').on('submit', function (e) {
            e.preventDefault();
            $('.tfvt-login-form').validate({
                errorElement: 'span',
                rules: {
                    username: {
                        required: true,
                        minlength: 3
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    username: "",
                    password: ""
                }
            });
            var form = $(this);
            var formData = form.serialize();
            var message = form.parents('.tfvt-login-form').find('.tfvt-message');

            if (form.valid()) {
                $.ajax({
                    type: 'POST',
                    url: user_script_variables.ajaxUrl,
                    data: formData + '&action=custom_login&security=' + user_script_variables.nonce,
                    beforeSend: function () {
                        message.empty().append('<span class="success text-success"> Loading </span>');
                    },
                    success: function (response) {
                        // Handle the registration success response
                        if (response.status) {
                            window.location.href = response.redirect_url;
                        } else {
                            message.empty().append('<span class="error text-danger"><i class="fa fa-close"></i> ' + response.message + '</span>');
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the registration error response
                        console.log(error);
                    }
                });
            }
        });
    }
    var handleRegister = function () {
        $('#tfvt_custom_register_form').on('submit', function (e) {
            e.preventDefault();
            $('.tfvt-registration-wrapper').validate({
                errorElement: "span",
                rules: {
                    username: {
                        required: true,
                        minlength: 3
                    },
                    email: {
                        required: true,
                        pattern: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,10}$/
                    },
                    phone: {
                        required: true,
                        pattern: /^[0-9]{11}$/
                    },
                    password: {
                        required: true
                    },
                    confirm_password: {
                        required: true
                    }
                },
                messages: {
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirm_password: ""
                }
            });
            var form = $(this);
            var formData = form.serialize();
            var message = $(this).parent('.tfvt-registration-wrapper').find('.tfvt-message');
            if (form.valid()) {
                $.ajax({
                    type: 'POST',
                    url: user_script_variables.ajaxUrl,
                    data: formData + '&action=custom_register&security=' + user_script_variables.nonce,
                    beforeSend: function () {
                        message.empty().append('<span class="success text-success"> Loading </span>');
                    },
                    success: function (response) {
                        // Handle the registration success response
                        if (response.status) {
                            message.empty().append('<span class="success text-success"><i class="fa fa-check"></i> ' + response.message + '</span>');

                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);

                        } else {
                            message.empty().append('<span class="error text-danger"><i class="fa fa-close"></i> ' + response.message + '</span>');
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the registration error response
                        console.log(error);
                    }
                });
            }
        })
    }
    var showLoginRegisterModal = function(){
        $('.display-popup-login').on('click', function () {
            if (user_script_variables.enable_login_popup == 'y') {
                $("#tfvt_login_register_modal").modal('show');
                resetLoginRegisterModal();
            } else if (user_script_variables.login_page) {
                window.location.href = user_script_variables.login_page;
            } else {
                window.location.href = window.location.href;
            }

        });
    }
    var resetLoginRegisterModal = function () {
        var registerForm = $('#tfvt_register_wrapper'),
            loginForm = $('#tfvt_login_wrapper');
        loginForm.show();
        registerForm.hide();
    }
    var switchLoginAndRegister = function () {
        var registerForm = $('#tfvt_register_wrapper'),
            loginForm = $('#tfvt_login_wrapper');
        $('#tfvt_register_redirect, .display-popup-login.register').on('click', function () {
            registerForm.show();
            loginForm.hide();
        });

        $('#tfvt_login_redirect, .display-popup-login.login').on('click', function () {
            registerForm.hide();
            loginForm.show();
        })
    }
    var togglePassword = function () {
        $('#toggle_password.login, #toggle_password.register').click(function (e) {
            e.preventDefault();
            if ($(this).closest('#show_hide_password').find('#password').attr("type") == "text") {
                $(this).closest('#show_hide_password').find('#password').attr('type', 'password');
                $(this).addClass("fa-eye-slash");
                $(this).removeClass("fa-eye");
            } else if ($(this).closest('#show_hide_password').find('#password').attr("type") == "password") {
                $(this).closest('#show_hide_password').find('#password').attr('type', 'text');
                $(this).removeClass("fa-eye-slash");
                $(this).addClass("fa-eye");
            }
        })
    }
    var toggleConfirmPassword = function () {
        $('#toggle_confirm_password').click(function (e) {
            e.preventDefault();
            if ($(this).closest('#show_hide_confirm_password').find('#confirm_password, #confirm_pass').attr("type") == "text") {
                $(this).closest('#show_hide_confirm_password').find('#confirm_password, #confirm_pass').attr('type', 'password');
                $(this).addClass("fa-eye-slash");
                $(this).removeClass("fa-eye");
            } else if ($(this).closest('#show_hide_confirm_password').find('#confirm_password, #confirm_pass').attr("type") == "password") {
                $(this).closest('#show_hide_confirm_password').find('#confirm_password, #confirm_pass').attr('type', 'text');
                $(this).removeClass("fa-eye-slash");
                $(this).addClass("fa-eye");
            }
        })
    }

    jQuery(document).ready(function () {
        togglePassword();
        toggleConfirmPassword();
        handleLogin();
        handleRegister();
        showLoginRegisterModal();
        switchLoginAndRegister();
    })
})(jQuery);