(function ($) {
  "use strict";

  // Mobile Navigation
  if ($('.main-nav').length) {
    // Clone the main nav for mobile (without d-lg-none to avoid display:none conflicts)
    var $mobile_nav = $('.main-nav').clone().prop({
      class: 'mobile-nav'
    });
    $('body').append($mobile_nav);
    // Don't create a new toggle button - use the one already in HTML
    $('body').append('<div class="mobile-nav-overly"></div>');

    // Toggle mobile navigation
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('.mobile-nav-overly').fadeToggle(300);
    });

    // Handle dropdown menus in mobile nav
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    // Close mobile nav when clicking outside
    $(document).on('click', function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });

    // Close mobile nav when clicking overlay
    $(document).on('click', '.mobile-nav-overly', function() {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
      $(this).fadeOut();
    });
  }

})(jQuery);
