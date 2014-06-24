/*
 *  Create a Google map for any link that has class="googleDirections" based either on
 *  geolocation in data-latlng, or an address in the title attribute
 *  
 *  <a id="link1" class="googleDirections" href="#" data-latlng="52.123456, 4.123456">My link</a>
 *  <a id="link2" class="googleDirections" href="#" title="Street 123 city">My link</a>
 *  
 *  You can also use the following script:
 *  
 *  $(document).ready(function() {			
 *  	locations.link1 = {
 *  		infoText: '<p><strong>My title</strong><br>My description</p>',
 *  		address: 'Street 123 City'
 *  	};	
 *  	locations.link2 = {
 *  		infoText: '<p><strong>Locatie: Haarlem</strong><br>Kennemerstraat 22<br>Telefoon: 1234567890</p>',
 *  		latlng: '52.123456, 4.123456',
 *  		scrollToMap: true              // on long pages, smooth-scroll to the map
 *  	}			
 *  });	
 *  
 *  To define a link as a StartUpMap do :
 *  
 *	showStartupMap('link2');
 *  
 *  also let the user enter a point of origin from where to calulate te route.
 *  Uses the following template:
 *  
 *  <a name="route" id="route"></a>
 *  <div id="MapHolder" style="display:none;width:100%;">
 *  
 *  	<div id="RouteForm">
 *  		<h3><% _t('GOOGLEDIRECTIONS.DIRECTIONS','Route description') %></h3>
 *  		<form action="$Link" method="POST">
 *  			<fieldset>
 *  				<div class="field" style="float:left;">
 *  					<input style="padding: 4px 5px;" class="text small" type="text" id="RouteStart" value="<% _t('GOOGLEDIRECTIONS.ORIGIN') %>">
 *  				</div>
 *  				<div class="Actions">
 *  					<input id="SubmitOrigin" type="submit" value="Show route" class="action" />
 *  					<input id="PrintRoute" type="button" value="Print route" class="action" style="display:none;">
 *  				</div>	
 *  			</fieldset>
 *  		</form>
 *  	</div>
 *  	<div id="MapCanvas" style="width:1005;height:400px;border:2px solid red;"></div>
 *  	<div id="DirectionsPanel"></div>
 *  </div>  
 * 
 */
var locations = {};
var scrollToMap = true;
var showOnStartup = false;
var startupMapFound = false;


var latlng;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var initialValue = ss.i18n._t('GOOGLEDIRECTIONS.ORIGIN');
var infoText = '';
var latlngString;
var address;


/*
 * Generate the map for the currently clicked link
 */
function initialize() {

	var myOptions = {
		zoom: 14,
		draggable:false,
		scrollwheel:false,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		streetViewControl: false
	};
	var map = new google.maps.Map(document.getElementById("MapCanvas"),myOptions);

	var marker = new google.maps.Marker({
		position: latlng, 
		map: map, 
		title: ''
	}); 

	if (infoText) {
		var infowindow = new google.maps.InfoWindow({
			content: infoText
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}	

	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("DirectionsPanel"));		

	$('#PrintRoute').hide();
	$('#MapHolder').stop().animate({height: "show"});

}


/* 
 * Calculate the route, and show it on the map, including a 
 * list of Google-generated directions
 */
function calculateRoute() {

	var origin = document.getElementById("RouteStart").value;

	var destination = (address)? address : latlngString;

	var request = {
		origin:origin,
		destination: destination,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	directionsService.route(request, function(response, status) {

		if (status == google.maps.DirectionsStatus.OK) {

			$('#PrintRoute').show();

			document.getElementById("DirectionsPanel").innerHTML = "";

			directionsDisplay.setDirections(response);

		} else {
			if (status == 'ZERO_RESULTS') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.ZERO_RESULTS'));
			} else if (status == 'UNKNOWN_ERROR') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.UNKNOWN_ERROR'));
			} else if (status == 'REQUEST_DENIED') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.REQUEST_DENIED'));
			} else if (status == 'OVER_QUERY_LIMIT') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.OVER_QUERY_LIMIT'));
			} else if (status == 'NOT_FOUND') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.NOT_FOUND'));
			} else if (status == 'INVALID_REQUEST') {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.INVALID_REQUEST'));					
			} else {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.OTHER_ERROR')+": \n\n"+status);
			}
		}
	});
	return false;
}

