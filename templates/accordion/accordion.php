<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access
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



?>
<link rel="stylesheet" type="text/css" media="all" href="<?php echo accordions_plugin_url; ?>assets/frontend/css/jquery-ui.css?ver=20181018"/>
<link rel="stylesheet" type="text/css" media="all" href="<?php echo accordions_plugin_url; ?>assets/global/css/themes.style.css?ver=20181018"/>
<link rel="stylesheet" type="text/css" media="all" href="<?php echo accordions_plugin_url; ?>assets/global/css/fontawesome.min.css?ver=20181018"/>