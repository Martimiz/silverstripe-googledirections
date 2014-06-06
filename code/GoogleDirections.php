<?php
/* class GoogleDirections
 * 
 * 
 * 
 * @version 1.0
 * @author Martine Bloem (martimiz at gmail dot com) 
 */
class GoogleDirections extends DataExtension {
	
	private static $db = array(
	    'InfoText' => 'HTMLText',
	    'LatLng' => 'Varchar(50)',
	    'Address' => 'Varchar(255)'
	);
	
	private static $use_browser_language = false;


	public function updateCMSFields(FieldList $fields) {
		$tab = _t('GoogleDirections.GOOGLEDIRECTIONSTAB', 'GoogleDirections');
		
		$fields->addFieldsToTab(
			"Root.$tab",  
			array(
			    TextField::create('LatLng', _t('GoogleDirections.LATLNG', 'Latlng')),
			    TextField::create('Address', _t('GoogleDirections.ADDRESS', 'Address')),
			    HtmlEditorField::create('InfoText', _t('GoogleDirections.INFOTEXT', 'Info text'))->setRows(10)			    
		));
	}	
	
	
	public function contentcontrollerInit() {	

		$useBrowserLanguage = Config::inst()->get('GoogleDirections', 'use_browser_language');
		
		if ($useBrowserLanguage) {
			Requirements::javascript("http://maps.google.com/maps/api/js?sensor=false");
		} 
		else {
			$locale = i18n::get_locale();
			$language = i18n::get_lang_from_locale($locale);
			Requirements::javascript("http://maps.google.com/maps/api/js?sensor=false&language=$language");			
		}
		
		Requirements::javascript(FRAMEWORK_DIR . '/thirdparty/jquery/jquery.min.js');
		Requirements::add_i18n_javascript(GOOGLEDIRECTIONS_BASE . '/javascript/lang');
		Requirements::javascript(GOOGLEDIRECTIONS_BASE . '/javascript/googledirections.js');

		Requirements::css(GOOGLEDIRECTIONS_BASE . '/css/googledirections.css');

		// Build a defaultmap if there is one defined
		$address = $this->owner->Address;
		$latlng  = $this->owner->LatLng;
		$infoText = $this->owner->InfoText;
		$infoText = str_replace("", "''", $infoText);
		
		if ($address || $latlng) {
			Requirements::customScript(<<<JS
				(function($) {
					$(document).ready(function() {
						locations.defaultMap = {
							infoText: '{$infoText}',
							address: '{$address}',
							latlng: '{$latlng}',
							showOnStartup: true
						};
						showInitialMap();
					});
				}(jQuery));
JS
			);
		}
	}
		
	public function getGoogleDirections() {
		return $this->owner->renderWith('GoogleDirections');
	}
}

