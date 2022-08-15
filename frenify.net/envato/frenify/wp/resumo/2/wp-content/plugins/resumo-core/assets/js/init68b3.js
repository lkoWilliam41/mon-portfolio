(function($, fnFrontend){
	"use strict";
	
	
	
	var FrenifyResumo = {
		
		isAdmin: false,
		adminBarH: 0,
		
		init: function() {
			
			if($('body').hasClass('admin-bar')){
				FrenifyResumo.isAdmin 		= true;
				FrenifyResumo.adminBarH 	= $('#wpadminbar').height();
			}

			var widgets = {
				'frel-progress-bar.default' : FrenifyResumo.progress,
				'frel-testimonials.default' : FrenifyResumo.testimonials,
				'frel-blog.default' : FrenifyResumo.getPostsAjax,
				'frel-project-carousel.default' : FrenifyResumo.portfolioCarousel,
			};

			$.each( widgets, function( widget, callback ) {
				fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
			
			FrenifyResumo.pageWidthAnimation();
		},
		
		portfolioCarousel: function(){
			var owl 		= $('.fn_cs_project_carousel .owl-carousel');
			owl.each(function(){
				var el 		= $(this);
				var parent	= el.closest('.fn_cs_project_carousel');
				el.owlCarousel({
					autoplay: true,
					autoplayTimeout: 7000,
					smartSpeed: 1000,
					margin: 20,
					nav: false,
					loop:true,
					autoWidth:true,
					items:4,
					dots: false,
					responsive : {
						0 : {
							autoWidth : false,
							items: 1
						},
						769: {
							autoWidth : false,
							items: 2
						},
						1041: {
							autoWidth : true,
							items: 4
						}
					}
				});
				el.trigger('refresh.owl.carousel');
				el.on('changed.owl.carousel', function() {
					el.trigger('stop.owl.autoplay');
					el.trigger('play.owl.autoplay');
				});
				var prev = parent.find('.my__nav .prev');
				var next = parent.find('.my__nav .next');
				prev.off().on('click',function(){
					el.trigger('prev.owl');
					return false;
				});
				next.off().on('click',function(){
					el.trigger('next.owl');
					return false;
				});
			});
			FrenifyResumo.ImgToSVG();
			FrenifyResumo.BgImg();
		},
		
		pageWidthAnimation: function(){
			FrenifyResumo.changeWidth();
			$(window).on('scroll', function() {
				FrenifyResumo.changeWidth();
			});
		},
		
		changeWidth: function(){
			var scrolltop	= $(window).scrollTop();
			var action		= 0;
			if(scrolltop > 0 && !$('body').hasClass('core-scrolled')){
				action++;
				$('body').addClass('core-scrolled');
			}else if(scrolltop === 0 && $('body').hasClass('core-scrolled')){
				action++;
				$('body').removeClass('core-scrolled');
			}
			if(action > 0){
				setTimeout(function(){
					FrenifyResumo.portfolioCarousel();
					FrenifyResumo.testimonials();
				},500);
			}
		},
		
		getPostsAjax: function(){
			$('.fn_cs_blog_list .load_more a').on('mousedown',function(){
				var element 	= $(this);
				var text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.addClass('hold');
					text.text(element.attr('data-no'));
					return false;
				}
			}).on('mouseup',function(){
				var element 	= $(this);
				var text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.removeClass('hold');
					text.text(element.attr('data-done'));
					return false;
				}
			}).on('mouseleave',function(){
				var element 	= $(this);
				var text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.removeClass('hold');
					text.text(element.attr('data-done'));
					return false;
				}
			});
			$('.fn_cs_blog_list .load_more a').on('click',function(){
				var element 			= $(this);
				if(element.hasClass('done') || element.hasClass('loading')){return false;}
				element.addClass('loading');
				var more				= element.closest('.load_more');
				var input				= more.find('.next_page');
				var abb					= element.closest('.fn_cs_blog_list');
				var filter_page			= parseInt(input.val());
				var text 				= element.find('.text');
				var post_number			= parseInt(element.find('.post_number').val());
				
				
				

				var requestData = {
					action: 'resumo_fn_get_posts',
					filter_page: filter_page,
					post_number: post_number,
					only_thumb: element.find('.only_thumb').val(),
				};


				$.ajax({
					type: 'POST',
					url: RusemoAjaxObject.ajax,
					cache: false,
					data: requestData,
					success: function(data) {
						var fnQueriedObj 	= $.parseJSON(data);
						var html			= fnQueriedObj.data;
						var $grid			= abb.find('.inner ul');
						var $items;
						$items = $(html);
						input.val(filter_page+1);
						input.change();

						$grid.append( $items );
						FrenifyResumo.BgImg();
						element.removeClass('loading');

						var listItem = $grid.find('.new_item');
						listItem.each(function(i, e){
							setTimeout(function(){
								$(e).addClass('fadeInTop done').removeClass('new_item');
							}, (i*300));	
						});

						if(fnQueriedObj.disabled === 'disabled'){
							element.addClass('done');
							text.text(element.attr('data-done'));
						}else{
							text.text(element.attr('data-initial'));
						}
					},
					error: function(xhr, textStatus, errorThrown){
						element.removeClass('loading');
					}
				});
					
				
				return false;
			});
		},
		
		
		testimonials: function(){
			var owl 		= $('.fn_cs_testimonials .owl-carousel');
			owl.each(function(){
				var el 		= $(this);
				var parent	= el.closest('.fn_cs_testimonials');
				el.owlCarousel({
					autoplay: true,
					autoplayTimeout: 7000,
					smartSpeed: 1000,
					margin: 20,
					nav: false,
					loop: true,
					items: 1,
					dots: false
				});
				el.trigger('refresh.owl.carousel');
				el.on('changed.owl.carousel', function() {
					el.trigger('stop.owl.autoplay');
					el.trigger('play.owl.autoplay');
				});
				var prev = parent.find('.my__nav .prev');
				var next = parent.find('.my__nav .next');
				prev.off().on('click',function(){
					el.trigger('prev.owl');
					return false;
				});
				next.off().on('click',function(){
					el.trigger('next.owl');
					return false;
				});
			});
			FrenifyResumo.ImgToSVG();
			FrenifyResumo.BgImg();
		},
		
		fn_cs_counter: function(){
			var element = $('.fn_cs_counter');
			element.each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop') || (el.closest('.elementor').parent().parent().parent().hasClass('resumo_fn_modalbox'))){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		progress: function(){
			$('.fn_cs_progress_bar').each(function() {
				var pWrap 	= $(this);
				pWrap.waypoint({handler: function(){FrenifyResumo.progressF(pWrap);},offset:'90%'});
			});
		},
		
		progressF: function(container){
			container.find('.progress_item').each(function(i) {
				var progress 	= $(this);
				var pValue 		= parseInt(progress.data('value'));
				var percent 	= progress.find('.progress_percent');
				var pBar 		= progress.find('.progress_bg');
				pBar.css({width:pValue+'%'});
				setTimeout(function(){
					progress.addClass('open');
					percent.html(pValue+'%').css({right:(100 - pValue)+ '%'});
				},(i*500));
			});	
		},
		
		recallProgress: function(tabs){
			tabs.find('.progress_bg').css({width:'0%'});
			tabs.find('.progress_percent').html('').css({right:'100%'});
			tabs.find('.progress_item').removeClass('open');
			FrenifyResumo.progress();
		},
		
		/* COMMMON FUNCTIONS */
		BgImg: function(){
			var div = $('*[data-fn-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var dataBg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
			var div2 = $('*[data-img]');
			div2.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-img');
				var dataBg	= element.data('img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
		
		ImgToSVG: function(){
			
			$('img.fn__svg').each(function(){
				var $img 		= $(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');

				$.get(imgURL, function(data) {
					var $svg = $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					$img.replaceWith($svg);

				}, 'xml');

			});
		},
		isotopeFunction: function(){
			var masonry = $('.fn_cs_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  itemSelector: '.fn_cs_masonry_in',
					  masonry: {}
					});
					$(this).isotope( 'reloadItems' ).isotope();
				});
			}
		},
	};
	
	$( window ).on( 'elementor/frontend/init', FrenifyResumo.init );
	
	
	$( window ).on('resize',function(){
		FrenifyResumo.isotopeFunction();
		setTimeout(function(){
			FrenifyResumo.isotopeFunction();
		},700);
	});
	$( window ).on('load',function(){
		FrenifyResumo.isotopeFunction();
	});
	
	
})(jQuery, window.elementorFrontend);


jQuery(document).ready(function(){

	new WOW({
		callback: function(box){
			jQuery(box).addClass('done');
		}
	}).init();

});