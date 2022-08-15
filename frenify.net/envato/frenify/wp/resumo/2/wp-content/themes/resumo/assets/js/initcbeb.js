/*
 * Copyright (c) 2022 Frenify
 * Author: Frenify
 * This file is made for CURRENT THEME
*/


/*

	@Author: Frenify
	@URL: https://themeforest.net/user/frenify/portfolio


	This file contains the jquery functions for the actual theme, this
	is the file you need to edit to change the structure of the
	theme.

	This files contents are outlined below.

*/


var ResumoSiteURL 	= RusemoAjaxObject.siteurl;


// All other theme functions
(function ($){

	"use strict";
	
    var ResumoInit 		= {
		
		
		
		pageNumber: 1,
		
        init: function () {
			this.movingPlaceholder();
			this.cursor();
			this.minHeightForPages();
			this.url_fixer();
			this.hamburgerOpener__Mobile();
			this.submenu__Mobile();
			this.imgToSVG();
			this.dataFnBgImg();
			this.estimateWidgetHeight();
			this.categoryHook();
			this.widget__pages();
			this.widget__archives();
			this.inputCheckBoxInComment();
			this.addButtonToMenu();
			this.navigation__resize();
			this.navigation__closer();
			this.navigation__height();
			this.prevnextpost__wp();
			this.anchorScroll();
			this.pageWidthAnimation();
			this.rightNav();
			this.rightPanelScroll();
			this.totop();
			this.typed();
        },
		
		
		typed: function(){
			$('.animated_title').each(function(){
				var span		= $(this);
				var items		= span.find('.title_in');
				if(items !== ''){
					var strings = [];
					items.each(function(){
						strings.push($(this).text());
					});
					span.typed({
						strings: strings,
						loop: true,
						smartBackspace: false,
						typeSpeed: 40,
						startDelay: 700,
						backDelay: 3e3
					});	
				}
			});
		},
		
		totop: function(){
			$('.resumo_fn_totop').on('click',function(){
				$("html, body").animate({ 
					scrollTop: 0
				}, 1000);
				return false;
			});	
		},
		
		rightNav: function(){
			
			// for right navigation
			var rightNav	= $('.resumo_fn_navigation');
			rightNav.find('button, [href], input, select, textarea').attr('tabindex','-1');
			var closer 		= rightNav.find('.closer');
			var opener 		= $('.menu_trigger');
			var body 		= $('body');
			var navFooter	= rightNav.find('.nav_footer');
			var navLi		= $('#nav .resumo_fn_main_nav > li');
			var speed		= 150, transitionTime = 700;
			var summary		= (navLi.length+1)*speed + transitionTime;
			
			// for searchbox
			var inputSpeed	= 20;
			var searchbox 	= $('.resumo_fn_searchpopup');
			var searchinput = searchbox.find('input[type=text]');
			var inputSubmit	= searchbox.find('input[type=submit]');
			var placeholder = searchinput.attr('placeholder');
			searchinput.attr('placeholder','');
			var array 		= placeholder.split('');
			
			
			// trigger
			opener.on('click',function(){
				rightNav.find('button, [href], input, select, textarea').attr('tabindex','0');
				body.addClass('nav-opened');
				body.addClass('open_search_popup');
				navLi.each(function(i,e){
					$(e).css({transitionDelay: i*speed + transitionTime + 'ms'});
				});
				setTimeout(function(){
					navFooter.addClass('ready');
				},summary);
				
				// for searchbox
//				setTimeout(function(){
//					var text = '';
//					for(var i=0;i<array.length;i++){
//						text+= array[i];
//						ResumoInit.search_placeholder(searchinput,text,i,inputSpeed);
//					}
//					setTimeout(function(){
//						searchinput.focus();
//						searchinput.trigger('click');
//					},inputSpeed*array.length);
//				},1000);
				
				
				
				return false;
			});
			closer.on('click',function(){
				rightNav.find('button, [href], input, select, textarea').attr('tabindex','-1');
				navLi.css({transitionDelay: '0ms'});
				body.removeClass('nav-opened nav-hover-close open_search_popup');
				navFooter.removeClass('ready');
				searchbox.removeClass('focused');
				opener.focus();
				return false;
			});
			
			// for searchbox
			if(searchbox.length){
				searchbox.find('.search_inner').on('click',function(){
					searchbox.removeClass('focused');
				});
				searchinput.on('click',function(event){
					searchbox.addClass('focused');
					event.stopPropagation();
				});
				inputSubmit.on('click',function(event){
					event.stopPropagation();
				});
			}
		},
		
		rightPanelScroll: function(){
			var rightPanel 	= $('.resumo_fn_right .right_in');
			var navIn 		= $('.resumo_fn_navigation .nav_in');
			var nav 		= $('#nav');
			var navFooter	= $('.resumo_fn_navigation .nav_footer');
			rightPanel.css({height: $(window).height()});
			nav.css({height: navIn.height() - navFooter.outerHeight()});
			if($().niceScroll){
				rightPanel.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #333"
				});
				nav.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "1px solid #333"
				});
			}
		},
		
		pageWidthAnimation: function(){
			ResumoInit.changeWidth();
			$(window).on('scroll', function() {
				ResumoInit.changeWidth();
			});
		},
		
		changeWidth: function(){
			var scrolltop	= $(window).scrollTop();
			var action		= 0;
			if(scrolltop > 0 && !$('body').hasClass('scrolled')){
				$('body').addClass('scrolled');
				action++;
			}else if(scrolltop === 0 && $('body').hasClass('scrolled')){
				$('body').removeClass('scrolled');
				action++;
			}
			if(action > 0){
				setTimeout(function(){
//					ResumoInit.portfolioCarousel();
//					ResumoInit.testimonialCarousel();
				},500);
			}
		},
		
		
		anchorScroll: function(){
			$('a[href*="#"]')
			  // Remove links that don't actually link to anything
			  .not('[href="#"]')
			  .not('[href="#content"]')
			  .not('[href="#0"]')
			  .click(function(event) {
				// On-page links
				if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				  // Figure out element to scroll to
				  var target = $(this.hash);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				  // Does a scroll target exist?
				  if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
					  scrollTop: target.offset().top
					}, 1000, function() {
					  // Callback after animation
					  // Must change focus!
					  var $target = $(target);
					  $target.focus();
					  if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					  } else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					  }
					});
				  }
				}
			  });
		},
		
		
		movingPlaceholder: function(){
			$('.resumo_fn_contact .input_wrapper').each(function(){
				var e		= $(this);
				var input 	= e.find('input, textarea');
				if(input.val() === ''){e.removeClass('active');}
				input.on('focus', function() {
				  	e.addClass('active');
				}).on('blur',function() {
					if(input.val() === ''){e.removeClass('active');}
				});
			});
		},
		
		prevnextpost__wp: function(){
			
			if($('.resumo_fn_prevnext').length && $('.resumo_fn_prevnext').data('hotkey') === 'enabled'){
				$(document).keyup(function(e) {
					if(e.key.toLowerCase() === 'p') {
						var a = $('.resumo_fn_hotlink__prev_post');
						if(a.length){
							window.location.href = a.attr('href');
							return false;
						}
					}
					if(e.key.toLowerCase() === 'n') {
						var b = $('.resumo_fn_hotlink__next_post');
						if(b.length){
							window.location.href = b.attr('href');
							return false;
						}
					}
				});
			}	
		},
		
		navigation__height: function(){
			$('.resumo_fn_sidebar .navigation').css({maxHeight: ($('.resumo_fn_sidebar').height() - $('.resumo_fn_sidebar .logo').outerHeight(true,true) - $('.resumo_fn_sidebar .copyright').outerHeight(true,true)) + 'px'});
		},
		
		navigation__resize: function(){
			var isResizing 	= false,
				lastDownX 	= 0;

			var sidebar		= $('.resumo_fn_sidebar'),
				content 	= $('.resumo_fn_content'),
				handle 		= sidebar.find('.nav_line'),
				max			= sidebar.data('max'),
				min			= sidebar.data('min'),
				body 		= $('body'),
				indicator	= sidebar.find('.width_indicator');

			handle.on('mousedown', function (e) {
				isResizing 	= true;
				lastDownX 	= e.clientX;
				body.addClass('sidebar-resize');
			});

			$(document).on('mousemove', function (e) {
				// we don't want to do anything if we aren't resizing.
				var lastDownX = e.clientX;
				if (!isResizing || lastDownX > max || lastDownX < min){return;}

				sidebar.css('width', lastDownX);
				content.css('padding-left', lastDownX);
				indicator.html(lastDownX+'px');
			}).on('mouseup', function () {
				// stop resizing
				isResizing = false;
				body.removeClass('sidebar-resize');
			});
		},
		
		navigation__closer: function(){
			var wrapper		= $('.resumo_fn_wrapper_all');
			$('.resumo_fn_sidebar .nav__button').off().on('click',function(){
				if(wrapper.hasClass('sidebar-closed')){
					wrapper.removeClass('sidebar-closed');
				}else{
					wrapper.addClass('sidebar-closed');
				}
				setTimeout(function(){
//					ResumoInit.testimonial();
				},500);
				
				return false;
			});
		},
		
		addButtonToMenu: function(){
			var self		= this;
			var element 	= $('.menu-item-has-children');
			var count 		= element.length;
			var i			= 0;
			element.each(function(){
				$(this).children('a').append('<button></button');
				i++;if(i===count){self.addedButtonAction();}
			});
		},
		
		addedButtonAction: function(){
			var self		= this;
			$('#nav a').off().on('click',function(e){
				e.stopPropagation();
				var element = $(this);
				self.submenu__Mobile__init(element);
				if(element.siblings('.sub-menu').length){return false;}
			});
			$('.menu-item-has-children button').off().on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				var element = $(this);
				self.submenu__Mobile__init(element.closest('li').children('a'));
				return false;
			});
