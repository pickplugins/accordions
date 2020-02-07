<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access

$accordions_fontawesome_ver = get_option('accordions_fontawesome_ver','version-5');

include accordions_plugin_dir.'/templates/accordion/variables.php';
include accordions_plugin_dir.'/templates/accordion/scripts.php';
include accordions_plugin_dir.'/templates/accordion/lazy.php';
include accordions_plugin_dir.'/templates/accordion/custom-css.php';
?>
<div id="accordions-<?php echo $post_id; ?>" class="<?php echo $accordions_class; ?> accordions-themes <?php echo $accordions_themes; ?> accordions-<?php echo $post_id; ?>">
<?php



if($accordions_class!='child-accordion'){
	include accordions_plugin_dir.'/templates/accordion/top-navs.php';
}


	?>
	<div class="items">
        <?php


        $index_count = 1;
        $section_max = count($accordions_content_title);

        foreach ($accordions_content_title as $index => $accordions_title){

            if(empty($accordions_hide[$index])){
                include accordions_plugin_dir.'/templates/accordion/header.php';
                include accordions_plugin_dir.'/templates/accordion/content.php';
            }
            $index_count++;
        }

        ?>

	</div>
</div>

<?php

include accordions_plugin_dir.'/templates/accordion/accordion-edit.php';

if($accordions_fontawesome_ver =='none'){

}elseif($accordions_fontawesome_ver =='version-4'){
    wp_enqueue_style('fontawesome-4');
}else{
    wp_enqueue_style('fontawesome-5');
}


wp_enqueue_style('jquery-ui');
wp_enqueue_style('accordions-themes');

wp_enqueue_script( 'jquery' );
wp_enqueue_script( 'jquery-ui-core' );
wp_enqueue_script('jquery-ui-accordion');
wp_enqueue_script('jquery-effects-core');
?>
