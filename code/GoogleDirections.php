<?php
/* class GoogleDirections
 * 
 * 
 * 
 * @version 1.0
 * @author Martine Bloem (martimiz at gmail dot com) 
 */
class GoogleDirections extends DataExtension {
	
	public function contentcontrollerInit() {	
		Requirements::javascript('http://maps.google.com/maps/api/js?sensor=false');
		Requirements::javascript(FRAMEWORK_DIR . '/thirdparty/jquery/jquery.js');
		Requirements::add_i18n_javascript(GOOGLEDIRECTIONS_BASE . '/javascript/lang');
		Requirements::javascript(GOOGLEDIRECTIONS_BASE . '/javascript/googledirections.js');

		Requirements::css(GOOGLEDIRECTIONS_BASE . '/css/googledirections.css');
		
		Requirements::customScript(<<<JS

$(document).ready(function() {	
			
	locations = {
		Alkmaar: {
			infoText: '<p><strong>Locatie: Alkmaar</strong><br>Laat 38<br>Telefoon: 1234567890</p>',
			latlng: '',
			address: 'Laat 28 Alkmaar'
		},	
		Haarlem: {
			infoText: '<p><strong>Locatie: Haarlem</strong><br>Kennemerstraat 22<br>Telefoon: 1234567890</p>',
			latlng: '',
			address: ' Grote Markt 2'
		}	
	}
			
});	
			
JS
		);
	}
	
	public function getGoogleDirections() {
		return $this->owner->renderWith('GoogleDirections');
	}
}

