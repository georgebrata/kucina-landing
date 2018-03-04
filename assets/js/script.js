/*
Template Name: MaxRank
Author: TrendyTheme
Version: 1.0
*/

; (function () {

    "use strict"; // use strict to start

    jQuery(document).ready(function () {
        $("#main-slider").owlCarousel({
            slideSpeed: 400,
            paginationSpeed: 400,
            singleItem: true,
            pagination: false,
            rewindSpeed: 500,
            mouseDrag: true,
            loop: true,
            autoPlay: true,
            autoPlayInterval: 4000,
            navigation: true,
            navigationText: ['&lsaquo;', '&rsaquo;'],
            responsive: {
                1: {
                    navigation: false
                },
                600: {
                    navigation: false
                },
                991: {
                    navigation: true
                }
            }
        });

        /* === back To Top === */
        $('.backToTop').click(function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });


        /* ======= Contact Form ======= */
        $('#contactForm').on('submit', function (e) {

            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post($action, $data, function (data) {

                if (data.response == 'error') {

                    $this.before('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <i class="fa fa-times-circle"></i> ' + data.message + '</div>');
                }

                if (data.response == 'success') {

                    $this.before('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><i class="fa fa-thumbs-o-up"></i> ' + data.message + '</div>');
                    $this.find('input, textarea').val('');
                }

            }, "json");

        });
        
        //set your google maps parameters
        var $latitude = 47.060711, //Visit http://www.latlong.net/convert-address-to-lat-long.html for generate your Lat. Long.
            $longitude = 21.933099,
            $map_zoom = 17 /* ZOOM SETTING */

        //google map custom marker icon
        var $marker_url = '../assets/img/icons/map-pin-small.png';

        if (window.location.href == "https://kucina.ro") {
            $marker_url = 'assets/img/icons/map-pin-small.png';
        }

        //we define here the style of the map
        var style = [{
            "stylers": [{
                "hue": "#A1CAFE"
            }, {
                "saturation": 10
            }, {
                "gamma": 0
            }, {
                "lightness": -5
            }]
        }];

        //set google map options
        var map_options = {
            center: new google.maps.LatLng($latitude, $longitude),
            zoom: $map_zoom,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style
        }
        //inizialize the map
        var map = new google.maps.Map(document.getElementById('myMap'), map_options);
        //add a custom marker to the map                
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng($latitude, $longitude),
            map: map,
            visible: true,
            icon: $marker_url
        });

        var contentString = '<div id="mapcontent">' + '<p>Buglabs, 1355 Market Street, San Francisco.</p></div>';
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 320,
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });


    });
})(jQuery);
