<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

?>
<style type='text/css'>
<?php

if(!empty($accordions_bg_color)){
	foreach ( $accordions_bg_color as $index=>$bg_color ){

		if(!empty($accordions_header_bg_img[$index])){
			$header_bg_img = 'url('.$accordions_header_bg_img[$index].')';
		}
		else{
			$header_bg_img = '';
		}

		if(!empty($bg_color)){
			$bg_color_css = $bg_color;
		}
		else{
			$bg_color_css = '';
		}

		if(!empty($bg_color_css) || !empty($header_bg_img)){
		    ?>
            #accordions-<?php echo $post_id; ?> #header-<?php echo$index; ?>{background: <?php echo $bg_color_css; ?> <?php echo $header_bg_img; ?>;}
            <?php
        }
	}
}





if($accordions_lazy_load=='yes'){
    ?>
    #accordions-<?php echo $post_id; ?>{display: none;}
    <?php
	}
?>
#accordions-<?php echo $post_id; ?> {
    text-align: <?php echo $accordions_container_text_align; ?>;
}
#accordions-<?php echo $post_id; ?>{
    background:<?php echo $accordions_container_bg_color; ?> url(<?php echo $accordions_bg_img; ?>) repeat scroll 0 0;
    padding: <?php echo $accordions_container_padding; ?>;
}
#accordions-<?php echo $post_id; ?> .accordions-head{
    background:rgba(<?php echo accordions_paratheme_hex2rgb($accordions_default_bg_color); ?>, <?php echo $accordions_header_bg_opacity; ?>) none repeat scroll 0 0;
    margin:<?php echo $accordions_items_title_margin; ?>;
    padding:<?php echo $accordions_items_title_padding; ?>;
}
#accordions-<?php echo $post_id; ?> .accordions-head-title{
    color:<?php echo $accordions_items_title_color; ?>;
    font-size:<?php echo $accordions_items_title_font_size;?>;
    font-family:<?php echo $accordions_items_title_font_family; ?>;
}
#accordions-<?php echo $post_id; ?> .accordions-head-title-toogle{
    color:<?php echo $accordions_items_title_color;?>;
    font-size:<?php echo $accordions_items_title_font_size;?>;
}
#accordions-<?php echo $post_id; ?> .accordions-head:hover .accordions-head-title{
    color:<?php echo $accordions_items_title_color_hover; ?>;
}
#accordions-<?php echo $post_id; ?> .ui-state-active{
    background: <?php echo $accordions_active_bg_color;?>;
}
#accordions-<?php echo $post_id; ?> .accordion-content{
    background:rgba(<?php echo accordions_paratheme_hex2rgb($accordions_items_content_bg_color); ?>,<?php echo $accordions_items_content_bg_opacity; ?>) none repeat scroll 0 0;
    color:<?php echo $accordions_items_content_color; ?>;
    font-size:<?php echo $accordions_items_content_font_size; ?>;
    font-family:<?php echo $accordions_items_content_font_family;?>;
    margin:<?php echo $accordions_items_content_margin;?>;
    padding:<?php echo $accordions_items_content_padding;?>;
}
#accordions-<?php echo $post_id; ?> .accordion-icons{
    color:<?php echo $accordions_icons_color;?>;
    font-size:<?php echo $accordions_icons_font_size; ?>;
}
#accordions-<?php echo $post_id; ?> .accordions-head:hover .accordion-icons{
    color:<?php echo $accordions_icons_color_hover; ?>;
}
<?php

if(!empty($accordions_custom_css)){
echo $accordions_custom_css;
}
?>
</style>
