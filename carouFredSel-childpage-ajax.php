<?php
/*
Plugin Name: carouFredSel-childpage-ajax
Plugin URI: http://composant.gires.net
Description: A simplified ajax front end carouFredSel-childpage-ajax
Version: 1.0
Author: romain Gires
Author URI: http://composant.gires.net
*/

function load_remote_scripts() {

	$plugin_dir_url = plugin_dir_url( __FILE__ );

	// $handle : Name that wordpress handles this script with.
	// $src : location of the script file, if it's not included already.
	// $deps : Other scripts THIS scripts depends upon. Default - array()
	// $ver : Version of the script. Optional. - Default - WordPress version.
	// $in_footer : Loads the script in footer. - Default - false.

	//wp_enqueue_script( 'my-ajax-handle', $plugin_dir_url."ajax.js", array("jquery") );
	wp_enqueue_script( 'carouFredSel', $plugin_dir_url."jquery.carouFredSel-6.2.1-packed.js", array("jquery") );

	wp_enqueue_script( 'mousewheel', $plugin_dir_url."helper-plugins/jquery.mousewheel.min.js", array("jquery") );
	wp_enqueue_script( 'touchSwipe', $plugin_dir_url."helper-plugins/jquery.touchSwipe.min.js", array("jquery") );
	//romain
	// bug avec layer slider
	//wp_enqueue_script( 'transit', $plugin_dir_url."helper-plugins/jquery.transit.min.js", array("jquery") );

	wp_enqueue_script( 'carouFredSel-param', $plugin_dir_url."carouFredSel-childpage-param.js", array("jquery") );
}
add_action('init', 'load_remote_scripts');

function load_styles() {
    // assign the url of theme to a variable $themedir
    //$themedir = get_bloginfo('template_url');
	$plugin_dir_url = plugin_dir_url( __FILE__ );

	// $handle : Name of the stylesheet.
	// $src : Path to the stylesheet.
	// $deps : Styles that should be loaded before this style.
	// $ver : Version of the style.
	// $media : screen , media, handheld or print.
    wp_enqueue_style( 'carouFredSel_style',  $plugin_dir_url . "style.css");
}
 
// Load the above function via init hook.
add_action('init', 'load_styles');






 ?>
