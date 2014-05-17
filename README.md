# Google map and directions module for SilverStripe CMS #

## Introduction ##

This module lets you create links that generate a Google Map based on 
either a geolocation (as in "52.123456, 4.123456") or a valid address. 
There can be multiple links on a page, but one map will be created, that 
is regenerated on clicking a different link. 

The module also lets the user enter his point of origin, upon which it will 
generate the route (driving) on the map as well as a list of directions.

The module is fully localized.

## Requirements ##

 * SilverStripe Framework 3.1+ and CMS 3.1+
 * SilverStripe Translatable module

## Installation

Copy the module to the root of your SilverStripe installation and give it 
any name you want. 

## Setting up the module ##

Enable the GoogleDirections extension on the page controller of the page type 
you want to display the map on. In _config/googledirections.yml:

	Page:
	  extensions:
	    - GoogleDirections

Then add the following to the template at the location where your map should go:

	$GoogleDirections

Now perform a mydomain/?flush=all

## Creating links ##

Links should have the class `'googleDirections'` to be automatically spotted by 
the module. The location for each link should be either a geolocation or a valid 
address. If both are present, the geolocation is used.  

There are two ways to set up the links:
 
### 1. use metadata in the link itself ###

	<a id="Link1" class="googleDirections" href="#" data-latlng="52.123456, 4.123456">My link</a>

or
	
	<a id="Link2" class="googleDirections" href="#" title="Street 123 city">My link</a>

If data-latlng is not found, the module will look for a valid address in the title attribute.

### 2. Use custom JavaScript ###

By using custom JavaScript, you can add a location as well as the contents of 
the marker's  information window:

	locations = {
		Link1: {
			infoText: '<p><strong>My title</strong><br>My description</p>',
			latlng: '52.123456, 4.123456'
		},	
		Link2: {
			infoText: '<p><strong>My title</strong><br>My description</p>',
			address: 'Street 123 City'
		},
		scrollToMap: true  //on long pages, smooth-scroll to the map 
	}
	
*(Note that Link1 and Link2 are the link's id attributes.)*	

## Localization or i18n ##

The PHP code as well as the JavaScript in this module is localized. Find the 
language files here:

 * For PHP: /lang/
 * For JavaScript: /javascript/lang/

**Note:** The default text in the inputfield for the point of origin needs to be 
equal in both language files for it to work. *(Need to find another way for this)* 

## Maintainers ##

 * Martine Bloem (Martimiz)