//			$('.resumo_fn_main_nav > li > a').focus(function(e){
//				e.preventDefault();
//				e.stopPropagation();
//				var element = $(this);
//			  	element.closest('li').siblings().removeClass('active').find('li').removeClass('active');
//				element.closest('.resumo_fn_main_nav').find('li').removeClass('active');
//				element.closest('.resumo_fn_main_nav').find('.sub-menu').slideUp();
//		  	});
		},
		
		inputCheckBoxInComment: function(){
			if($('p.comment-form-cookies-consent input[type=checkbox]').length){
				$('p.comment-form-cookies-consent input[type=checkbox]').wrap('<label class="fn_checkbox"></label>').after('<span></span>');
			}
		},
		
		minHeightForPages: function(){
			var H 				= $(window).height(),
				mobileH 		= 0,
				adminBarH 		= 0,
				rightH 			= 0,
				mobile			= $('.resumo_fn_mobilemenu_wrap'),
				footerH			= $('#footer').outerHeight();
			if(mobile.css('display') !== 'none'){
				mobileH			= mobile.height();
			}
			if($('body').hasClass('admin-bar')){
				adminBarH		= $('#wpadminbar').height();
			}
			var minH 			= H;
			if($('.fn__sidebarpage').length){
				rightH = $('.resumo_fn_right .right_in').outerHeight();
				if(minH < rightH){minH = rightH;}
			}
			minH = minH-mobileH-adminBarH-footerH;
//			$('.resumo-fn-content_archive, .resumo_fn_index_wrap, .resumo_fn_single_template, .resumo_fn_full_page_template, .resumo_fn_404, .resumo-fn-protected, .fn_page_blog').css({minHeight: minH + 'px'});
		},
		
		url_fixer: function(){
			$('a[href*="fn_ex_link"]').each(function(){
				var oldUrl 	= $(this).attr('href'),
					array   = oldUrl.split('fn_ex_link/index.html'),
					newUrl  = ResumoSiteURL + "/" + array[1];
				$(this).attr('href', newUrl);
			});
		},
		
		cursor: function () {
			var myCursor = $('.frenify-cursor');
			if (myCursor.length) {
				if ($("body").length) {
					const e 	= document.querySelector(".cursor-inner"),
						t 		= document.querySelector(".cursor-outer");
					var n, i 	= 0,
						o 		= !1;
					var buttons = "fn_cs_intro_testimonials .prev, .fn_cs_intro_testimonials .next, .fn_cs_swiper_nav_next, .fn_cs_swiper_nav_prev, .fn_dots, .swiper-button-prev, .swiper-button-next, .fn_cs_accordion .acc_head, .resumo_fn_header .fn_finder, .resumo_fn_header .fn_trigger, a, input[type='submit'], .cursor-link, button";
					var sliders = ".swiper-container, .cursor-link";
					// link mouse enter + move
					window.onmousemove = function(s) {
						o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
					}, $("body").on("mouseenter", buttons, function() {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
					}), $("body").on("mouseleave", buttons, function() {
						$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
					}), e.style.visibility = "visible", t.style.visibility = "visible";
					
					
					// slider mouse enter
					$('body').on('mouseenter', sliders, function(){
						e.classList.add('cursor-slider');
						t.classList.add('cursor-slider');
					}).on('mouseleave', sliders,function(){
						e.classList.remove('cursor-slider');
						t.classList.remove('cursor-slider');
					});
					
					// slider mouse hold
					$('body').on('mousedown', sliders, function(){
						e.classList.add('mouse-down');
						t.classList.add('mouse-down');
					}).on('mouseup', sliders, function(){
						e.classList.remove('mouse-down');
						t.classList.remove('mouse-down');
					});
				}
			}
		},
		
		// check again
		widget__archives: function(){
			$('.widget_archive li').each(function(){
				var e = $(this);
				var a = e.find('a').clone();
				$('body').append('<div class="frenify_hidden_item"></div>');
				$('.frenify_hidden_item').html(e.html());
				$('.frenify_hidden_item').find('a').remove();
				var suffix = $('.frenify_hidden_item').html().match(/\d+/); // 1234567890
				$('.frenify_hidden_item').remove();
				suffix = parseInt(suffix);
				if(isNaN(suffix)){
					return false;
				}
				suffix = '<span class="count">'+suffix+'</span>';
				e.html(a);
				e.addClass('has-count');
				e.append(suffix);
			});
		},
		search_placeholder: function(searchinput,text,i,speed){
			setTimeout(function(){
				searchinput.attr('placeholder',text);
			},i*speed);
		},
		
		
		categoryHook: function(){
			var self = this;
			var list = $('.wp-block-archives li, .widget_resumo_custom_categories li, .widget_categories li, .widget_archive li, .wp-block-categories li');
			list.each(function(){
				var item = $(this);
				if(item.find('ul').length){
					item.addClass('has-child');
				}
			});
			
			
			var html = $('.resumo_fn_hidden.more_cats').html();
			var cats = $('.widget_categories,.widget_archive,.widget_resumo_custom_categories,.wp-block-categories');
			if(cats.length){
				cats.each(function(){
					var element = $(this);
					var limit	= 3;
					var li;
					if(element.hasClass('wp-block-categories')){
						li = element.children();
						if(li.length > limit){
							element.after(html);
						}
					}else{
						li = element.find('ul:not(.children) > li');
						if(li.length > limit){
							element.append(html);
						}
					}
					if(li.length > limit){
						var h = 0;
						li.each(function(i,e){
							if(i < limit){
								h += $(e).outerHeight(true,true);
							}else{
								return false;
							}
						});
						if(element.hasClass('wp-block-categories')){
							element.css({height: h + 'px'});
						}else{
							element.find('ul:not(.children)').css({height: h + 'px'});
						}
						
						element.find('.resumo_fn_more_categories .fn_count').html('('+(li.length-limit)+')');
					}else{
						element.addClass('all_active');
					}
				});
				self.categoryHookAction();
			}
		},
		
		categoryHookAction: function(){
			$('.resumo_fn_more_categories').find('a').off().on('click',function(){
				var e 			= $(this);
				var limit		= 3;
				var myLimit		= limit;
				var parent 		= e.closest('.widget_block');
				var li 			= parent.find('ul:not(.children) > li');
				var liHeight	= li.outerHeight(true,true);
				var h			= liHeight*limit;
				var liLength	= li.length;
				var speed		= (liLength-limit)*50;
				e.toggleClass('show');
				if(e.hasClass('show')){
					myLimit		= liLength;
					h			= liHeight*liLength;
					e.find('.text').html(e.data('less'));
					e.find('.fn_count').html('');
				}else{
					e.find('.text').html(e.data('more'));
					e.find('.fn_count').html('('+(liLength-limit)+')');
				}
				
				
				var H = 0;
				li.each(function(i,e){
					if(i < myLimit){
						H += $(e).outerHeight(true,true);
					}else{
						return false;
					}
				});
				
				speed = (speed > 300) ? speed : 300;
				speed = (speed < 1500) ? speed : 1500;
				parent.find('ul:not(.children)').animate({height:H},speed);
			
				
				
				return false;
			});
		},
	
		widget__pages: function(){
			var nav 						= $('.widget_pages ul');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.children');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.children').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
				});
			});
		},
		
		submenu__Mobile: function(){
			var self						= this;
			$('.vert_menu_list a, .widget_nav_menu .menu a').on('click', function(){
				var element 			= $(this);
				self.submenu__Mobile__init(element);
			});
		},
		
		submenu__Mobile__init: function(element){
			var parent				= element.closest('li');
			var submenu				= element.siblings('.sub-menu');
			
			if(submenu.length){
				if(parent.hasClass('active')){
					parent.removeClass('active').find('.active').removeClass('active');
					parent.find('.sub-menu').slideUp();
				}else{
					var siblingActive	= parent.siblings('.active');
					if(siblingActive.length){
						siblingActive.removeClass('active').find('.active').removeClass('active');
						siblingActive.find('.sub-menu').slideUp();
					}
					submenu.slideDown();
					parent.addClass('active');
				}
				return false;
			}
		},
		
		hamburgerOpener__Mobile: function(){
			var opener			= $('.resumo_fn_mobilemenu_wrap .ham_wrapper');
			var hamburger		= $('.resumo_fn_mobilemenu_wrap .hamburger');
			opener.on('click',function(){
				var menupart	= $('.resumo_fn_mobilemenu_wrap .mobilemenu');
				if(hamburger.hasClass('is-active')){
					hamburger.removeClass('is-active');
					menupart.removeClass('opened');
					menupart.slideUp(500);
				}else{
					hamburger.addClass('is-active');
					menupart.addClass('opened');
					menupart.slideDown(500);
				}
				return false;
			});
		},
		

		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
		
		dataFnBgImg: function(){
			var bgImage 	= $('*[data-fn-bg-img]');
			bgImage.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var bgImg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready').css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		
		estimateWidgetHeight: function(){
			var est 	= $('.resumo_fn_widget_estimate');
			est.each(function(){
				var el 	= $(this);
				var h1 	= el.find('.helper1');
				var h2 	= el.find('.helper2');
				var h3 	= el.find('.helper3');
				var h4 	= el.find('.helper4');
				var h5 	= el.find('.helper5');
				var h6 	= el.find('.helper6');
				var eW 	= el.outerWidth();
				var w1 	= Math.floor((eW * 80) / 300);
				var w2 	= eW-w1;
				var e1 	= Math.floor((w1 * 55) / 80);
				h1.css({borderLeftWidth:	w1+'px', borderTopWidth: e1+'px'});
				h2.css({borderRightWidth:	w2+'px', borderTopWidth: e1+'px'});
				h3.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h4.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
				h5.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h6.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
			});
		},
    };
	
	
	
	// ready functions
	$(document).ready(function(){
		ResumoInit.init();
	});
	
	// resize functions
	$(window).on('resize',function(e){
		e.preventDefault();
		ResumoInit.estimateWidgetHeight();
		ResumoInit.navigation__height();
	});
	
	// scroll functions
	$(window).on('scroll', function(e) {
		e.preventDefault();
		
		ResumoInit.rightPanelScroll();
    });
	
	// load functions
	$(window).on('load', function() {
		
	});
	
})(jQuery);



