(function($){

	$(function(){
		var childpage = $("#childpage_carousel");
		var list_carousel =$( ".list_carousel" )

		childpage.carouFredSel({

			//responsive: true,
			//width: '100%',
			//height: 'variable',

			circular: false,
			infinite: false,

			pagination: false,
			height: "auto",
			width: "variable",
			items: {
				padding:[0,14,0,14],
				visible: "variable"
				//height: 'variable'
			},
			scroll: 1000,
			auto: false,
			margin:[0],
			padding:[0],

			//minimum:1,
			swipe: {
				items: 1,
				//easing: "scroll",
				onMouse: true,
				onTouch: true,
				threshold:100,
			},
			//mousewheel: {
			//	items: 2,
			//	easing: "swing",
			//	threshold:100,
			//},
			prev: {
				items: 1,
				button: "#buttonprev",
				key: "left",
			},
			next: {
				items: 1,
				button: "#buttonnext",
				key: "right",
			}
		
		}).find("li").click(function() {
			var deviation = 0;
			childpage.trigger("slideTo", [$(this), deviation]);
			selectedpage();
		}).css("cursor", "pointer");

		$("a.aslide").click(function(event){
			event.preventDefault();
			//console.log($(this))
			var deviation = 0;
			childpage.trigger("slideTo", [$(this).parent, deviation]);
			selectedpage();
		}).css("cursor", "pointer");

		$("#buttonnext").click(function() {
			childpage.trigger("next", 1);
			selectedpage();
		}).css("cursor", "pointer");

		$("#buttonprev").click(function() {
			childpage.trigger("prev", 1);
			selectedpage();
		}).css("cursor", "pointer");

		childpage.swipe( {
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount) {
				console.log("You swiped " + direction );
				selectedpage();
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:100
		}).css("cursor", "move");

		list_carousel.after( '<div class="clearfix"></div><div class="loader"></div><div class="result"></div>' );




		var posmax ;
		$( childpage.selector + " li" ).data('bar',function(index){
			return index;
		}).addClass(function( index ) {
			posmax = index;
			return "item-" + index;
		});	

		function selectedpage(){
				$( ".loader" ).css("display", "block");
				$( ".result" ).css("display", "none");
				$( ".result" ).css("opacity", "0.1");
				$( childpage.selector + " .selected").removeClass( "selected" );
				var pos = childpage.triggerHandler("currentPosition");
				newItems = $( childpage.selector + " .item-"+pos).addClass( "selected" );
				loadpage(newItems.data("id"));
		}

		function loadpage(id){
			//console.log(id);
			$.get( "?p="+id, function( data ) {
				var content = $( data ).find( "article" );
				content.addClass( "souspage" );
				$( ".loader" ).css("display", "none");
				$( ".result" ).empty().append( content ).css("display", "block");
				$( ".result" ).empty().append( content ).clearQueue().animate({'display': "block", "opacity": "1"});
				
			});
		}



		$( childpage.selector + " .item-0").addClass( "selected" );
		selectedpage();



		childpage.trigger("currentVisible", function( items ) {
			items.addClass( "Visible" );

		});

			insertItems =  2;
			for (var i = 0 ; i < insertItems; i++) {
				childpage.trigger("insertItem", '<li style="visibility:hidden;"></li>');
			}		

		$(window).resize(function() {
			childpage.trigger("updateSizes");
			childpage.trigger("ajout");
		});	
	});





})(jQuery);





