(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// import $ from 'jquery';
// console.log($);
// import Popper from 'popper.js';
// console.log(Popper);
// import 'bootstrap';
// import Link from '../_modules/link/link';

$(function () {
  // new Link(); // Activate Link modules logic
  // console.log('Welcome to Yeogurt!', $);

  // ---------------------------------------------------------------------------
  // Header fixed and Back to top button
  // ---------------------------------------------------------------------------
  $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
  // force scroll on page init
  $(window).scroll();

  // Initiate the wowjs
  // new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // ---------------------------------------------------------------------------
  // Mobile Navigation
  // ---------------------------------------------------------------------------
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('header .container').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // ---------------------------------------------------------------------------
  // Smoth scroll on page hash links
  // ---------------------------------------------------------------------------
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // ---------------------------------------------------------------------------
  // Porfolio filter
  // ---------------------------------------------------------------------------
  // $("#portfolio-flters li").click(function() {
  //   $("#portfolio-flters li").removeClass('filter-active');
  //   $(this).addClass('filter-active');
  //
  //   var selectedFilter = $(this).data("filter");
  //   $("#portfolio-wrapper").fadeTo(100, 0);
  //
  //   $(".portfolio-item").fadeOut().css('transform', 'scale(0)');
  //
  //   setTimeout(function() {
  //     $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
  //     $("#portfolio-wrapper").fadeTo(300, 1);
  //   }, 300);
  // });

  // ---------------------------------------------------------------------------
  // jQuery counterUp
  // ---------------------------------------------------------------------------
  // $('[data-toggle="counter-up"]').counterUp({
  //   delay: 10,
  //   time: 1000
  // });

  // ---------------------------------------------------------------------------
  //Google Map
  // ---------------------------------------------------------------------------

  var get_latitude = $('#google-map').data('latitude');
  var get_longitude = $('#google-map').data('longitude');

  var zurich = "47.376887, 47.376887";

  function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var zurichLatlng = new google.maps.LatLng(47.376887, 8.541694);
    var mapOptions = {
      zoom: 12,
      scrollwheel: false,
      // center: zurichLatlng,
      center: myLatlng,
      disableDefaultUI: true,
      styles: [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 13
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#144b53"
        }, {
          "lightness": 14
        }, {
          "weight": 1.4
        }]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "color": "#08304b"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#0c4152"
        }, {
          "lightness": 5
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#0b434f"
        }, {
          "lightness": 25
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#0b3d51"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }]
      }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "color": "#146474"
        }]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "color": "#021019"
        }]
      }]
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var icon = {
      url: 'images/marker_white.png',
      size: new google.maps.Size(28, 32),
      scaledSize: new google.maps.Size(28, 32)
    };

    var marker = new google.maps.Marker({
      position: myLatlng,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icon
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize_google_map);
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
