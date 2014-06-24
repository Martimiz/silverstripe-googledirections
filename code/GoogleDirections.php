<?php
/* class GoogleDirections
 * 
 * 
 * 
 * @version 1.0
 * @author Martine Bloem (martimiz at gmail dot com) 
 */
class GoogleDirections extends DataExtension {
	
	private static $use_browser_language = false;
	
	private static $directions_enabled = true;
	
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
		
	}
	
	/**
	 * Global setting: Is the display of directions enabled for this website? 
	 * Default: true. If false only the map is displayed
	 * 
	 * @return Boolean
	 */
	public function DirectionsEnabled() {
		return Config::inst()->get('GoogleDirections', 'directions_enabled');
	}
	
	public function getGoogleDirections() {
		return $this->owner->renderWith('GoogleDirections');
	}
}

