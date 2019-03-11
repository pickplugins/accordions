<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
	

	 $admin_url = admin_url();

	//$accordion_edit_html = apply_filters('accordion_edit_html','');
	$accordion_edit_url = apply_filters('accordion_edit_url', ''.$admin_url.'post.php?post='.$post_id.'&action=edit' );

	if(current_user_can('administrator') && $accordions_hide_edit == 'no'){

	    ?>
        <div class="accordion-edit"><a href="<?php echo $accordion_edit_url; ?>"><?php echo __('Edit this accordion','accordions'); ?></a>, <?php echo __("Only admin can see this.",'accordions')?></div>
        <?php

    }
	
