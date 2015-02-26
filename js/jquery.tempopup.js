/* ===========================================================
 * jquery-tempopup.js v1
 * ===========================================================
 *
 * https://github.com/danielhq/tempoup
 *
 * ========================================================== */
 ;(function ( $, window, document, undefined ) {

 	var pluginName = "tempopup",
 	defaults = {
 			activation: 'scroll', // 'fade'
 			scrollPosition: 100, //  60 || false
 			animation: 'fade',
 			cookieName: 'tempopupShown',
 			cookieDuration: 1, // value in days
 			closeClassCss: '.popup-close'
 		};


 	function Plugin ( element, options ) {
 			this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

 	function getDocHeight() {
 		var D = document;
 		return Math.max(
 			D.body.scrollHeight, D.documentElement.scrollHeight,
 			D.body.offsetHeight, D.documentElement.offsetHeight,
 			D.body.clientHeight, D.documentElement.clientHeight
 			);
 	}

 	function scrollPercentage(scroll) {
 		var d = getDocHeight(),
        c = $(window).height();
        scrollPercent = (scroll / (d-c)) * 100;
		return scrollPercent;
 	}

 	$.extend(Plugin.prototype, {
 		init: function () {
 			var that = this;
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).

			if ( this.readCookie(this.settings.cookieName) == null ) {
				//console.log("Start");
				this.checkAnimation(this.settings.activation);
			} else {
				//console.log("cookie value: "  + this.readCookie(this.settings.cookieName));
			}

			$(this.element).on('click', this.settings.closeClassCss, function(e) {
				that.hideDiv();
			});
			
		},
		checkAnimation: function(animationType) {
			if (  animationType === 'scroll' ) {
				if ( this.settings.scrollPosition === 'top' || this.settings.scrollPosition === '0' || this.settings.scrollPosition === '0%' || this.settings.scrollPosition === 0 )  {
					// if the scrollposition is set to 0
					//show the div immediately
					that.showDiv();
				} else {
					this.scrollActivation(this.settings.scrollPosition);
				}
			}
		},

		createCookie: function (name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		eraseCookie: function(name) {
			this.createCookie(name, "", -1);
		},
		scrollActivation: function(position) {
			var that = this;

			window.animFrame = (function(){
				return window.requestAnimationFrame||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function( callback ){
					window.setTimeout(callback, 15);
				};
			})();
			var scrollTimeout;
			$(window).scroll(function () {
				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
					scrollTimeout = null;
				}
				scrollTimeout = animFrame(scrollHandler, 150);
			});

			function scrollHandler() {
				switch (position) {
					case 100:
					if( $(window).scrollTop() + $(window).height() == getDocHeight() ) {
						that.showDiv();
					}
					break;
					default:
					if ( scrollPercentage( $(window).scrollTop() ) === position ) {
						that.showDiv();
					}
					break;

				}
			}

		},
		showDiv: function() {
			$(this.element).fadeIn('slow');
			$(window).off('scroll');
			if ( this.readCookie(this.settings.cookieName) == null ) {
				this.createCookie(this.settings.cookieName, true, this.settings.cookieDuration);
			}
			
		},
		hideDiv: function() {
			$(this.element).fadeOut('slow');
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};
}(jQuery, window, document));