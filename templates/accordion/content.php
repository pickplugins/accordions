<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


$accordions_content = $accordions_content_body[$index];
$accordions_content = wpautop($accordions_content);
$accordions_content = apply_filters( 'accordions_filter_content', $accordions_content );

if(empty($accordions_content)){
    $accordions_content = '';
}

?>
<div class="accordion-content content<?php echo $index; ?>">
    <?php echo $accordions_content; ?>
</div>