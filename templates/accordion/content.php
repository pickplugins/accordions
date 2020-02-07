<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


$accordions_content = $accordions_content_body[$index];

if(has_shortcode($accordions_content, 'accordions')){
    //var_dump('True');

    $accordions_content = str_replace('[accordions','**<a target="_blank" href="https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=wordpress.org"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordions_content);
}

$accordions_content = wpautop(do_shortcode($accordions_content));
$accordions_content = apply_filters( 'accordions_filter_content', $accordions_content );

if(empty($accordions_content)){
    $accordions_content = '';
}

?>
<div class="accordion-content content<?php echo $index; ?>">
    <?php echo $accordions_content; ?>
</div>