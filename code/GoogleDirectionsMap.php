<?php
/* class GoogleDirectionsMap
 * 
 * Represents one Map, where each map is linked to its own page. One Page can
 * have multiple maps
 * 
 * @author Martine Bloem (martimiz at gmail dot com) 
 */
class GoogleDirectionsMap extends DataObject {
	
	private static $db = array(
	    'LinkID' => 'Varchar',
	    'InfoText' => 'HTMLText',
	    'LatLng' => 'Varchar(50)',
	    'Address' => 'Varchar(255)',
	    'ShowOnStartup' => 'Boolean'
	);
	
	private static $has_one = array(
	    'Page' => 'SiteTree'
	);
	
	private static $summary_fields = array(
	    'LatLng',
	    'Address',
	    'ShowOnStartup',
	    'LinkID'
	);
	
	private static $searchable_fields = array();
	
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		
		$fields->RemoveByName('PageID');
		
		$fields->push(
			HiddenField::create('PageID', 'PageID')
		);
		
		$fields->changeFieldOrder(array(
		    'LinkID', 
		    'LatLng', 
		    'Address', 
		    'ShowOnStartup',  
		    'InfoText'
		));
		
		return $fields;
	}
	
	public function fieldLabels($includerelations = true){
		$labels = parent::fieldLabels($includerelations);
		$labels['LinkID'] = _t('GoogleDirectionsMap.LINKID', 'Title');
		$labels['InfoText'] = _t('GoogleDirectionsMap.INFOTEXT', 'Info text');
		$labels['LatLng'] = _t('GoogleDirectionsMap.LATLNG', 'LatLng');
		$labels['Address'] = _t('GoogleDirectionsMap.ADDRESS', 'Address');
		$labels['ShowOnStartup'] = _t('GoogleDirectionsMap.SHOWONSTARTUP', 'Display on startup');
		$labels['Page'] = _t('GoogleDirectionsMap.PAGE', 'Page');
		return $labels;
	}
}
