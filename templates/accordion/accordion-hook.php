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
            <?php endif;?>
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


    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('accordions-themes');
    wp_enqueue_style('fontawesome-5');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-core' );
    wp_enqueue_script('jquery-ui-accordion');
    wp_enqueue_script('jquery-effects-core');

    $active_accordion = isset($_GET['id']) ? (int)sanitize_text_field($_GET['id']) : 99999;
    $animation_style = 'swing';
    $animation_delay = 1000;


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
            text-align: <?php echo $container_text_align; ?>;
            background:<?php echo $container_background_color; ?> url(<?php echo $container_background_img; ?>) repeat scroll 0 0;
            padding: <?php echo $container_padding; ?>;
            position: relative;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head{
            background:<?php echo $header_background_color; ?> none repeat scroll 0 0;
            margin:<?php echo $header_margin; ?>;
            padding:<?php echo $header_padding; ?>;
            outline: none;

        }
        #accordions-<?php echo $post_id; ?> .accordions-head-title{
            color:<?php echo $header_color; ?>;
            font-size:<?php echo $header_font_size;?>;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head-title-toogle{
            color:<?php echo $header_color;?>;
            font-size:<?php echo $header_font_size;?>;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head:hover .accordions-head-title{
            color:<?php echo $header_color_hover; ?>;
        }
        #accordions-<?php echo $post_id; ?> .ui-state-active{
            background: <?php echo $header_active_background_color;?>;
            border: none;
        }
        #accordions-<?php echo $post_id; ?> .accordion-content{
            background:<?php echo $body_background_color; ?> none repeat scroll 0 0;
            color:<?php echo $body_color; ?>;
            font-size:<?php echo $body_font_size; ?>;
            margin:<?php echo $body_margin;?>;
            padding:<?php echo $body_padding;?>;
            border: none;
        }
        #accordions-<?php echo $post_id; ?> .accordion-icons{
            color:<?php echo $icon_color;?>;
            font-size:<?php echo $icon_font_size; ?>;
            background:<?php echo $icon_background_color; ?> none repeat scroll 0 0;
            padding:<?php echo $icon_padding;?>;
            margin:<?php echo $icon_margin;?>;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head:hover .accordion-icons{
            color:<?php echo $icon_color_hover; ?>;
        }

        .border-semi-round{
            border-radius: 10px !important;
        }
        .border-round {
            border-radius: 50px !important;
        }
        .border-top-round {
            border-top-left-radius: 10px !important;
            border-top-right-radius: 10px !important;
        }
        .border-bottom-round {
            border-bottom-left-radius: 10px !important;
            border-bottom-right-radius: 10px !important;
        }

        .border-flat {
            border-radius: 0px !important;
        }
        .border-1px {
            border-width: 1px !important;
            border-color: #999 !important;
        }

        .border-2px {
            border-width: 2px !important;
            border-color: #999 !important;
        }
        .border-3px {
            border-width: 3px !important;
            border-color: #999 !important;
        }
        .shadow-bottom {
            box-shadow: 0 3px 4px -1px rgba(0, 0, 0, 0.29);
        }
        .shadow-top {
            box-shadow: 0 -3px 4px -1px rgba(0, 0, 0, 0.29);
        }
        .shadow-bottom-right {
            box-shadow: 3px 3px 4px -1px rgba(0, 0, 0, 0.29);
        }
        .shadow-bottom-left {
            box-shadow: -3px 3px 4px -1px rgba(0, 0, 0, 0.29);
        }
        .shadow-top-right {
            box-shadow: 3px -3px 4px -1px rgba(0, 0, 0, 0.29);
        }
        .shadow-top-left {
            box-shadow: -3px -3px 4px -1px rgba(0, 0, 0, 0.29);
        }

        .border-bottom {
            border-bottom: 2px solid #b3b3b3 !important;
        }
        .border-top {
            border-top: 2px solid #b3b3b3 !important;
        }
        .border-bottom-right {
            border-bottom: 3px solid #b3b3b3 !important;
            border-right: 3px solid #b3b3b3 !important;
        }
        .border-bottom-left {
            border-bottom: 3px solid #b3b3b3 !important;
            border-left: 3px solid #b3b3b3 !important;
        }
        .border-top-right {
            border-top: 3px solid #b3b3b3 !important;
            border-right: 3px solid #b3b3b3 !important;
        }
        .border-top-left {
            border-top: 3px solid #b3b3b3 !important;
            border-left: 3px solid #b3b3b3 !important;
        }

        <?php


        if(!empty($accordions_custom_css)){
        echo $accordions_custom_css;
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



            if(has_shortcode($accordion_body, 'accordions')){
                //$accordion_body = str_replace('[accordions','**<a target="_blank" href="https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=wordpress.org"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordion_body);
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
            <div post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="accordions-head head<?php echo $index; ?> <?php echo $header_class; ?>" toogle-text="<?php echo do_shortcode(esc_attr($toggled_text)); ?>" main-text="<?php echo do_shortcode(esc_attr($accordion_header)); ?>">

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
        }
        else:

            do_action('accordions_main_no_content');
        endif;
        ?>

    </div>
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


    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';
    $lazy_load_src = isset($accordions_options['lazy_load_src']) ? $accordions_options['lazy_load_src'] : '';
    $hide_edit = isset($accordions_options['hide_edit']) ? $accordions_options['hide_edit'] : '';


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



    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('accordions-themes');
    wp_enqueue_style('fontawesome-5');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-core' );
    wp_enqueue_script('jquery-ui-accordion');
    wp_enqueue_script('jquery-effects-core');

    $active_accordion = isset($_GET['id']) ? (int)sanitize_text_field($_GET['id']) : 99999;
    $animation_style = 'swing';
    $animation_delay = 1000;
    ?>
    <script>
        jQuery(document).ready(function($){

            accordion_<?php echo $post_id; ?>  = $("#accordions-<?php echo $post_id; ?> .items").accordion({
                event: "<?php echo $active_event;?>",
                collapsible:<?php echo $collapsible; ?>,
                heightStyle: "<?php echo $height_style; ?>",
                animate: ("<?php echo $animation_style; ?>", <?php echo $animation_delay; ?>),
                navigation: true,
                active: <?php echo $active_accordion; ?>,
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
                activate: function( event, ui ) {
                    if(!$.isEmptyObject(ui.newHeader.offset())) {
                        $("html:not(:animated), body:not(:animated)").animate({ scrollTop: ui.newHeader.offset().top + <?php echo $click_scroll_top_offset;?> }, "slow");
                    }
                },

            });
            <?php
            if($header_toggle == 'yes'):
            ?>
            $("#accordions-<?php echo $post_id; ?> .accordions-head").click(function () {
                toogle_text = $(this).attr('toogle-text');
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


        })
    </script>
    <?php



    if(!empty($accordions_custom_js)):


        ?>
        <script>
            jQuery(document).ready(function($){
                <?php echo $accordions_custom_js; ?>
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