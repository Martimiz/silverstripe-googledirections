# Google map and directions module for SilverStripe CMS #

## Introduction ##

Create one or more Google Maps per page including (optional) Google directions 
from the user's location to your location. Define one map as the default map 
that displays on the on startup. Or create multiple links on the page, 
dynamically loading different maps, each with their own info on clicking 
the marker

You can simply create the dynamic links from the CMS using shortcodes or create 
links and optional JavaScript manually. The module is fully localized and 
backwards compatible to the old stable version 0.1 

### New in this version ###

* Create maps from within the CMS for each page
* Set a map as default, to display on page startup
* Add text and images to display on clicking the locator
* Use shortcodes to create dynamic links to switch between maps
* Disable directions (globally)

### Other options ###

* Use the browser language or the current locale (default) to display directions
* Create dynamic links manually
* Use custom JavaScript
* Use geolocation or a valid address to generate maps
* Supports Translatable

## Requirements ##

 * SilverStripe Framework 3.1+ and CMS 3.1+

## Installation

Copy the module to the root of your SilverStripe installation and give it 
any name you want. 

## Setting up the module ##

Enable the GoogleDirections extension on the page controller of the page type 
you want to display the map on. In _config/googledirections.yml:

	Page:
	  extensions:
	    - GoogleDirections

Or use anothe pagetype. Then add the following to the template at the location 
where your map should go:

	$GoogleDirections
	
If you want to use dynamic Shortcode links, in your _config.php set:

	ShortcodeParser::get('default')
	->register('GMap', array('GoogleDirections', 'link_shortcode_handler'));

Now perform a mydomain/?flush=all

## Creating maps ##

Your page should now have a new tab 'Maps', where you can create one or more 
maps, using either a geolocation or a valid address. 
Note: geolocation takes presedence over address.

### Default map ###

By checking 'Show when page is opened'in the Map details, that map becomes the 
default that will be displayed on opening the page.

## Creating links for different maps ##

You can create links on the page that will dynamically open a specific map. If 
you have one or more links on the page, you do not necessarily have to 

The easy way to create links is to use `shortcodes`. First you need to enable 
the use of shortcodes by adding this to your _config.php:

	ShortcodeParser::get('default')
	->register('GMap', array('GoogleDirections', 'link_shortcode_handler'));

Now create a shortcode, using the title of the map as a reference. The 
following will create a link where the title of the map is also the text of the 
link.

	[GMap, link='My map title']
	
If you want to define a different text for the link:

	[GMap, link='My map title']Text to appear in the link[/GMap]

*Note*: to create links manually, see 
[advanced use: create links manually](#create-links-manually)

## Localization and i18n ##

The PHP code as well as the JavaScript in this module is localized. Find the 
language files here:

 * For PHP: /lang/
 * For JavaScript: /javascript/lang/
 
**Note:** the translation for origin needs to be equal in both javascript and 
PHP language file for the placeholder to work. *I'm not sure if a placeholder 
attribute should be used instead, since there would be no other info in 
browsers that don't support this.*
 
## Enable/disable directions ##

By default directions are enabled for the module. Whenever a map is displayed, 
there is also a form where the user can enter his location, to calculate the 
route and display directions. You can however disable this, and only display 
the map. in _config/googledirections.yml:

	GoogleDirections:
	  directions_enabled: false


## Directions language ##

By default the module will use the current SilverStripe locale to display 
directions, which is useful on multilingual sites. To revert to the current 
browser locale instead (Google default), add the following to your 
GoogleDirections.yml:

	GoogleDirections:
	  use_browser_language: true 

When using this module with the Translatable module, it might be better disable 
the use of the browserlanguage

**Note:** you may need to add this to your Page_Controller for the translations 
to work properly: 

	public function init() {
	
		i18n::set_locale($this->Locale);
		...
	}

<a name="create-links-manually"></a>
## Advanced use: create links manually ##
Links should have the class `'googleDirections'` to be automatically spotted by 
the module. The location for each link should be either a geolocation or a 
valid address. If both are present, the geolocation is used.

If you want to create a link manually, for instance in a template, it should 
look like this:

	<a class="GoogleDirections" data-address="Street 22 Town" data-info="My company">Show map</a>
	
or

	<a class="GoogleDirections" data-latlngs="'52.111111, 4.111111'" data-info="My company">Show map</a>	
	
**Note**: you do not have to create any maps in the CMS for this to work, the 
module will use the data in the link 	

### Use JavaScript ###
If you want to use JavaScript, instead of adding the data to the link itself, 
you can do this:

	<a class="GoogleDirections" id="MyLink" href="#route">Show map</a>

and

	$(document).ready(function() {	
 		locations.MyLink = {
 		infoText: '<p><strong>My Name</strong><br>My description</p>',
 		address: 'My Address'
 		};
 		// define this link as the default (startup) map
 		showStartupMap('MyLink');
 	});
 	
or 

	$(document).ready(function() {	
 		locations.MyLink = {
 			infoText: '<p><strong>My Name</strong><br>My description</p>',
 			latLng: '52.111111, 4.111111'
 		};
 	}); 	

## Troubleshooting ##

**1. the default text in the point-of-origin input doesn't disappear on 
entering the field** 

The default text in the inputfield for the point of origin needs to be 
equal in both language files for it to work. *(Need to find another way for 
this, or use a placeholder attribute)* 

If the right JavaScript locale isn't picked up, this can be fixed 
by adding the locale to the body tag like this:

	<body lang="$ContentLocale">


## Maintainers ##

 * Martine Bloem (Martimiz)