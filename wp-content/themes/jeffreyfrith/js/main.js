
var $ = jQuery;
function ismi(options) {
    var con = options.con;
    var width = options.width;
    var selector = options.selector;
    var navigation = options.navigation;
    var next = options.next;
    var item = options.item;
    //console.log(width, selector, navigation, next, item);
    // Main content container
    var $container = $(con);
    // Masonry + ImagesLoaded
    $container.imagesLoaded(function() {
        $container.masonry({
            // selector for entry content
            columnWidth: width,
            itemSelector: selector,
            percentPosition: true
        });
    });
    // Infinite Scroll
    $container.infinitescroll({
            // selector for the paged navigation (it will be hidden)
            navSelector: navigation,
            // selector for the NEXT link (to page 2)
            nextSelector: next,
            // selector for all items you'll retrieve
            itemSelector: item,
            // finished message
            loading: {
                finishedMsg: 'No more pages to load.'
            }
        },
        // Trigger Masonry as a callback
        function(newElements) {
            // hide new items while they are loading
            var $newElems = $(newElements).css({
                opacity: 0
            });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function() {
                // show elems now they're ready
                $newElems.animate({
                    opacity: 1
                });
                $container.masonry('appended', $newElems, true);
            });
        });
    // OPTIONAL! Load new pages by clicking a link
    // Pause Infinite Scroll
	$(window).unbind('.infscr');
	// Resume Infinite Scroll
	$(next).click(function(){
		$container.infinitescroll('retrieve');
		return false;
	});
}

(function(document, window, $){
	'use strict'
	;

    // mobile nav
    $(".icon").click(function() {
        $(".top-menu").toggleClass("top-animate");
        $(".mid-menu").toggleClass("mid-animate");
        $(".bottom-menu").toggleClass("bottom-animate");
        $("body").toggleClass("open-nav");
        $(".mobile-menu").slideToggle();
        $(this).toggleClass('open');
        $('.mobile-logo').slideToggle('slow');
    });
    /*var window_size = $(document).height();
    $('.mobile-menu').css({'height': window_size + 'px'});*/
    $('.mobile-menu .menu-item-has-children > a').append('&nbsp;&nbsp; <i class="fa fa-plus"></i>');
    $(".mobile-menu .sub-menu").hide();

// Click the + icon to expand the subnav
    $('.mobile-menu .menu-item-has-children .fa').click(function(event) {
        event.preventDefault();
        $(this).closest('li').find(".sub-menu").slideToggle();
        $(this).toggleClass("fa-minus");
    });


    if($(window).width() >= 1010) {

        var $ContentHeight = $('.left-half').height()
        $('.right-half, #images').height($ContentHeight)


    	function endlessscroller() {
            $('#images').endlessScroll({
              bottomPixels: 500,
              fireDelay: 100,
              callback: function(i) {
                console.log(i)
                var last_img = $("ul#images li:last")
                last_img.after(last_img.prevAll().clone())
              }
            })
    	}
    	endlessscroller();

        function scrolleverywhere() {
            var $end = $('.end')
            var $images = $('#images')
            $('body').bind('mousewheel', function(e) {
                $images.scrollTop($images.scrollTop()
                - e.originalEvent.wheelDelta)
            });
        }
        scrolleverywhere();
    }

	// blog
	(function blog() {
		ismi({
			con: '#content',
			width:'.grid-sizer',
			selector:'.blog-post' ,
			navigation:'.wp-pagenavi',
			next:'.nextpostslink',
			item:'.blog-post'
		})
	}());

    (function removeEmpty() {
        $('p').each(function() {
            var $this = $(this);
            if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.remove();
        });
    }());


    // function setheight() {
    //     var viewport = $(window).height() + 510
    //     $('.split').css('max-height', viewport + "px")
    // }
    // setheight();

	//Fast CLick
	FastClick.attach(document.body)

})(document, window, jQuery)
