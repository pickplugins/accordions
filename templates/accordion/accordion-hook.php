<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('accordions_main', 'accordions_main_top', 5);

function accordions_main_top($atts)
{

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $post_id = str_replace('"', "", $post_id);
    $post_id = str_replace("'", "", $post_id);
    $post_id = str_replace("&#039;", "", $post_id);
    $post_id = str_replace("&quot;", "", $post_id);
    $accordions_options = get_post_meta($post_id, 'accordions_options', true);
    $accordions_options = !empty($accordions_options) ? $accordions_options : accordions_old_options($post_id);


    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';
    $lazy_load_src = isset($accordions_options['lazy_load_src']) ? $accordions_options['lazy_load_src'] : '';



    if ($lazy_load == 'yes') :
?><div id="accordions-lazy-<?php echo esc_attr($post_id); ?>" class="accordions-lazy" accordionsId="<?php echo esc_attr($post_id); ?>">
            <?php if (!empty($lazy_load_src)) : ?>
                <img src="<?php echo esc_url_raw($lazy_load_src); ?>" />
            <?php endif; ?>
        </div>

    <?php
    endif;
}



add_action('accordions_main', 'accordions_main_style', 20);

function accordions_main_style($atts)
{

    $post_id = isset($atts['id']) ? $atts['id'] : '';


    $post_id = str_replace('"', "", $post_id);
    $post_id = str_replace("'", "", $post_id);
    $post_id = str_replace("&#039;", "", $post_id);
    $post_id = str_replace("&quot;", "", $post_id);


    $accordions_options = get_post_meta($post_id, 'accordions_options', true);
    $accordions_options = !empty($accordions_options) ? $accordions_options : accordions_old_options($post_id);

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

    $header_background_color = !empty($header['background_color']) ? $header['background_color'] : '#1e73be';
    $header_active_background_color = !empty($header['active_background_color']) ? $header['active_background_color'] : '#174e7f';
    $header_color = !empty($header['color']) ? $header['color'] : '#ffffff';
    $header_color_hover = !empty($header['color_hover']) ? $header['color_hover'] : '#ffffff';
    $header_font_size = !empty($header['font_size']) ? $header['font_size'] : '16px';
    $header_padding = !empty($header['padding']) ? $header['padding'] : '';
    $header_margin = !empty($header['margin']) ? $header['margin'] : '';
    $header_font_family = !empty($header['font_family']) ? $header['font_family'] : '';


    $body = isset($accordions_options['body']) ? $accordions_options['body'] : array();
    $body_background_color = isset($body['background_color']) ? $body['background_color'] : '';
    $body_active_background_color = isset($body['active_background_color']) ? $body['active_background_color'] : '';
    $body_color = isset($body['color']) ? $body['color'] : '';
    $body_color_hover = isset($body['color_hover']) ? $body['color_hover'] : '';
    $body_font_size = isset($body['font_size']) ? $body['font_size'] : '';
    $body_padding = isset($body['padding']) ? $body['padding'] : '';
    $body_margin = isset($body['margin']) ? $body['margin'] : '';
    $body_font_family = isset($body['font_family']) ? $body['font_family'] : '';


    $container = isset($accordions_options['container']) ? $accordions_options['container'] : array();
    $container_padding = isset($container['padding']) ? $container['padding'] : '';
    $container_background_color = isset($container['background_color']) ? $container['background_color'] : '';
    $container_text_align = isset($container['text_align']) ? $container['text_align'] : '';
    $container_background_img = isset($container['background_img']) ? $container['background_img'] : '';
    $width_large = isset($container['width_large']) ? $container['width_large'] : '';
    $width_medium = isset($container['width_medium']) ? $container['width_medium'] : '';
    $width_small = isset($container['width_small']) ? $container['width_small'] : '';

    $custom_scripts = isset($accordions_options['custom_scripts']) ? $accordions_options['custom_scripts'] : array();
    $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';
    $custom_css = isset($custom_scripts['custom_css']) ? $custom_scripts['custom_css'] : '';

    $accordions_settings = get_option('accordions_settings');
    $font_aw_version = isset($accordions_settings['font_aw_version']) ? $accordions_settings['font_aw_version'] : 'v_5';


    $activeIds = [];

    global $activeIds;
    global $accordionsCss;

    wp_enqueue_style('accordions-style');

    wp_enqueue_style('jquery-ui');
    wp_enqueue_style('accordions-themes');

    if ($font_aw_version == 'v_5') {
        wp_enqueue_style('fontawesome-5');
    } elseif ($font_aw_version == 'v_4') {
        wp_enqueue_style('fontawesome-4');
    }



    wp_enqueue_script('jquery');
    wp_enqueue_script('jquery-ui-core');
    wp_enqueue_script('jquery-ui-accordion');
    wp_enqueue_script('jquery-effects-core');
    wp_enqueue_script('accordions_js');
    wp_localize_script('accordions_js', 'accordions_ajax', array('accordions_ajaxurl' => admin_url('admin-ajax.php')));

    ob_start();


    ?>
    @media only screen and (min-width: 0px) and (max-width: 767px) {
    <?php echo esc_attr('#accordions-' . $post_id); ?> {
    <?php if (!empty($width_small)) : ?>width: <?php echo esc_attr($width_small); ?>;
<?php endif; ?>
}
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
<?php echo esc_attr('#accordions-' . $post_id); ?> {
<?php if (!empty($width_medium)) : ?>width: <?php echo esc_attr($width_medium); ?>;
<?php endif; ?>
}
}
@media only screen and (min-width: 1024px) {
<?php echo esc_attr('#accordions-' . $post_id); ?> {
<?php if (!empty($width_large)) : ?>width: <?php echo esc_attr($width_large); ?>;<?php endif; ?>
}
}
<?php
    if ($lazy_load == 'yes') {
?><?php echo esc_attr('#accordions-' . $post_id . ' .accordions-lazy'); ?> {
text-align: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
<?php
    }
?><?php echo esc_attr('#accordions-' . $post_id); ?> {
position: relative;
<?php if (!empty($container_text_align)) : ?>text-align: <?php echo esc_attr($container_text_align); ?>;
<?php endif; ?><?php if (!empty($container_background_color) || !empty($container_background_img)) : ?>background: <?php echo esc_attr($container_background_color); ?> url(<?php echo esc_url_raw($container_background_img); ?>) repeat scroll 0 0;
<?php endif; ?><?php if (!empty($container_padding)) : ?>padding: <?php echo esc_attr($container_padding); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . ' .accordions-head'); ?> {
outline: none;
<?php if (!empty($header_background_color)) : ?>background: <?php echo esc_attr($header_background_color); ?> none repeat scroll 0 0;
<?php endif; ?><?php if (!empty($header_margin)) : ?>margin: <?php echo esc_attr($header_margin); ?>;
<?php endif; ?><?php if (!empty($header_padding)) : ?>padding: <?php echo esc_attr($header_padding); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . '  .accordions-head-title'); ?> {
<?php if (!empty($header_font_family)) : ?>font-family: <?php echo wp_specialchars_decode($header_font_family, ENT_QUOTES); ?>;
<?php endif; ?><?php if (!empty($header_color)) : ?>color: <?php echo esc_attr($header_color); ?>;
<?php endif; ?><?php if (!empty($header_font_size)) : ?>font-size: <?php echo esc_attr($header_font_size); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . ' .accordions-head-title-toggle'); ?> {
<?php if (!empty($header_color)) : ?>color: <?php echo esc_attr($header_color); ?>;
<?php endif; ?><?php if (!empty($header_font_size)) : ?>font-size: <?php echo esc_attr($header_font_size); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . '  .accordions-head:hover .accordions-head-title'); ?> {
<?php if (!empty($header_color_hover)) : ?>color: <?php echo esc_attr($header_color_hover); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . '  .ui-state-active'); ?> {
border: none;
<?php if (!empty($header_active_background_color)) : ?>background: <?php echo esc_attr($header_active_background_color); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . ' .accordion-content'); ?> {
border: none;
<?php if (!empty($body_font_family)) : ?>font-family: <?php echo wp_specialchars_decode($body_font_family, ENT_QUOTES); ?>;
<?php endif; ?><?php if (!empty($body_background_color)) : ?>background: <?php echo esc_attr($body_background_color); ?> none repeat scroll 0 0;
<?php endif; ?><?php if (!empty($body_color)) : ?>color: <?php echo esc_attr($body_color); ?>;
<?php endif; ?><?php if (!empty($body_font_size)) : ?>font-size: <?php echo esc_attr($body_font_size); ?>;
<?php endif; ?><?php if (!empty($body_margin)) : ?>margin: <?php echo esc_attr($body_margin); ?>;
<?php endif; ?><?php if (!empty($body_padding)) : ?>padding: <?php echo esc_attr($body_padding); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . '  .accordion-icons'); ?> {
<?php if (!empty($icon_color)) : ?>color: <?php echo esc_attr($icon_color); ?>;
<?php endif; ?><?php if (!empty($icon_font_size)) : ?>font-size: <?php echo esc_attr($icon_font_size); ?>;
<?php endif; ?><?php if (!empty($icon_background_color)) : ?>background: <?php echo esc_attr($icon_background_color); ?> none repeat scroll 0 0;
<?php endif; ?><?php if (!empty($icon_padding)) : ?>padding: <?php echo esc_attr($icon_padding); ?>;
<?php endif; ?><?php if (!empty($icon_margin)) : ?>margin: <?php echo esc_attr($icon_margin); ?>;
<?php endif; ?>
}
<?php echo esc_attr('#accordions-' . $post_id . '  .accordions-head:hover .accordion-icons span'); ?> {
<?php if (!empty($icon_color_hover)) : ?>color: <?php echo esc_attr($icon_color_hover); ?>;
<?php endif; ?>
}
<?php
    if (!empty($custom_css)) {
        echo wp_specialchars_decode($custom_css, ENT_QUOTES);
    }
    if (!empty($accordions_content)) {
        foreach ($accordions_content as $index => $accordion) {
            $background_img = isset($accordion['background_img']) ? $accordion['background_img'] : '';
            $background_color = isset($accordion['background_color']) ? $accordion['background_color'] : '';
            $header_bg_img = !empty($background_img) ? 'url(' . esc_url_raw($background_img) . ')' : '';
            $bg_color_css = !empty($background_color) ? $background_color : '';

            if (!empty($bg_color_css) || !empty($header_bg_img)) {
?><?php echo esc_attr('#accordions-' . $post_id . ' #header-' . $index); ?> {
background: <?php echo esc_attr($bg_color_css); ?> <?php echo $header_bg_img; ?>;
}
<?php
            }
        }
    }


    $accordionsCss .= ob_get_clean();
}







add_action('accordions_main', 'accordions_main_items', 30);

function accordions_main_items($atts)
{

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    //$$post_id = wp_specialchars_decode($post_id, ENT_QUOTES);
    //$post_id =  str_replace(['"',"'"], "", $post_id);
    $post_id = str_replace('"', "", $post_id);
    $post_id = str_replace("'", "", $post_id);
    $post_id = str_replace("&#039;", "", $post_id);
    $post_id = str_replace("&quot;", "", $post_id);

    $accordions_options = get_post_meta($post_id, 'accordions_options', true);


    $accordions_options = !empty($accordions_options) ? $accordions_options : accordions_old_options($post_id);
    $lazy_load = isset($accordions_options['lazy_load']) ? $accordions_options['lazy_load'] : 'yes';

    $accordions_content = isset($accordions_options['content']) ? $accordions_options['content'] : array();
    $enable_shortcode = isset($accordions_options['enable_shortcode']) ? $accordions_options['enable_shortcode'] : 'yes';
    $enable_wpautop = isset($accordions_options['enable_wpautop']) ? $accordions_options['enable_wpautop'] : 'yes';
    $enable_autoembed = isset($accordions_options['enable_autoembed']) ? $accordions_options['enable_autoembed'] : 'yes';

    $accordion = isset($accordions_options['accordion']) ? $accordions_options['accordion'] : array();
    $collapsible = !empty($accordion['collapsible']) ? $accordion['collapsible'] : 'true';
    $height_style = isset($accordion['height_style']) ? $accordion['height_style'] : 'content';
    $active_event = !empty($accordion['active_event']) ? $accordion['active_event'] : 'click';
    $expanded_other = !empty($accordion['expanded_other']) ? $accordion['expanded_other'] : 'no';
    $animate_style = !empty($accordion['animate_style']) ? $accordion['animate_style'] : 'swing';
    $animate_delay = !empty($accordion['animate_delay']) ? $accordion['animate_delay'] : 1000;

    $header = isset($accordions_options['header']) ? $accordions_options['header'] : array();
    $header_class = isset($header['class']) ? $header['class'] : '';

    $body = isset($accordions_options['body']) ? $accordions_options['body'] : array();
    $body_class = isset($body['class']) ? $body['class'] : '';


    $icon = isset($accordions_options['icon']) ? $accordions_options['icon'] : array();
    $icon_active = !empty($icon['active']) ? $icon['active'] : '<i class="fas fa-chevron-up"></i>';
    $icon_inactive = !empty($icon['inactive']) ? $icon['inactive'] : '<i class="fas fa-chevron-right"></i>';
    $icon_position = !empty($icon['position']) ? $icon['position'] : 'left';

    $active_plugins = get_option('active_plugins');
    $accordions_plugin_info = get_option('accordions_plugin_info');
    $accordions_upgrade = isset($accordions_plugin_info['accordions_upgrade']) ? $accordions_plugin_info['accordions_upgrade'] : '';


    $activeHead = [];

    if (isset($_GET['active_index'])) {
        $accordion_index = isset($_GET['active_index']) ? sanitize_text_field($_GET['active_index']) : '';
        $accordion_index = explode('-', $accordion_index);

        foreach ($accordion_index as $args) {
            $args_arr = explode('|', $args);
            $accordion_id = isset($args_arr[0]) ? $args_arr[0] : '';
            $accordion_indexes = isset($args_arr[1]) ? $args_arr[1] : '';
            $active_index = !empty($accordion_indexes) ? explode(',', $accordion_indexes) : array();

            $activeHead[$accordion_id] = $active_index;
        }
    }






    $active_index = array();
?>
<div class="items" <?php

                    if ($lazy_load == 'yes') :
                    ?> style="display:none" <?php
                                        endif;

                                            ?>>
    <?php

    if (!empty($accordions_content)) :

        $item_count = 0;

        foreach ($accordions_content as $index => $accordion) {

            $accordion_hide = isset($accordion['hide']) ? $accordion['hide'] : '';

            if ($accordion_hide == 'true') continue;


            $accordion_header = isset($accordion['header']) ? $accordion['header'] : '';
            $accordion_body = isset($accordion['body']) ? $accordion['body'] : '';
            $accordion_disable = isset($accordion['disable']) ? $accordion['disable'] : 'false';

            $accordion_is_active = isset($accordion['is_active']) ? $accordion['is_active'] : '';
            $toggled_text = isset($accordion['toggled_text']) ? $accordion['toggled_text'] : '';
            $active_icon = !empty($accordion['active_icon']) ? $accordion['active_icon'] : $icon_active;
            $inactive_icon = !empty($accordion['inactive_icon']) ? $accordion['inactive_icon'] : $icon_inactive;


            $active_icon = wp_specialchars_decode($active_icon, ENT_QUOTES);
            $inactive_icon = wp_specialchars_decode($inactive_icon, ENT_QUOTES);


            $accordion_header = apply_filters('accordions_item_header', $accordion_header, $post_id);
            $accordion_header = wp_specialchars_decode($accordion_header, ENT_QUOTES);
            $accordion_header = do_shortcode($accordion_header);

            if (($accordion_is_active == 'yes')) {
                //$active_index[$item_count] = $item_count;

                $active_index = array_merge($active_index, [$item_count]);
            }



            if (!in_array('accordions-pro/accordions-pro.php', (array) $active_plugins)) {
                if (has_shortcode($accordion_body, 'accordions') || has_shortcode($accordion_body, 'accordions_pickplguins') || has_shortcode($accordion_body, 'accordions_pplugins')) {
                    $accordion_body = str_replace('[accordions', '**<a target="_blank" href="https://pickplugins.com/accordions/"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordion_body);
                    $accordion_body = str_replace('[accordions_pickplguins', '**<a target="_blank" href="https://pickplugins.com/accordions/"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordion_body);
                    $accordion_body = str_replace('[accordions_pplugins', '**<a target="_blank" href="https://pickplugins.com/accordions/"> <strong>Please buy pro to create nested accordion</strong></a>**', $accordion_body);
                }
            }

            $accordion_body = apply_filters('accordions_item_body', $accordion_body, $post_id);
            $accordion_body = wp_specialchars_decode($accordion_body, ENT_QUOTES);

            if ($enable_autoembed == 'yes') {
                $WP_Embed = new WP_Embed();
                $accordion_body = $WP_Embed->autoembed($accordion_body);
            }

            if ($enable_wpautop == 'yes') {
                $accordion_body = wpautop($accordion_body);
            }

            if ($enable_shortcode == 'yes') {
                $accordion_body = do_shortcode($accordion_body);
            }



    ?>

            <div post_id="<?php echo esc_attr($post_id); ?>" itemcount="<?php echo esc_attr($item_count); ?>" <?php echo ($accordion_disable == 'true') ? esc_attr('disabled=disabled') : ''; ?> header_id="header-<?php echo esc_attr($index); ?>" id="header-<?php echo esc_attr($index); ?>" style="" class="accordions-head head<?php echo esc_attr($index); ?> <?php echo esc_attr($header_class); ?>" toggle-text="<?php echo esc_attr(do_shortcode($toggled_text)); ?>" main-text="<?php echo esc_attr($accordion_header); ?>">
                <?php
                if ($icon_position == 'left') :
                ?>
                    <span id="accordion-icons-<?php echo esc_attr($index); ?>" class="accordion-icons">
                        <span class="accordion-icon-active accordion-plus"><?php echo  wp_kses_post($active_icon); ?></span>
                        <span class="accordion-icon-inactive accordion-minus"><?php echo wp_kses_post($inactive_icon); ?></span>
                    </span>
                    <span id="header-text-<?php echo esc_attr($index); ?>" class="accordions-head-title"><?php echo wp_kses_post($accordion_header); ?></span>
                <?php
                elseif ($icon_position == 'right') :
                ?>
                    <span id="header-text-<?php echo esc_attr($index); ?>" class="accordions-head-title"><?php echo wp_kses_post($accordion_header); ?></span>
                    <span id="accordion-icons-<?php echo esc_attr($index); ?>" class="accordion-icons">
                        <span class="accordion-icon-active accordion-plus"><?php echo wp_kses_post($active_icon); ?></span>
                        <span class="accordion-icon-inactive accordion-minus"><?php echo wp_kses_post($inactive_icon); ?></span>
                    </span>
                <?php
                else :
                ?>
                    <span id="header-text-<?php echo esc_attr($index); ?>" class="accordions-head-title"><?php echo wp_kses_post($accordion_header); ?></span>
                <?php
                endif;
                ?>
            </div>
            <div class="accordion-content content<?php echo esc_attr($index); ?> <?php echo esc_attr($body_class); ?>">
                <?php

                $allowed = wp_kses_allowed_html('post');
                global $allowedposttags, $allowedtags, $allowedentitynames;

                echo ($accordion_body); ?>
            </div>
    <?php
            $item_count++;
        }
    else :

        do_action('accordions_main_no_content', $post_id);
    endif;
    ?>
</div>


<?php
    global $accordionsActiveIndex;

    if (isset($_GET['active_index'])) {

        $accordion_index = isset($_GET['active_index']) ? ($_GET['active_index']) : '';

        $activeIds = [];

        $accordion_index = explode('-', $accordion_index);

        foreach ($accordion_index as $args) {
            $args_arr = explode('|', $args);
            $accordion_id = isset($args_arr[0]) ? $args_arr[0] : '';
            $accordion_indexes = isset($args_arr[1]) ? $args_arr[1] : '';
            $active_index = !empty($accordion_indexes) ? explode(',', $accordion_indexes) : array();
            $active_index_new = array();
            foreach ($active_index as $ind) {
                $active_index_new[] = (int)$ind;
            }

            $accordionsActiveIndex[$accordion_id] = $active_index_new;
        }
    } else {


        $accordionsActiveIndex[$post_id] = $active_index;
    }



    $enable_schema = isset($accordions_options['enable_schema']) ? $accordions_options['enable_schema'] : 'yes';

    if ($enable_schema == 'no') return;

    global $accordionsSchema;




    $i = 1;
    foreach ($accordions_content as $index => $accordion) {
        $accordion_hide = isset($accordion['hide']) ? $accordion['hide'] : '';
        $accordion_hide_schema = isset($accordion['hide_schema']) ? $accordion['hide_schema'] : '';

        if ($accordion_hide_schema == 'true') {
            $i++;
            continue;
        }

        $accordion_header = isset($accordion['header']) ? wp_strip_all_tags(strip_shortcodes($accordion['header'])) : '';
        $accordion_header = esc_attr($accordion_header);

        //$accordion_body = isset($accordion['body']) ? wp_strip_all_tags(strip_shortcodes($accordion['body'])) : '';

        $accordion_body = isset($accordion['body']) ? do_shortcode($accordion['body']) : '';
        $accordion_body = wp_unslash(wp_specialchars_decode($accordion_body, ENT_QUOTES));
        $accordion_body = str_replace(array("\n", "\r"), '', $accordion_body);


        $accordionsSchema[$post_id][$i]['@type'] = "Question";
        $accordionsSchema[$post_id][$i]['name'] = $accordion_header;
        $accordionsSchema[$post_id][$i]['acceptedAnswer']['@type'] = "Answer";
        //$accordionsSchema[$post_id][$i]['acceptedAnswer']['text'] = wp_unslash(_wp_specialchars($accordion_body, ENT_QUOTES));

        $accordionsSchema[$post_id][$i]['acceptedAnswer']['text'] = $accordion_body;




        $i++;
    }
}


add_action('accordions_main', 'accordions_main_edit_link', 35);

function accordions_main_edit_link($atts)
{

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $post_id = str_replace('"', "", $post_id);
    $post_id = str_replace("'", "", $post_id);
    $post_id = str_replace("&#039;", "", $post_id);
    $post_id = str_replace("&quot;", "", $post_id);
    $accordions_options = get_post_meta($post_id, 'accordions_options', true);
    $accordions_options = !empty($accordions_options) ? $accordions_options : accordions_old_options($post_id);


    $hide_edit = isset($accordions_options['hide_edit']) ? $accordions_options['hide_edit'] : 'yes';

    if ($hide_edit == 'yes') return;


    $edit_link_access_role = isset($accordions_options['edit_link_access_role']) ? $accordions_options['edit_link_access_role'] : array('administrator');



    $user = wp_get_current_user();
    $user_roles = !empty($user->roles) ? $user->roles : array();



    if (!empty($edit_link_access_role))
        foreach ($edit_link_access_role as $role) :

            if (in_array($role, $user_roles)) {
                $admin_url = admin_url();
                $accordion_edit_url = apply_filters('accordions_edit_url', '' . $admin_url . 'post.php?post=' . $post_id . '&action=edit', $post_id);

?>
        <div class="accordion-edit"><a href="<?php echo esc_url_raw($accordion_edit_url); ?>"><?php echo __('Edit this accordion', 'accordions'); ?></a>, <?php echo __("Only admin can see this.", 'accordions') ?></div>
<?php

                return;
            } else {
                continue;
            }

        endforeach;
}







add_action('accordions_main', 'accordions_main_scripts', 40);

function accordions_main_scripts($atts)
{

    $post_id = isset($atts['id']) ? $atts['id'] : '';
    $post_id = str_replace('"', "", $post_id);
    $post_id = str_replace("'", "", $post_id);
    $post_id = str_replace("&#039;", "", $post_id);
    $post_id = str_replace("&quot;", "", $post_id);
    $accordions_options = get_post_meta($post_id, 'accordions_options', true);
    $accordions_options = !empty($accordions_options) ? $accordions_options : accordions_old_options($post_id);

    $accordion = isset($accordions_options['accordion']) ? $accordions_options['accordion'] : array();
    $collapsible = !empty($accordion['collapsible']) ? $accordion['collapsible'] : 'true';
    $height_style = isset($accordion['height_style']) ? $accordion['height_style'] : 'content';
    $active_event = !empty($accordion['active_event']) ? $accordion['active_event'] : 'click';
    $expanded_other = !empty($accordion['expanded_other']) ? $accordion['expanded_other'] : 'no';

    $animate_style = !empty($accordion['animate_style']) ? $accordion['animate_style'] : 'swing';
    $animate_delay = !empty($accordion['animate_delay']) ? $accordion['animate_delay'] : 1000;

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

    $custom_scripts = isset($accordions_options['custom_scripts']) ? $accordions_options['custom_scripts'] : array();
    $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';

?>

<?php

    if (!empty($custom_js)) :
        global $accordionsCustomScripts;

        $accordionsCustomScripts .= wp_unslash(wp_specialchars_decode($custom_js, ENT_QUOTES));
    endif;
}





add_action('accordions_main_no_content', 'accordions_main_no_content', 50);
function accordions_main_no_content()
{

?>
<p><?php echo __('Content missing', ''); ?></p>
<?php
}
