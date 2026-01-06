/**
 * ISBDAI 2026 - Premium Conference Website
 * Main JavaScript with High-Fidelity Animations
 */

(function($) {
  "use strict";

  // ==========================================
  // Preloader
  // ==========================================
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // ==========================================
  // Header Scroll Effect with Smooth Transition
  // ==========================================
  var header = $('#header');
  var headerScrollThreshold = 100;

  function updateHeader() {
    if ($(window).scrollTop() > headerScrollThreshold) {
      header.addClass('header-scrolled');
    } else {
      header.removeClass('header-scrolled');
    }
  }

  $(window).on('scroll', updateHeader);
  updateHeader(); // Check on load

  // ==========================================
  // Back to Top Button
  // ==========================================
  var backToTop = $('.back-to-top');

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 400) {
      backToTop.css('display', 'flex');
    } else {
      backToTop.css('display', 'none');
    }
  });

  backToTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'easeInOutExpo');
    return false;
  });

  // ==========================================
  // Smooth Scroll for Navigation
  // ==========================================
  $('.main-nav a, .mobile-nav a, .scrollto, a[href^="#"]:not([href="#"])').on('click', function(e) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var headerHeight = $('#header').outerHeight();
        var offsetTop = target.offset().top - headerHeight;

        $('html, body').animate({
          scrollTop: offsetTop
        }, 800, 'easeInOutExpo');

        // Close mobile nav if open
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // ==========================================
  // Navigation Active State on Scroll
  // ==========================================
  var sections = $('section[id]');
  var navLinks = $('.main-nav a, .mobile-nav a');

  $(window).on('scroll', function() {
    var currentPos = $(this).scrollTop();
    var headerHeight = $('#header').outerHeight();

    sections.each(function() {
      var top = $(this).offset().top - headerHeight - 50;
      var bottom = top + $(this).outerHeight();
      var id = $(this).attr('id');

      if (currentPos >= top && currentPos <= bottom) {
        navLinks.parent('li').removeClass('active');
        $("a[href='#" + id + "']").parent('li').addClass('active');
      }
    });
  });

  // ==========================================
  // Mobile Navigation
  // ==========================================
  var body = $('body');
  var mobileNavToggle = $('.mobile-nav-toggle');

  // Create mobile navigation clone
  if ($('.mobile-nav').length === 0 && $('.main-nav').length) {
    var mobileNav = $('<nav class="mobile-nav"></nav>');
    mobileNav.append($('.main-nav ul').clone());
    body.append(mobileNav);
    body.append('<div class="mobile-nav-overly"></div>');
  }

  // Toggle mobile navigation
  mobileNavToggle.on('click', function(e) {
    e.preventDefault();
    body.toggleClass('mobile-nav-active');
    $(this).find('i').toggleClass('fa-bars fa-times');
    $('.mobile-nav-overly').fadeToggle(300);
  });

  // Close on overlay click
  $(document).on('click', '.mobile-nav-overly', function() {
    body.removeClass('mobile-nav-active');
    mobileNavToggle.find('i').removeClass('fa-times').addClass('fa-bars');
    $(this).fadeOut(300);
  });

  // Handle dropdowns in mobile nav
  $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $(this).siblings('ul').slideToggle(300);
  });

  // ==========================================
  // WOW.js Initialization
  // ==========================================
  if (typeof WOW !== 'undefined') {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 80,
      mobile: true,
      live: true
    }).init();
  }

  // ==========================================
  // Counter Up Animation
  // ==========================================
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1500
    });
  }

  // ==========================================
  // Owl Carousel - Testimonials
  // ==========================================
  if ($.fn.owlCarousel) {
    $('.testimonials-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      dots: true,
      nav: false,
      margin: 30,
      smartSpeed: 600,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });
  }

  // ==========================================
  // Portfolio Isotope Filter
  // ==========================================
  $(window).on('load', function() {
    if ($.fn.isotope && $('.portfolio-container').length) {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $('#portfolio-flters li').removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    }
  });

  // ==========================================
  // Dropdown Menu Enhancement
  // ==========================================
  var dropdowns = $('.main-nav .drop-down');

  dropdowns.each(function() {
    var dropdown = $(this);
    var submenu = dropdown.find('> ul');
    var timer;

    dropdown.on('mouseenter', function() {
      clearTimeout(timer);
      submenu.stop(true, true).css({
        'opacity': '1',
        'visibility': 'visible',
        'transform': 'translateX(-50%) translateY(0)'
      });
    });

    dropdown.on('mouseleave', function() {
      timer = setTimeout(function() {
        submenu.stop(true, true).css({
          'opacity': '0',
          'visibility': 'hidden',
          'transform': 'translateX(-50%) translateY(10px)'
        });
      }, 150);
    });
  });

  // ==========================================
  // Staggered Animation for Grid Items
  // ==========================================
  function addStaggeredAnimation(selector) {
    $(selector).each(function(index) {
      $(this).css({
        'animation-delay': (index * 0.1) + 's'
      });
    });
  }

  $(document).ready(function() {
    addStaggeredAnimation('.dates-grid .date-card');
    addStaggeredAnimation('.info-grid .info-card');
    addStaggeredAnimation('.pub-grid .pub-card');
    addStaggeredAnimation('.people-grid .person-card');
    addStaggeredAnimation('.contact-grid .contact-item');
    addStaggeredAnimation('.sponsors-grid .sponsor-item');
  });

  // ==========================================
  // Scroll-triggered Fade In Animation
  // ==========================================
  var fadeElements = $('.fade-in');

  function checkFadeElements() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    fadeElements.each(function() {
      var elementTop = $(this).offset().top;
      if (scrollTop + windowHeight > elementTop + 80) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', checkFadeElements);
  checkFadeElements();

  // ==========================================
  // Lightbox for Images (if present)
  // ==========================================
  if ($.fn.lightbox) {
    $('[data-lightbox]').lightbox({
      fadeDuration: 300,
      resizeDuration: 300,
      imageFadeDuration: 300
    });
  }

  // ==========================================
  // Accessibility Enhancements
  // ==========================================
  // Detect keyboard vs mouse navigation
  body.on('mousedown', function() {
    body.addClass('using-mouse');
  }).on('keydown', function(e) {
    if (e.key === 'Tab') {
      body.removeClass('using-mouse');
    }
  });

  // Escape key closes mobile nav
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && body.hasClass('mobile-nav-active')) {
      body.removeClass('mobile-nav-active');
      mobileNavToggle.find('i').removeClass('fa-times').addClass('fa-bars');
      $('.mobile-nav-overly').fadeOut(300);
    }
  });

  // ==========================================
  // Hero Carousel / Page Header Carousel
  // ==========================================
  function initImageCarousel(containerSelector, slideSelector) {
    var $container = $(containerSelector);
    if ($container.length === 0) return;

    var $slides = $container.find(slideSelector);
    if ($slides.length <= 1) return;

    var currentIndex = 0;
    var slideCount = $slides.length;

    function showSlide(index) {
      $slides.removeClass('active');
      $slides.eq(index).addClass('active');
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    }

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Initialize hero carousel
  initImageCarousel('.hero-carousel', '.hero-slide');

  // Initialize page header carousel
  initImageCarousel('.page-header-carousel', '.page-header-slide');

})(jQuery);
