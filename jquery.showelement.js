//! jQuery showElement v1.0.0

 ;(function ( $, window, document, undefined ) {

    $.fn.showElement = function( settings ) {

     	var defaults = {
            activation: 'time', // This can be either 'scroll' or 'time', sets how the element should be activated
            scrollPosition: 100, // If activation is 'scroll' set the percentage to show the element
            timeActivation: 0, //  If activation is 'time' set the milliseconds after should be shown
            cookieName: 'showElement', // Name of the cookie set after the element is hide for not seeing it again
            cookieDuration: 365, // Duration in days of the cookie
            closeClass: 'js-close', // Class that triggers the close
     		hideClass: 'is-hidden', // Class that is applied on the element to hide it
     		showClass: 'is-visible' // Class that is applied on the element to show it
     	};

        var selector = this.selector;
        var scrollTimeout;
        var viewportObject = $( window );
        var checkScroll = true;

        $.extend( defaults, settings );

        function createCookie( name, value, days ) {

			var expire;

			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			} else {
				expires = "";
			}

			document.cookie = name+"="+value+expires+"; path=/";

		}

        function readCookie(name) {

			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;

		}

        function eraseCookie(name) {

			createCookie(name,"",-1);

		}

        function getScrollPercent() {
            return Math.round(100 * $(window).scrollTop() / ($(document).height() - $(window).height()) );
        }

        function hideElement(selector) {
            $(selector).addClass(defaults.hideClass).removeClass(defaults.showClass);
            $(document).trigger("hideElement");
		}

        function showElement(selector) {
			$(selector).removeClass(defaults.hideClass).addClass(defaults.showClass);
            $(document).trigger("showElement");
		}

        function scrollActivation(position) {

            window.animationFrame = ( function ( callback ) {

                return window.requestAnimationFrame || function ( callback ) {
                    window.setTimeout( callback, 1000/60 );
                };

            })();

            viewportObject.scroll( function () {

                if ( scrollTimeout ) {
                    // clear the timeout, if one is pending
                    clearTimeout( scrollTimeout );
                    scrollTimeout = false;
                } else {
                    scrollTimeout = true;
                    animationFrame( scrollHandler );
                }

            });

            function scrollHandler() {

                if (checkScroll) {
                    if (defaults.scrollPosition == getScrollPercent() ) {
                        showElement(selector);
                    }
                }

            }

        }

        function checkAnimation(animationType) {

            if ( animationType === 'scroll' ) {

                if ( defaults.scrollPosition === 0 )  {
					//show the element immediately
					showElement();
				} else {
					scrollActivation(defaults.scrollPosition);
				}

            } else if ( animationType === 'time' ) {

                setTimeout( function() {
                    showElement(selector);
                }, defaults.timeActivation );

			}

		}

        function init() {

            if ( readCookie(defaults.cookieName) === null ) {
                checkAnimation(defaults.activation);
            }

            $(document).on('click', '.' + defaults.closeClass, function() {
                createCookie(defaults.cookieName, true, defaults.cookieDuration);
                hideElement(selector);
                checkScroll = false;
            });

        }

        init();

    };

})( jQuery, window, document );
