<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
if($accordions_lazy_load=='yes' && !empty($accordions_lazy_load_src)){

    $html.= '<p id="accordions-tabs-lazy-'.$post_id.'" class="accordions-tabs-lazy">
    <img src="'.$accordions_lazy_load_src.'"/>
    </p>';

    $html .= "<script>jQuery( window ).load(function() {
    jQuery('#accordions-tabs-lazy-".$post_id."').fadeOut();
    jQuery('#accordions-tabs-".$post_id."').fadeIn();
    });</script>";

}