<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

if($accordions_lazy_load=='yes'):
    ?>
    <p id="accordions-lazy-<?php echo $post_id; ?>" class="accordions-lazy">
        <?php if(!empty($accordions_lazy_load_src)):?>
        <img src="<?php echo $accordions_lazy_load_src; ?>" />
        <?php endif;?>
    </p>
    <script>
        jQuery( window ).load(function() {
            jQuery('#accordions-lazy-<?php echo $post_id; ?>').fadeOut();
            jQuery('#accordions-<?php echo $post_id; ?>').fadeIn();
        });</script>
    <?php
endif;