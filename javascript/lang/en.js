if(typeof(ss) == 'undefined' || typeof(ss.i18n) == 'undefined') {
	console.error('Class ss.i18n not defined');
} else {
	ss.i18n.addDictionary('en', {
		"GOOGLEDIRECTIONS.ZERO_RESULTS" : "No route could be found between the origin and destination.",
		"GOOGLEDIRECTIONS.UNKNOWN_ERROR" : "Could not complete your request due to a server problem (1)",
		"GOOGLEDIRECTIONS.REQUEST_DENIED" : "Could not complete your request due to a server problem (2)",
		"GOOGLEDIRECTIONS.OVER_QUERY_LIMIT" : "Could not complete your request due to a server problem (3)",
		'GOOGLEDIRECTIONS.NOT_FOUND' : "Your point of origin could not be found!",
		"GOOGLEDIRECTIONS.INVALID_REQUEST" : "Could not complete your request due to a server problem (4)",
		"GOOGLEDIRECTIONS.OTHER_ERROR" : "Could not complete your request due to a server problem (4)",
		"GOOGLEDIRECTIONS.ORIGIN" : "Point of origin",
		"GOOGLEDIRECTIONS.DESTINATION" : "Destination"
	});
}


//ZERO_RESULTS: No route could be found between the origin and destination.
//UNKNOWN_ERROR: A directions request could not be processed due to a server error. The request may succeed if you try again.
//REQUEST_DENIED: This webpage is not allowed to use the directions service.
//OVER_QUERY_LIMIT: The webpage has gone over the requests limit in too short a period of time.
//NOT_FOUND: At least one of the origin, destination, or waypoints could not be geocoded!
//INVALID_REQUEST: The DirectionsRequest provided was invalid.
//OTHER_ERROR: There was an unknown error in your request. Requeststatus: \n\n"