<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('accordions_main', 'accordions_main_top');

function accordions_main_top($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';
    $lazy_load_src = isset($accordions_options['lazy_load_src']) ? $accordions_options['lazy_load_src'] : '';

    if($lazy_load=='yes'):
        ?>
        <div id="accordions-lazy-<?php echo $post_id; ?>" class="accordions-lazy">
            <?php if(!empty($lazy_load_src)):?>
                <img src="<?php echo $lazy_load_src; ?>" />
            <?php endif; ?>
        </div>
        <script>
            jQuery(window).load(function(){
                jQuery('#accordions-lazy-<?php echo $post_id; ?>').fadeOut();
                jQuery('#accordions-<?php echo $post_id; ?> .items').fadeIn();
            });
        </script>
    <?php
    endif;
}


add_action('accordions_main', 'accordions_main_expand_collapse');

function accordions_main_expand_collapse($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordion = isset($accordions_options['accordion']) ? $accordions_options['accordion'] : array();

    $expand_collapse_display = isset($accordion['expand_collapse_display']) ? $accordion['expand_collapse_display'] : '';
    $expand_collapse_bg_color = isset($accordion['expand_collapse_bg_color']) ? $accordion['expand_collapse_bg_color'] : '';
    $expand_collapse_text = isset($accordion['expand_collapse_text']) ? $accordion['expand_collapse_text'] : '';

    if(!empty($expand_collapse_text)){
        $expand_collapse_text_arr = explode('|', $expand_collapse_text);

        $expand_all_text = isset($expand_collapse_text_arr[0]) ? $expand_collapse_text_arr[0] : __("Expand all", 'accordions');
        $collapse_all_text = isset($expand_collapse_text_arr[1]) ? $expand_collapse_text_arr[1] : __("Collapse all", 'accordions');
    }else{
        $expand_all_text =  __("Expand all", 'accordions');
        $collapse_all_text =  __("Collapse all", 'accordions');
    }


    if($expand_collapse_display=='yes'){
        ?>
        <div id="expand-collapse-<?php echo $post_id; ?>" class="expand-collapse" accordion-id="<?php echo $post_id; ?>">
            <span class="expand"><i class="fas fa-expand"></i> <?php echo $expand_all_text; ?></span><span class="collapse"><i class="fas fa-compress"></i> <?php echo $collapse_all_text; ?></span>
        </div>
        <script>
            jQuery(document).ready(function($){

                $("#accordions-<?php echo $post_id; ?> .expand-collapse").click(function() {
                    if( $(this).hasClass("active") ) $(this).removeClass("active");
                    else $(this).addClass("active");
                    accordion_id = $(this).attr("accordion-id");
                    $("#accordions-"+accordion_id+" .ui-accordion-header:not(.ui-state-active)").next().slideToggle();
                });
            })
        </script>
        <?php
    }



}


add_action('accordions_main', 'accordions_main_search');

function accordions_main_search($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordion = isset($accordions_options['accordion']) ? $accordions_options['accordion'] : array();

    $enable_search = isset($accordion['enable_search']) ? $accordion['enable_search'] : 'no';
    $search_placeholder_text = isset($accordion['search_placeholder_text']) ? $accordion['search_placeholder_text'] : '';

    if($enable_search == 'yes'){
        ?>
        <div id="search-input-<?php echo $post_id; ?>" class="search-input-wrap" >
            <input class="search-input" placeholder="<?php echo $search_placeholder_text; ?>" value="">
        </div>
        <script>
        jQuery(document).ready(function($){
            jQuery(document).on('keyup', '#search-input-<?php echo $post_id; ?> input.search-input', function(){
                keyword = jQuery(this).val().toLowerCase();
                content_head = [];
                content_body = [];
                $('#accordions-<?php echo $post_id; ?> .items  .accordions-head-title').each(function( index ) {
                    content = $( this ).text().toLowerCase();
                    content_head[index] = content;
                    $( this ).parent().removeClass("accordion-header-active");
                    $( this ).parent().removeClass("ui-state-active");
                });
                $('#accordions-<?php echo $post_id; ?> .items  .accordion-content').each(function( index ) {
                    $( this ).hide();
                    content = $( this ).text().toLowerCase();
                    content_body[index] = content + ' ' + content_head[index];
                    n = content_body[index].indexOf(keyword);
                    if(n<0){
                        $( this ).prev().hide();
                    }else{
                        $( this ).prev().show();
                    }
                });
            })
        })
        </script>
        <?php
    }
}