/*
 * Print the directions
 * 
 * @Todo: use another way of generating the printable data instead of
 *        using a popup window? As this is a module, and independent of the
 *        theme, a print type css won't work very well 
 */
function printRoute() {
	var data = $("#DirectionsPanel").html();
	var printWindow = window.open('', 'PrintThis', 'height=400,width=600');

	printWindow.document.write('<html><head><title>Print route</title>');
	//printWindow.document.write('<link rel="stylesheet" href="printroute.css" type="text/css" />');
	printWindow.document.write('</head><body >');
	printWindow.document.write(data);
	printWindow.document.write('</body></html>');

	printWindow.print();
	printWindow.close();
}

/* 
 * create the options for the googlemap, then call initialize() to build it.
 */
function displayMap(location) {

	// always reset to accomodate a new link
	latlngString = '';
	address = '';
	infoText = '';
	var lat = 0,lng = 0;

	if ('infoText' in location) infoText = location.infoText;
	if ('latlng' in location)  latlngString = location.latlng;
	if (!latlngString) {
		if ('address' in location) address = location.address;
	}


	// if a latttitude,longitude string has been found, use it
	if (latlngString) {
		latlngArray = latlngString.split(',');
		lat = latlngArray[0];
		lng = latlngArray[1];
		latlng = new google.maps.LatLng(lat,lng);
		initialize();
	}
	// else if an address is found, it needs to be geocoded
	else if (address) {
		geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) { 
				lat = results[0].geometry.location.lat();
				lng = results[0].geometry.location.lng();
				latlng = new google.maps.LatLng(lat,lng);
				latlngString = lat + ',' + lng;
				initialize();
			} 
			else {
				alert(ss.i18n._t('GOOGLEDIRECTIONS.OTHER_ERROR')+": \n\n"+status);
			}
		});
	} 			
}

/*
 * Check if a location has showInitialMap defined. Note: the location doesn't 
 * necessary be named after an existing link!
 */
function showStartupMap(mapID) {
	//$('#Haarlem')[0].click();

	if (!startupMapFound && mapID) {
		if (mapID in locations) {
			startupMapFound = true;
			displayMap(locations[mapID]);
		}
		
		else if($('#' + mapID).length){
			$('#' + mapID)[0].click();
		}
	}
}
		
(function($) {
	$(document).ready(function() {
				
		/*
		 * Click event for every link that has a class="googleDirections"
		 */
		$('.googleDirections').on('click', function(event) { 			
			event.preventDefault();
			
			// on a long page, smooth-scroll to the map - but only onClick, not on initial map
			if ('scrollToMap' in locations) scrollToRoute = locations.scrollToMap;
			if (scrollToMap) $('html,body').animate({scrollTop:$(event.target.hash).offset().top}, 100);

			var id = $(this).attr('id');
			var location;

			if (id in locations) {
				location = locations[id];
			}
			else {
				location = {};
				if ($(this).data('latlng')) {
					location.latlng = $(this).data('latlng');
				}
				else if ($(this).data('address')) {
					location.address = $(this).data('address');
				}
				// legacy
				else if ($(this).attr('title')) {
					location.address = $(this).attr('title');
				}
				
				if ($(this).data('infotext')) {
					location.infoText = $(this).data('infotext');
				}
			}
			if (location) {
				displayMap(location);
			}
		});
		
		/*
		 * Submit a point of origin and calculate the route
		 */
		$('#SubmitOrigin').on('click', function(event) { 
			calculateRoute();
			event.preventDefault();
			
		});
		
		/*
		 * Print the calculated route. Displayed only when a route has 
		 * actualy been created
		 */
		$('#PrintRoute').on('click', function(event) { 
			printRoute();
			event.preventDefault();
		});
		
		/*
		 * show/hide the default text for the point-of-origin input field
		 */
		$('#RouteStart').on('focus', function() { 
			var origin = $(this).val();
			if (origin == initialValue) $(this).val('');
		});
		
		$('#RouteStart').on('blur', function() { 
			var origin = $(this).val();
			if (origin == '') $(this).val(initialValue);
		});
	});
}(jQuery));
		


