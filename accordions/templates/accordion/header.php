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




	if(!empty($accordions_section_icon_plus[$index])){

		$accordions_icons_plus_section = $accordions_section_icon_plus[$index];
		}
	else{
		
		$accordions_icons_plus_section = $accordions_icons_plus;
		}
		
	if(!empty($accordions_section_icon_minus[$index])){
		
		$accordions_icons_minus_section = $accordions_section_icon_minus[$index];
		}
	else{
		$accordions_icons_minus_section = $accordions_icons_minus;
		}	

	if(!empty($accordions_content_title_toggled[$index])){
		
		$title_toogled = $accordions_content_title_toggled[$index];
		}
	else{
		$title_toogled = '';
		}


	?>
    <div post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="accordions-head head<?php echo $index; ?>" toogle-text="<?php echo do_shortcode(esc_attr($title_toogled)); ?>" main-text="<?php echo do_shortcode(esc_attr($accordions_title)); ?>" >
    <?php
	if($accordions_icons_position=='left'){
		?>
        <div class="accordion-icons left accordion-plus fa <?php echo $accordions_icons_plus_section; ?>"></div>
        <div class="accordion-icons left accordion-minus fa <?php echo $accordions_icons_minus_section; ?>"></div>
        <?php
		}
	?>
    <div id="header-text-<?php echo $index; ?>"    class="accordions-head-title"><?php echo do_shortcode($accordions_title); ?></div>
    <?php
	if($accordions_icons_position=='right'){
		?>
        <div class="accordion-icons right accordion-plus fa <?php echo $accordions_icons_plus_section; ?>"></div>
        <div class="accordion-icons right accordion-minus fa <?php echo $accordions_icons_minus_section; ?>"></div>
        <?php
		}
	?>
    </div>