add_action('accordions_main', 'accordions_main_style');

function accordions_main_style($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';

    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordions_content = isset($accordions_options['content']) ? $accordions_options['content'] : array();

    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';

    $icon = isset($accordions_options['icon']) ? $accordions_options['icon'] : array();
    $icon_active = isset($icon['active']) ? $icon['active'] : '';
    $icon_inactive = isset($icon['inactive']) ? $icon['inactive'] : '';
    $icon_color = isset($icon['color']) ? $icon['color'] : '';
    $icon_color_hover = isset($icon['color_hover']) ? $icon['color_hover'] : '';
    $icon_font_size = isset($icon['font_size']) ? $icon['font_size'] : '';
    $icon_background_color = isset($icon['background_color']) ? $icon['background_color'] : '';
    $icon_padding = isset($icon['padding']) ? $icon['padding'] : '0px';
    $icon_margin = isset($icon['margin']) ? $icon['margin'] : '0px';


    $header = isset($accordions_options['header']) ? $accordions_options['header'] : array();
    $header_style_class = isset($header['style_class']) ? $header['style_class'] : '';

    $header_background_color = isset($header['background_color']) ? $header['background_color'] : '';
    $header_active_background_color = isset($header['active_background_color']) ? $header['active_background_color'] : '';
    $header_color = isset($header['color']) ? $header['color'] : '';
    $header_color_hover = isset($header['color_hover']) ? $header['color_hover'] : '';
    $header_font_size = isset($header['font_size']) ? $header['font_size'] : '';
    $header_padding = isset($header['padding']) ? $header['padding'] : '';
    $header_margin = isset($header['margin']) ? $header['margin'] : '';


    $body = isset($accordions_options['body']) ? $accordions_options['body'] : array();
    $body_background_color = isset($body['background_color']) ? $body['background_color'] : '';
    $body_active_background_color = isset($body['active_background_color']) ? $body['active_background_color'] : '';
    $body_color = isset($body['color']) ? $body['color'] : '';
    $body_color_hover = isset($body['color_hover']) ? $body['color_hover'] : '';
    $body_font_size = isset($body['font_size']) ? $body['font_size'] : '';
    $body_padding = isset($body['padding']) ? $body['padding'] : '';
    $body_margin = isset($body['margin']) ? $body['margin'] : '';

    $container = isset($accordions_options['container']) ? $accordions_options['container'] : array();
    $container_padding = isset($container['padding']) ? $container['padding'] : '';
    $container_background_color = isset($container['background_color']) ? $container['background_color'] : '';
    $container_text_align = isset($container['text_align']) ? $container['text_align'] : '';
    $container_background_img = isset($container['background_img']) ? $container['background_img'] : '';

    $custom_scripts = isset($accordions_options['custom_scripts']) ? $accordions_options['custom_scripts'] : array();
    $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';
    $custom_css = isset($custom_scripts['custom_css']) ? $custom_scripts['custom_css'] : '';


    wp_enqueue_style('accordions-style');

    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('accordions-themes');
    wp_enqueue_style('fontawesome-5');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-core' );
    wp_enqueue_script('jquery-ui-accordion');
    wp_enqueue_script('jquery-effects-core');


    ?>
    <style type='text/css'>
        <?php
        if($lazy_load=='yes'){
            ?>
            #accordions-<?php echo $post_id; ?> .items {display: none;}
            #accordions-<?php echo $post_id; ?> .accordions-lazy {
                text-align: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            <?php
        }
        ?>
        #accordions-<?php echo $post_id; ?> {
            <?php if(!empty($container_text_align)):?>
            text-align: <?php echo $container_text_align; ?>;
            <?php endif; ?>
            <?php if(!empty($container_background_color) || !empty($container_background_img)):?>
            background:<?php echo $container_background_color; ?> url(<?php echo $container_background_img; ?>) repeat scroll 0 0;
            <?php endif; ?>
            <?php if(!empty($container_padding)):?>
            padding: <?php echo $container_padding; ?>;
            <?php endif; ?>
            position: relative;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head{
            <?php if(!empty($header_background_color)):?>
            background:<?php echo $header_background_color; ?> none repeat scroll 0 0;
            <?php endif; ?>
            <?php if(!empty($header_margin)):?>
            margin:<?php echo $header_margin; ?>;
            <?php endif; ?>
            <?php if(!empty($header_padding)):?>
            padding:<?php echo $header_padding; ?>;
            <?php endif; ?>
            outline: none;

        }
        #accordions-<?php echo $post_id; ?> .accordions-head-title{
            <?php if(!empty($header_color)):?>
            color:<?php echo $header_color; ?>;
            <?php endif; ?>
            <?php if(!empty($header_font_size)):?>
            font-size:<?php echo $header_font_size; ?>;
            <?php endif; ?>
        }
        #accordions-<?php echo $post_id; ?> .accordions-head-title-toggle{
            <?php if(!empty($header_color)):?>
            color:<?php echo $header_color; ?>;
            <?php endif; ?>
            <?php if(!empty($header_font_size)):?>
            font-size:<?php echo $header_font_size; ?>;
            <?php endif; ?>
        }
        #accordions-<?php echo $post_id; ?> .accordions-head:hover .accordions-head-title{
            <?php if(!empty($header_color_hover)):?>
            color:<?php echo $header_color_hover; ?>;
            <?php endif; ?>
        }
        #accordions-<?php echo $post_id; ?> .ui-state-active{
            <?php if(!empty($header_active_background_color)):?>
            background: <?php echo $header_active_background_color; ?>;
            <?php endif; ?>
            border: none;
        }
        #accordions-<?php echo $post_id; ?> .accordion-content{
            <?php if(!empty($body_background_color)):?>
            background:<?php echo $body_background_color; ?> none repeat scroll 0 0;
            <?php endif; ?>
            <?php if(!empty($body_color)):?>
            color:<?php echo $body_color; ?>;
            <?php endif; ?>
            <?php if(!empty($body_font_size)):?>
            font-size:<?php echo $body_font_size; ?>;
            <?php endif; ?>
            <?php if(!empty($body_margin)):?>
            margin:<?php echo $body_margin; ?>;
            <?php endif; ?>
            <?php if(!empty($body_padding)):?>
            padding:<?php echo $body_padding; ?>;
            <?php endif; ?>
            border: none;
        }
        #accordions-<?php echo $post_id; ?> .accordion-icons{
            <?php if(!empty($icon_color)):?>
            color:<?php echo $icon_color; ?>;
            <?php endif; ?>
            <?php if(!empty($icon_font_size)):?>
            font-size:<?php echo $icon_font_size; ?>;
            <?php endif; ?>
            <?php if(!empty($icon_background_color)):?>
            background:<?php echo $icon_background_color; ?> none repeat scroll 0 0;
            <?php endif; ?>
            <?php if(!empty($icon_padding)):?>
            padding:<?php echo $icon_padding; ?>;
            <?php endif; ?>
            <?php if(!empty($icon_margin)):?>
            margin:<?php echo $icon_margin; ?>;
            <?php endif; ?>
        }
        #accordions-<?php echo $post_id; ?> .accordions-head:hover .accordion-icons span{
            <?php if(!empty($icon_color_hover)):?>
            color:<?php echo $icon_color_hover; ?>;
            <?php endif; ?>
        }
        <?php
        if(!empty($custom_css)){
            echo $custom_css;
        }

        if(!empty($accordions_content)){
            foreach ( $accordions_content as $index=>$accordion ){
                $background_img = isset($accordion['background_img']) ? $accordion['background_img'] : '';
                $background_color = isset($accordion['background_color']) ? $accordion['background_color'] : '';

                $header_bg_img = !empty($background_img) ? 'url('.$background_img.')' : '';
                $bg_color_css = !empty($background_color) ? $background_color : '';

                if(!empty($bg_color_css) || !empty($header_bg_img)){
                    ?>
                    #accordions-<?php echo $post_id; ?> #header-<?php echo$index; ?>{background: <?php echo $bg_color_css; ?> <?php echo $header_bg_img; ?>;}
                    <?php
                }
            }
        }

        ?>
    </style>
    <?php



}







