<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
	$accordions_title = apply_filters( 'accordions_filter_title', $accordions_title );


	if(empty($accordions_title)){
		$accordions_title = '&nbsp;';
		}


		$header_style = '';



	?>
    <div post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="accordions-head head<?php echo $index; ?>"  >
        <div class="accordion-icons left accordion-plus fa <?php echo $accordions_icons_plus; ?>"></div>
        <div class="accordion-icons left accordion-minus fa <?php echo $accordions_icons_minus; ?>"></div>
        <div id="header-text-<?php echo $index; ?>"    class="accordions-head-title"><?php echo do_shortcode($accordions_title); ?></div>
    </div>