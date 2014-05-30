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
	
	public function getGoogleDirections() {
		return $this->owner->renderWith('GoogleDirections');
	}
}