add_action('accordions_main', 'accordions_main_items');

function accordions_main_items($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordions_content = isset($accordions_options['content']) ? $accordions_options['content'] : array();
    $enable_shortcode = isset($accordions_options['enable_shortcode']) ? $accordions_options['enable_shortcode'] : 'yes';
    $enable_wpautop = isset($accordions_options['enable_wpautop']) ? $accordions_options['enable_wpautop'] : 'yes';
    $enable_autoembed = isset($accordions_options['enable_autoembed']) ? $accordions_options['enable_autoembed'] : 'yes';

    $header = isset($accordions_options['header']) ? $accordions_options['header'] : array();
    $header_class = isset($header['class']) ? $header['class'] : '';

    $body = isset($accordions_options['body']) ? $accordions_options['body'] : array();
    $body_class = isset($body['class']) ? $body['class'] : '';


    $icon = isset($accordions_options['icon']) ? $accordions_options['icon'] : array();
    $icon_active = !empty($icon['active']) ? $icon['active'] : '<i class="fas fa-chevron-up"></i>';
    $icon_inactive = !empty($icon['inactive']) ? $icon['inactive'] : '<i class="fas fa-chevron-right"></i>';
    $icon_position = !empty($icon['position']) ? $icon['position'] : 'left';


    ?>
    <div class="items">

        <?php

        if(!empty($accordions_content)):

            $item_count = 0;
            $active_index = array();
        foreach ($accordions_content as $index => $accordion){

            $accordion_hide = isset($accordion['hide']) ? $accordion['hide'] : '';

            if($accordion_hide == 'true') continue;


            $accordion_header = isset($accordion['header']) ? $accordion['header'] : '';
            $accordion_body = isset($accordion['body']) ? $accordion['body'] : '';

            $accordion_is_active = isset($accordion['is_active']) ? $accordion['is_active'] : '';
            $toggled_text = isset($accordion['toggled_text']) ? $accordion['toggled_text'] : '';
            $active_icon = !empty($accordion['active_icon']) ? $accordion['active_icon'] : $icon_active;
            $inactive_icon = !empty($accordion['inactive_icon']) ? $accordion['inactive_icon'] : $icon_inactive;


            $accordion_body = apply_filters( 'accordions_item_header', $accordion_body, $post_id );

            if(($accordion_is_active =='yes')){
                $active_index[$index] = $item_count;
            }




            if(has_shortcode($accordion_body, 'accordions')){
                $accordion_body = str_replace('[accordions','**<a target="_blank" href="https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=wordpress.org"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordion_body);
            }


            $accordion_body = apply_filters( 'accordions_item_body', $accordion_body, $post_id );


            if($enable_autoembed =='yes'){
                $WP_Embed = new WP_Embed();
                $accordion_body = $WP_Embed->autoembed( $accordion_body);
            }

            if($enable_wpautop =='yes'){
                $accordion_body = wpautop($accordion_body);
            }

            if($enable_shortcode =='yes'){
                $accordion_body = do_shortcode($accordion_body);
            }


            ?>
            <div post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="accordions-head head<?php echo $index; ?> <?php echo $header_class; ?>" toggle-text="<?php echo do_shortcode(esc_attr($toggled_text)); ?>" main-text="<?php echo do_shortcode(esc_attr($accordion_header)); ?>">

                <?php
                if($icon_position == 'left'):
                    ?>
                    <span id="accordion-icons-<?php echo $index; ?>" class="accordion-icons">
                        <span class="accordion-icon-active accordion-plus"><?php echo $active_icon; ?></span>
                        <span class="accordion-icon-inactive accordion-minus"><?php echo $inactive_icon; ?></span>
                    </span>
                    <span id="header-text-<?php echo $index; ?>" class="accordions-head-title"><?php echo do_shortcode($accordion_header); ?></span>
                    <?php
                elseif ($icon_position == 'right'):
                    ?>
                    <span id="header-text-<?php echo $index; ?>" class="accordions-head-title"><?php echo do_shortcode($accordion_header); ?></span>
                    <span id="accordion-icons-<?php echo $index; ?>" class="accordion-icons">
                        <span class="accordion-icon-active accordion-plus"><?php echo $active_icon; ?></span>
                        <span class="accordion-icon-inactive accordion-minus"><?php echo $inactive_icon; ?></span>
                    </span>
                <?php
                endif;
                ?>


            </div>
            <div class="accordion-content content<?php echo $index; ?> <?php echo $body_class; ?>">
                <?php echo $accordion_body; ?>
            </div>

            <?php
            $item_count++;
        }
        else:

            do_action('accordions_main_no_content');
        endif;

        ?>
    </div>
    <script>
        jQuery(document).ready(function($){
            <?php
                if(isset($_GET['active_index'])):
                    $accordion_index = isset($_GET['active_index']) ? sanitize_text_field($_GET['active_index']) : '';

                    //var_dump($accordion_index);

                    $accordion_index = explode('-', $accordion_index);
                    foreach ($accordion_index as $args){
                        $args_arr = explode('|', $args);
                        $accordion_id = isset($args_arr[0]) ? $args_arr[0] : '';
                        $accordion_indexes = isset($args_arr[1]) ? $args_arr[1] : '';
                        $active_index = !empty($accordion_indexes) ? explode(',', $accordion_indexes) : array();
                        $active_index_new = array();
                        foreach ($active_index as $ind){
                            $active_index_new[] = (int)$ind;
                        }
                        ?>
                        accordions_active_index_<?php echo $accordion_id; ?> = <?php echo json_encode($active_index_new); ?>;
                        <?php
                    }
                else:
                    ?>
                        accordions_active_index_<?php echo $post_id; ?> = <?php echo json_encode($active_index); ?>;
                    <?php
                endif;
            ?>
        })
    </script>
    <?php


    $enable_schema = isset($accordions_options['enable_schema']) ? $accordions_options['enable_schema'] : 'yes';
    if($enable_schema == 'no') return;
    $accordions_count = count($accordions_content);

    ob_start();
    $i = 1;
    foreach ($accordions_content as $index => $accordion) {
        $accordion_hide = isset($accordion['hide']) ? $accordion['hide'] : '';
        if ($accordion_hide == 'true') continue;
        $accordion_header = isset($accordion['header']) ? $accordion['header'] : '';
        $accordion_body = isset($accordion['body']) ? $accordion['body'] : '';
        ?>
{
    "@type": "Question",
    "name": "<?php echo esc_attr($accordion_header); ?>",
    "acceptedAnswer": {
    "@type": "Answer",
    "text": "<?php echo esc_attr($accordion_body); ?>"
    }
}<?php echo ($accordions_count > $i ) ? ',' :'';

        $i++;
    }

    $html = ob_get_clean();
    ?>
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [<?php echo $html; ?>]
}
</script>
    <?php
}


