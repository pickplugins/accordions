<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

//add_action('accordions_tabs_main', 'accordions_tabs_main_top');

function accordions_tabs_main_top($atts){

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













add_action('accordions_tabs_main', 'accordions_tabs_main_items');

function accordions_tabs_main_items($atts){

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


    //var_dump($icon_position);

    $nav_html = '';
    $nav_content_html = '';


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


                ob_start();
                ?>
                <li post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="tabs-nav head<?php echo $index; ?> <?php echo $header_class; ?>" toggle-text="<?php echo do_shortcode(esc_attr($toggled_text)); ?>" main-text="<?php echo do_shortcode(esc_attr($accordion_header)); ?>">

                    <?php
                    if($icon_position == 'left'):
                        ?>

                    <a style="" class="accordions-tab-head" href="#tabs-<?php echo $index; ?>">
                        <span id="accordion-icons-<?php echo $index; ?>" class="accordion-icons">
                            <span class="accordion-icon-active accordion-plus"><?php echo $active_icon; ?></span>
                            <span class="accordion-icon-inactive accordion-minus"><?php echo $inactive_icon; ?></span>
                        </span>
                        <span id="header-text-<?php echo $index; ?>" class="accordions-head-title"><?php echo do_shortcode($accordion_header); ?></span>
                    </a>
                        <?php
                    elseif ($icon_position == 'right'):
                        ?>
                        <a style="" class="accordions-tab-head" href="#tabs-<?php echo $index; ?>">
                            <span id="header-text-<?php echo $index; ?>" class="accordions-head-title"><?php echo do_shortcode($accordion_header); ?></span>
                            <span id="accordion-icons-<?php echo $index; ?>" class="accordion-icons">
                                <span class="accordion-icon-active accordion-plus"><?php echo $active_icon; ?></span>
                                <span class="accordion-icon-inactive accordion-minus"><?php echo $inactive_icon; ?></span>
                        </span>
                        </a>

                    <?php
                    endif;
                    ?>


                </li>

                <?php
                $nav_html .= ob_get_clean();

                ob_start();
                ?>


                <div class="tabs-content tabs-content<?php echo $index; ?> <?php echo $body_class; ?>" id="tabs-<?php echo $index;?>">
                    <?php echo $accordion_body; ?>
                </div>

                <?php
                $nav_content_html .= ob_get_clean();

                $item_count++;
            }
        else:

            do_action('accordions_tabs_main_no_content');
        endif;

        ?>

    <ul>
        <?php echo $nav_html; ?>
    </ul>

    <?php echo $nav_content_html; ?>

    <?php

}


add_action('accordions_tabs_main', 'accordions_tabs_main_edit_link');

function accordions_tabs_main_edit_link($atts){

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







add_action('accordions_tabs_main', 'accordions_tabs_main_scripts');

function accordions_tabs_main_scripts($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';

    $accordions_options = get_post_meta($post_id,'accordions_options', true);

    $custom_scripts = isset($accordions_options['custom_scripts']) ? $accordions_options['custom_scripts'] : array();
    $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';




    $active_accordion = isset($_GET['id']) ? (int)sanitize_text_field($_GET['id']) : 1;



    $tabs = isset($accordions_options['tabs']) ? $accordions_options['tabs'] : array();
    $collapsible = isset($tabs['collapsible']) ? $tabs['collapsible'] : 'true';
    $active_event = isset($tabs['active_event']) ? $tabs['active_event'] : 'click';
    $tabs_is_vertical = isset($tabs['is_vertical']) ? $tabs['is_vertical'] : '';
    ?>
    <script>
        jQuery(document).ready(function($){
            <?php

            if($tabs_is_vertical=='yes'){
                 ?>

                $( "#accordions-tabs-<?php echo $post_id; ?>" ).addClass( "ui-tabs-vertical ui-helper-clearfix" );
                $( "#accordions-tabs-<?php echo $post_id; ?> li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
                <?php
            }
            ?>



            $("#accordions-tabs-<?php echo $post_id; ?>" ).tabs();




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


add_action('accordions_tabs_main_no_content', 'accordions_tabs_main_no_content');
function accordions_tabs_main_no_content(){


    ?>
    <p><?php echo __('Content missing',''); ?></p>
    <?php

}


add_action('accordions_tabs_main', 'accordions_tabs_main_style');

function accordions_tabs_main_style($atts){

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


    $tabs = isset($accordions_options['tabs']) ? $accordions_options['tabs'] : '';


    $tabs_is_vertical = isset($tabs['is_vertical']) ? $tabs['is_vertical'] : '';
    $navs_width_ratio = isset($tabs['navs_width_ratio']) ? $tabs['navs_width_ratio'] : '';
    $tabs_icon_toggle = isset($tabs['tabs_icon_toggle']) ? $tabs['tabs_icon_toggle'] : '';



    wp_enqueue_style('style-tabs');

    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('fontawesome-5');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-core' );
    wp_enqueue_script('jquery-ui-tabs');
    wp_enqueue_script('jquery-effects-core');



    ?>
    <style type='text/css'>
        #accordions-tabs-<?php echo $post_id; ?>{
            text-align: <?php echo $container_text_align; ?>;
        }
        #accordions-tabs-<?php echo $post_id; ?>{
            background:<?php echo $container_background_color; ?> url(<?php echo $container_background_img; ?>) repeat
            scroll 0 0;
            padding: <?php echo $container_padding; ?>;
        }
        #accordions-tabs-<?php echo $post_id; ?> .tabs-nav{
            background-color:<?php echo $header_background_color; ?>;
            color:<?php echo $header_color; ?>;
            font-size:<?php echo $header_font_size; ?>;
            margin:<?php echo $header_margin; ?> !important;
            padding:<?php echo $header_padding; ?> !important;
            border: none;
            border-radius: 0px;
        }
        #accordions-tabs-<?php echo $post_id; ?> .accordions-head-title{
            color:<?php echo $header_color; ?>;
        }
        #accordions-tabs-<?php echo $post_id; ?> .ui-tabs-active{
            background: <?php echo $header_active_background_color; ?>;

        }
        #accordions-tabs-<?php echo $post_id; ?> .tabs-content{
            background-color:<?php echo $body_background_color; ?>;
            color:<?php echo $body_color; ?>;
            font-size:<?php echo $body_font_size; ?>;
            margin:<?php echo $body_margin; ?>;
            padding:<?php echo $body_padding; ?>;
        }
        #accordions-tabs-<?php echo $post_id; ?> .accordion-icons span{
            color:<?php echo $icon_color; ?>;
            font-size:<?php echo $icon_font_size; ?>;
        }



        <?php
        if(!empty($accordions_custom_css)){
            echo $accordions_custom_css;
        }


        if($tabs_icon_toggle=='yes'){
            ?>
        .accordions-tabs .ui-tabs-active .accordions-tab-plus {
            display: none;
        }
        .accordions-tabs .ui-tabs-active .accordions-tab-minus {
            display: inline;
        }
        <?php
    }
    if($tabs_is_vertical=='yes'){

        $nav_width_ratio = ($navs_width_ratio + 5);
        $panel_width_ratio = (100 - $nav_width_ratio);


        ?>
        .ui-tabs-vertical .ui-tabs-nav { float: left; width: <?php echo $navs_width_ratio; ?>%;overflow: hidden; }
        .ui-tabs-vertical .ui-tabs-nav li { clear: left; width: 100%; }
        .ui-tabs-vertical .ui-tabs-panel { padding: 1em; float: left; width: <?php echo $panel_width_ratio; ?>%;}


        <?php
    }
     ?>
    </style>
    <?php



}
