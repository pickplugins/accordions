<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
	$accordions_tabs_title = apply_filters( 'accordions_tabs_filter_title', $accordions_title );
	$html_icons = '';


	if(empty($accordions_tabs_title)){
		$accordions_tabs_title = '&nbsp;';
		}


	if(!empty($accordions_bg_color[$index])){
		$header_style = 'background-color:'.$accordions_bg_color[$index];
		}
	else{
		$header_style = '';
		}


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


?>
    <li class="tabs-nav" ><a style="<?php echo $header_style; ?>" class="accordions-tab-head" href="#tabs-<?php echo $index; ?>">
<?php

	if($accordions_icons_position=='left'){

	    ?>
            <i class="accordions-tab-icons left accordions-tab-plus fa <?php echo $accordions_icons_plus_section; ?>"></i>
            <i class="accordions-tab-icons left accordions-tab-minus fa fa-arrow-down <?php echo $accordions_icons_minus_section; ?>"></i>
        <?php


	
		}


	?>

    <span class="accordions-tabs-head-title"><?php echo $accordions_tabs_title; ?></span>
    <?php

	if($accordions_icons_position=='right'){

	    ?>
            <i class="accordions-tab-icons right accordions-tab-plus fa <?php echo $accordions_icons_plus_section; ?>"></i>
            <i class="accordions-tab-icons right accordions-tab-minus fa <?php echo $accordions_icons_minus_section; ?>"></i>
        <?php


	
		}	

	?>
        </a></li>
    <?php

	
