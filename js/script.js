(function ($, window, document, undefined) {
    'use strict';
    $(function () {
        $(document).ready(function () {
            var $rtl = false;
            if ($('html').attr('dir') == 'rtl') {
                $rtl = true;
            }

            $( document ).ajaxSuccess(function( event, request, settings ) {

                $(".nb_team_social_color").hover(function()
                {
                    if($(this)[0].hasAttribute('data-color-hover')) {
                        var $icon_hover_color = String($(this).attr('data-color-hover'));
                        $(this).css({"color": $icon_hover_color});
                    }
                },function(){
                    if($(this)[0].hasAttribute('data-color')) {
                        var $icon_color = String($(this).attr('data-color'));
                        $(this).css({"color": $icon_color});
                    }
                    else{
                        $(this).removeAttr("style");
                    }
                });
            });

            $('[data-slide="owl-carousel"]').each(function () {
                var $data_prev='';
                if($(this)[0].hasAttribute('data-prev')){
                    $data_prev=String($(this).attr('data-prev'));
                }
                var $data_next='';
                if($(this)[0].hasAttribute('data-next')){
                    $data_next=String($(this).attr('data-next'));
                }

                $(this).vcOwlCarousel({
                    rtl: $rtl,
                    loop: true,
                    navText: [$data_prev,$data_next],
                    margin: parseInt($(this).attr('data-margin')),
                    stagePadding: 15,
                    dotsEach: true,
                    dots: $.parseJSON($(this).attr('data-dots')),
                    nav: $.parseJSON($(this).attr('data-nav')),
                    //navText: [prev,next],
                    autoplay: $.parseJSON($(this).attr('data-autoplay')),
                    autoplayspeed: parseInt($(this).attr('data-autoplayspeed')),
                    autoplayHoverPause: $.parseJSON($(this).attr('data-autoplayHoverPause')),
                    responsive: {
                        0: {
                            items: 1,
                        },
                        576: {
                            items: $(this).attr('data-cols-sm'),
                        },
                        768: {
                            items: $(this).attr('data-cols-md'),
                        },
                        992: {
                            items: $(this).attr('data-cols-lg'),
                        },
                        1200: {
                            items: $(this).attr('data-cols-xl'),
                        },
                    }
                }).on('resized.owl.vccarousel ', function (event) {
                    $(this).find('.equal_box').matchHeight({
                        byRow: false,
                        property: 'min-height'
                    });
                });
            });
            if ($('[data-layout="isotope"]').length) {
                var $originLeft = true;
                if ($rtl) {
                    $originLeft = false;
                }
                $('[data-layout="isotope"]').each( function() {
                    var $isotope = $(this).imagesLoaded(function () {
                        $isotope.isotope({
                            itemSelector: '.isotope-item',
                            percentPosition: true,
                            layoutMode: 'masonry',
                            originLeft: $originLeft,
                        });
                    });
                    $(this).prev('.filters-button-group').on('click', '.filter-btn', function () {
                        var filterValue = $(this).attr('data-filter');
                        $isotope.isotope({filter: filterValue});
                        if(($(this).not('.is-checked'))){
                            $(this).parents('.filters-button-group').eq(0).find('.is-checked').removeClass('is-checked');
                            $(this).addClass('is-checked');
                        }
                    });
                });
            }
            $('.equal_heights').each(function () {
                var byRow = true;
                if ($(this).find('[data-byRow]').attr('data-byRow') == '0') {
                    byRow = false;
                }
                $(this).find('.equal_box').matchHeight({
                    byRow: byRow,
                    property: 'min-height'
                });
            });
			if (jQuery(".fb-page").length){
				jQuery(window).bind("load resize", function(){
					var container_width = jQuery("#container").width();
					jQuery("#container").html('<div class="fb-like-box" ' + 
					'data-href="https://www.facebook.com/adobegocreate"' +
					' data-width="' + container_width + '" data-height="730" data-show-faces="false" ' +
					' data-stream="true" data-header="true"></div>');
					FB.XFBML.parse( );    
				});
			}
        });
    });

})(jQuery, window, document);
