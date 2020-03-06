<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('accordions_main', 'accordions_main_top');

function accordions_main_top($atts){

}


add_action('accordions_main', 'accordions_main_items');

function accordions_main_items($atts){

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $accordions_options = get_post_meta($post_id,'accordions_options', true);
    $accordions_content = isset($accordions_options['content']) ? $accordions_options['content'] : array();

    ?>
    <div class="items">

        <?php

        foreach ($accordions_content as $index => $accordion){

            $header = isset($accordion['header']) ? $accordion['header'] : '';
            $body = isset($accordion['body']) ? $accordion['body'] : '';


            ?>
            <div post_id="<?php echo $post_id; ?>" header_id="header-<?php echo $index; ?>" id="header-<?php echo $index; ?>" style="" class="accordions-head head<?php echo $index; ?>"  >
                <div class="accordion-icons left accordion-plus fa <?php //echo $accordions_icons_plus; ?>"></div>
                <div class="accordion-icons left accordion-minus fa <?php //echo $accordions_icons_minus; ?>"></div>
                <div id="header-text-<?php echo $index; ?>"    class="accordions-head-title"><?php echo do_shortcode($header); ?></div>
            </div>
            <div class="accordion-content content<?php echo $index; ?>">
                <?php echo $body; ?>
            </div>

            <?php
            //var_dump($accordion);

        }

        ?>

    </div>
    <?php

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
            wizard_accordion  = $("#accordions-<?php echo $post_id; ?>.accordions .items").accordion({
                event: "<?php echo $active_event;?>",
                collapsible:<?php echo $collapsible; ?>,
                heightStyle: "<?php echo $height_style; ?>",
                animate: ("<?php echo $animation_style; ?>", <?php echo $animation_delay; ?>),
                navigation: true,
                active: <?php echo $active_accordion; ?>,
                <?php
                if($expanded_other == 'yes'){
                    ?>
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
                    <?php
                }

                ?>
            });
        })</script>
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


    if($lazy_load=='yes'){
        ?>
        /*#accordions-*/<?php //echo $post_id; ?>/*{display: none;}*/
        <?php
    }

    ?>
        #accordions-<?php echo $post_id; ?> {
            text-align: <?php echo $container_text_align; ?>;
            background:<?php echo $container_background_color; ?> url(<?php echo $container_background_img; ?>) repeat scroll 0 0;
            padding: <?php echo $container_padding; ?>;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head{
            background:<?php echo $header_background_color; ?> none repeat scroll 0 0;
            margin:<?php echo $header_margin; ?>;
            padding:<?php echo $header_padding; ?>;
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
        }
        #accordions-<?php echo $post_id; ?> .accordion-content{
            background:<?php echo $body_background_color; ?> none repeat scroll 0 0;
            color:<?php echo $body_color; ?>;
            font-size:<?php echo $body_font_size; ?>;
            margin:<?php echo $body_margin;?>;
            padding:<?php echo $body_padding;?>;
        }
        #accordions-<?php echo $post_id; ?> .accordion-icons{
            color:<?php echo $icon_color;?>;
            font-size:<?php echo $icon_font_size; ?>;
        }
        #accordions-<?php echo $post_id; ?> .accordions-head:hover .accordion-icons{
            color:<?php echo $icon_color_hover; ?>;
        }
        <?php

        if(!empty($accordions_custom_css)){
        echo $accordions_custom_css;
        }
        ?>
    </style>
<?php



}
