<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
if($accordions_lazy_load=='yes' && !empty($accordions_lazy_load_src)){

    ?>
    <p id="accordions-tabs-lazy-<?php echo $post_id; ?>" class="accordions-tabs-lazy">
        <img src="<?php echo $accordions_lazy_load_src; ?>"/>
    </p>
    <script>jQuery( window ).load(function() {
            jQuery('#accordions-tabs-lazy-<?php echo $post_id; ?>').fadeOut();
            jQuery('#accordions-tabs-<?php echo $post_id; ?>').fadeIn();
        });</script>
    <?php



}