// add all the elements inside modal which you want to make focusable
var focusableElements 		= 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
var modal 					= document.querySelector('.resumo_fn_navigation'); // select the modal by it's id or class

var firstFocusableElement 	= modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
var focusableContent 		= modal.querySelectorAll(focusableElements);
var lastFocusableElement 	= focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


document.addEventListener('keydown', function(e) {
	"use strict";
	var isTabPressed = e.key === 'Tab' || e.keyCode === 9;

	if (!isTabPressed) {return;}
	if (e.shiftKey) { // if shift key pressed for shift + tab combination
		if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus(); // add focus for the last focusable element
			e.preventDefault();
		}
	} else { // if tab key is pressed
		if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
			firstFocusableElement.focus(); // add focus for the first focusable element
			e.preventDefault();
		}
	}
});

//firstFocusableElement.focus();


var modal2 					= document.querySelector('.resumo_fn_mobilemenu_wrap');

var firstFocusableElement2 	= modal2.querySelectorAll(focusableElements)[0];
var focusableContent2 		= modal2.querySelectorAll(focusableElements);
var lastFocusableElement2 	= focusableContent2[focusableContent2.length - 1]; // get last element to be focused inside modal


document.addEventListener('keydown', function(e) {
	"use strict";
	var isTabPressed = e.key === 'Tab' || e.keyCode === 9;

	if (!isTabPressed) {return;}

	if (e.shiftKey) { // if shift key pressed for shift + tab combination
		if (document.activeElement === firstFocusableElement2) {
			lastFocusableElement2.focus(); // add focus for the last focusable element
			e.preventDefault();
		}
	} else { // if tab key is pressed
		if (document.activeElement === lastFocusableElement2) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
			firstFocusableElement2.focus(); // add focus for the first focusable element
			e.preventDefault();
		}
	}
});

if(firstFocusableElement2){
	firstFocusableElement2.focus();
}


