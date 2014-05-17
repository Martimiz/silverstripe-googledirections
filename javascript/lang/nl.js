// note: uses body lang=""
if(typeof(ss) == 'undefined' || typeof(ss.i18n) == 'undefined') {
	if(typeof(console) != 'undefined') console.error('Class ss.i18n not defined');
} else {
	ss.i18n.addDictionary('nl', {
		"GOOGLEDIRECTIONS.ZERO_RESULTS" : "Geen route gevonden vanaf uw vertrekpunt.",
		"GOOGLEDIRECTIONS.UNKNOWN_ERROR" : "Verzoek kon niet worden verwerkt vanwege een fout op de server (1)",
		"GOOGLEDIRECTIONS.REQUEST_DENIED" : "Verzoek kon niet worden verwerkt vanwege een fout op de server (2)",
		"GOOGLEDIRECTIONS.OVER_QUERY_LIMIT" : "Verzoek kon niet worden verwerkt vanwege een fout op de server (3)",		
		"GOOGLEDIRECTIONS.NOT_FOUND" : "Uw vertrekpunt kon niet worden gevonden.",
		"GOOGLEDIRECTIONS.INVALID_REQUEST" : "Verzoek kon niet worden verwerkt vanwege een fout op de server (4)",
		"GOOGLEDIRECTIONS.OTHER_ERROR" : "Verzoek kon niet worden verwerkt vanwege een fout op de server (5)",
		"GOOGLEDIRECTIONS.ORIGIN" : "Vertrekpunt",
		"GOOGLEDIRECTIONS.DESTINATION" : "Bestemming"
	});
}