add_action('accordions_main', 'accordions_main_edit_link');

function accordions_main_edit_link($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';

    $accordions_options = get_post_meta($post_id, 'accordions_options', true);
    $hide_edit = isset($accordions_options['hide_edit']) ? $accordions_options['hide_edit'] : 'yes';




    if(current_user_can('administrator') && $hide_edit == 'no'){
        $admin_url = admin_url();
        $accordion_edit_url = apply_filters('accordion_edit_url', ''.$admin_url.'post.php?post='.$post_id.'&action=edit' );

        ?>
        <div class="accordion-edit"><a href="<?php echo $accordion_edit_url; ?>"><?php echo __('Edit this accordion','accordions'); ?></a>, <?php echo __("Only admin can see this.",'accordions')?></div>
        <?php

    }

}







add_action('accordions_main', 'accordions_main_scripts');

function accordions_main_scripts($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';

    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordion = isset($accordions_options['accordion']) ? $accordions_options['accordion'] : array();
    $collapsible = isset($accordion['collapsible']) ? $accordion['collapsible'] : 'true';
    $expanded_other = isset($accordion['expanded_other']) ? $accordion['expanded_other'] : 'no';
    $height_style = isset($accordion['height_style']) ? $accordion['height_style'] : 'content';
    $active_event = isset($accordion['active_event']) ? $accordion['active_event'] : 'click';
    $click_scroll_top = isset($accordion['click_scroll_top']) ? $accordion['click_scroll_top'] : '';
    $click_scroll_top_offset = !empty($accordion['click_scroll_top_offset']) ? $accordion['click_scroll_top_offset'] : 100;
    $header_toggle = !empty($accordion['header_toggle']) ? $accordion['header_toggle'] : 'no';
    $animate_style = !empty($accordion['animate_style']) ? $accordion['animate_style'] : 'swing';
    $animate_delay = !empty($accordion['animate_delay']) ? $accordion['animate_delay'] : 1000;


    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';
    $lazy_load_src = isset($accordions_options['lazy_load_src']) ? $accordions_options['lazy_load_src'] : '';
    $hide_edit = isset($accordions_options['hide_edit']) ? $accordions_options['hide_edit'] : '';
    $enable_stats = isset($accordions_options['enable_stats']) ? $accordions_options['enable_stats'] : 'no';

    $icon = isset($accordions_options['icon']) ? $accordions_options['icon'] : array();
    $icon_active = isset($icon['active']) ? $icon['active'] : '';
    $icon_inactive = isset($icon['inactive']) ? $icon['inactive'] : '';
    $icon_color = isset($icon['color']) ? $icon['color'] : '';
    $icon_color_hover = isset($icon['color_hover']) ? $icon['color_hover'] : '';
    $icon_font_size = isset($icon['font_size']) ? $icon['font_size'] : '';
    $icon_background_color = isset($icon['background_color']) ? $icon['background_color'] : '';

    $header = isset($accordions_options['header']) ? $accordions_options['header'] : array();
    $header_background_color = isset($header['background_color']) ? $header['background_color'] : '';
    $header_active_background_color = isset($header['active_background_color']) ? $header['active_background_color'] : '';
    $header_color = isset($header['color']) ? $header['color'] : '';
    $header_color_hover = isset($header['color_hover']) ? $header['color_hover'] : '';
    $header_font_size = isset($header['font_size']) ? $header['font_size'] : '';
    $header_padding = isset($header['padding']) ? $header['padding'] : '';
    $header_margin = isset($header['margin']) ? $header['margin'] : '';

    $body = isset($accordions_options['body']) ? $accordions_options['body'] : array();
    $body_background_color = isset($body['background_color']) ? $body['background_color'] : '';
    $body_active_background_color = isset($body['active_background_color']) ? $body['active_background_color'] : '';
    $body_color = isset($body['color']) ? $body['color'] : '';
    $body_color_hover = isset($body['color_hover']) ? $body['color_hover'] : '';
    $body_font_size = isset($body['font_size']) ? $body['font_size'] : '';
    $body_padding = isset($body['padding']) ? $body['padding'] : '';
    $body_margin = isset($body['margin']) ? $body['margin'] : '';

    $container = isset($accordions_options['container']) ? $accordions_options['container'] : array();
    $container_padding = isset($container['padding']) ? $container['padding'] : '';
    $container_background_color = isset($container['background_color']) ? $container['background_color'] : '';
    $container_text_align = isset($container['text_align']) ? $container['text_align'] : '';
    $container_background_img = isset($container['background_img']) ? $container['background_img'] : '';

    $custom_scripts = isset($accordions_options['custom_scripts']) ? $accordions_options['custom_scripts'] : array();
    $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';


    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('accordions-themes');
    wp_enqueue_style('fontawesome-5');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-core' );
    wp_enqueue_script('jquery-ui-accordion');
    wp_enqueue_script('jquery-effects-core');

    $active_accordion = isset($_GET['id']) ? (int)sanitize_text_field($_GET['id']) : 99999;

    ?>
    <script>
        jQuery(document).ready(function($){
            accordion_<?php echo $post_id; ?>  = $("#accordions-<?php echo $post_id; ?> .items").accordion({
                event: "<?php echo $active_event; ?>",
                collapsible:<?php echo $collapsible; ?>,
                heightStyle: "<?php echo $height_style; ?>",
                animate: ("<?php echo $animate_style; ?>", <?php echo $animate_delay; ?>),
                navigation: true,
                active: <?php echo $active_accordion; ?>,
                <?php if($click_scroll_top == 'yes'):?>
                activate: function( event, ui ) {
                    if(!$.isEmptyObject(ui.newHeader.offset())) {
                        $("html:not(:animated), body:not(:animated)").animate({ scrollTop: ui.newHeader.offset().top + <?php echo $click_scroll_top_offset; ?> }, "slow");
                    }
                },
                <?php endif; ?>
                <?php if($expanded_other == 'yes'): ?>
                beforeActivate: function(event, ui) {
                    if (ui.newHeader[0]) {
                        var currHeader  = ui.newHeader;
                        var currContent = currHeader.next(".ui-accordion-content");
                    } else {
                        var currHeader  = ui.oldHeader;
                        var currContent = currHeader.next(".ui-accordion-content");
                    }
                    var isPanelSelected = currHeader.attr("aria-selected") == "true";
                    currHeader.toggleClass("ui-corner-all",isPanelSelected).toggleClass("accordion-header-active ui-state-active ui-corner-top",!isPanelSelected).attr("aria-selected",((!isPanelSelected).toString()));
                    currHeader.children(".ui-icon").toggleClass("ui-icon-triangle-1-e",isPanelSelected).toggleClass("ui-icon-triangle-1-s",!isPanelSelected);
                    currContent.toggleClass("accordion-content-active",!isPanelSelected)
                    if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
                    return false;
                },
                <?php endif; ?>
            });
            if(typeof accordions_active_index_<?php echo $post_id; ?> != 'undefined'){
                accordions_active_index = accordions_active_index_<?php echo $post_id; ?>;
                for (var index in accordions_active_index) {
                    $("#accordions-<?php echo $post_id; ?> .items").accordion("option", "active", accordions_active_index[index]);
                }
            }
            <?php
            if($enable_stats =='yes'):
                ?>
                $("#accordions-<?php echo $post_id; ?> .accordions-head").click(function () {
                    header_id = $(this).attr('header_id');
                    post_id = $(this).attr('post_id');
                    $.ajax({
                        type: 'POST',
                        context: this,
                        url:accordions_ajax.accordions_ajaxurl,
                        data: {
                            "action" 	: "accordions_ajax_track_header",
                            "header_id" : header_id,
                            "post_id" : post_id,
                        },
                        success: function( data ) {
                            //console.log(data);
                        }
                    });
                });
                <?php
            endif;

            if($header_toggle == 'yes'):
                ?>
                $("#accordions-<?php echo $post_id; ?> .accordions-head").click(function () {
                    toogle_text = $(this).attr('toggle-text');
                    main_text = $(this).attr('main-text');
                    if( $(this).hasClass('ui-state-active') ){
                        if( toogle_text != null && toogle_text != ''){
                            $(this).children('.accordions-head-title').html(toogle_text);
                        }
                    } else {
                        if( main_text != null  && main_text != ''){
                            $(this).children('.accordions-head-title').html(main_text);
                        }
                    }
                    id = $(this).attr( 'id' );
                });
                <?php
            endif;
            ?>

            var hash = window.location.hash;
            if (hash) {
                index = $("#accordions-<?php echo $post_id; ?> "+hash).attr('aria-controls');
                index = index.replace('ui-id-','');
                console.log(parseInt(index));
                $("#accordions-<?php echo $post_id; ?> .items").accordion("option", "active", parseInt(index));
            }


        })
    </script>
    <?php



    if(!empty($custom_js)):

        ?>
        <script>
            jQuery(document).ready(function($){
                <?php echo $custom_js; ?>
            })
        </script>
    <?php
    endif;

}


add_action('accordions_main_no_content', 'accordions_main_no_content');
function accordions_main_no_content(){


    ?>
    <p><?php echo __('Content missing',''); ?></p>
    <?php

}

