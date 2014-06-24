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
		
		$fields = FieldList::create();
		
		$fields->push(
		    HeaderField::create('Note', _t('GoogleDirectionsMap.HEADER', 'Create a Map...'), 2)
		);						
		$fields->push(	
		    LiteralField::create('Note', _t('GoogleDirectionsMap.NOTE', '<strong>Note:</strong> lattitude and longitude take presedence over address'))
		);
		$fields->push(
			TextField::create('LinkID', _t('GoogleDirectionsMap.LINKID', 'Title'))
		);
		$fields->push(
			TextField::create('LatLng', _t('GoogleDirectionsMap.LATLNG', 'LatLng'))
		);
		$fields->push(
			TextField::create('Address', _t('GoogleDirectionsMap.ADDRESS', 'Address'))
		);	
		$fields->push(
			CheckboxField::create('ShowOnStartup', _t('GoogleDirectionsMap.SHOWONSTARTUP', 'Display on startup'))
		);
		$fields->push(
			HtmlEditorField::create('InfoText',  _t('GoogleDirections.INFOTEXT', 'Info text'))->setRows(16)
		);
		$fields->push(
			HiddenField::create('PageID', 'PageID')
		);				
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
