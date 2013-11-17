
(function($){
	$(function(){

		$("#childpage_carousel").carouFredSel({

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
			$("#childpage_carousel").trigger("slideTo", [$(this), deviation]);
			selectedpage();
		}).css("cursor", "pointer");
		$("a.aslide").click(function(event){
			event.preventDefault();
			//console.log($(this))
			var deviation = 0;
			$("#childpage_carousel").trigger("slideTo", [$(this).parent, deviation]);
			selectedpage();
		}).css("cursor", "pointer");

		$("#buttonnext").click(function() {
			$("#childpage_carousel").trigger("next", 1);
			selectedpage();
		}).css("cursor", "pointer");
		$("#buttonprev").click(function() {
			$("#childpage_carousel").trigger("prev", 1);
			selectedpage();
		}).css("cursor", "pointer");


		$("#childpage_carousel").swipe( {
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount) {
				console.log("You swiped " + direction );
				selectedpage();
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:100
		}).css("cursor", "move");



		var posmax ;
		$( "ul#childpage_carousel li" ).data('bar',function(index){
			return index;
		}).addClass(function( index ) {
			posmax = index;
			return "item-" + index;
		});	

		function selectedpage(){
				$( "#result" ).css("display", "none");
				$( "#result" ).css("opacity", "0.1");
				$("#childpage_carousel .selected").removeClass( "selected" );
				var pos = $("#childpage_carousel").triggerHandler("currentPosition");
				newItems = $("#childpage_carousel .item-"+pos).addClass( "selected" );
				loadpage(newItems.data("id"));
		}

		function loadpage(id){
			//console.log(id);
			$.get( "?p="+id, function( data ) {
				var content = $( data ).find( "article" );
				content.addClass( "souspage" );
				$( "#result" ).empty().append( content ).css("display", "block");
				$( "#result" ).empty().append( content ).clearQueue().animate({'display': "block", "opacity": "1"});
				
			});
		}



		$("#childpage_carousel .item-0").addClass( "selected" );
		selectedpage();



		$("#childpage_carousel").trigger("currentVisible", function( items ) {
			items.addClass( "Visible" );
			//$("#foo").trigger("configuration", ["items", items.length, false]);
			//var visible = $("#childpage_carousel").triggerHandler("configuration", "items.visible");
			//alert( "The carousel has " + visible + " items visible" );
		});

			/*
			var visible = $("#childpage_carousel").triggerHandler("configuration", "items.visible");
			insertItems =  4 - visible;
			console.log( insertItems);
			*/
			insertItems =  2;
			for (var i = 0 ; i < insertItems; i++) {
				$("#childpage_carousel").trigger("insertItem", '<li style="visibility:hidden;"></li>');
			}		

	});


	$(window).resize(function() {
		$("#childpage_carousel").trigger("updateSizes");
		$("#childpage_carousel").trigger("ajout");
	});

	$( "#childpage_carousel" ).on( "ajout", function() {
			//ajout pour les slider de moin de 3 item

	});
	$( "#childpage_carousel" ).on( "custom", function( event, param1, param2 ) {
		console.log( param1 + "\n" + param2 );
	});
	$( "#childpage_carousel").trigger( "custom", [ "Custom", "Event" ] );

})(jQuery);





