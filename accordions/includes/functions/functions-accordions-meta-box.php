<?php

/*
* @Author 		PickPlugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access




add_action('settings_tabs_content_shortcode', 'settings_tabs_content_shortcode',10, 2);

function settings_tabs_content_shortcode($tab,$post_id){

    $settings_tabs_field = new settings_tabs_field();



    ?>
    <div class="section">
        <div class="section-title">Shortcodes</div>
        <p class="description section-description">Simply copy these shortcode and user under content</p>


        <?php


        ob_start();

        ?>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions id='<?php echo $post_id;  ?>']"> <span class="copied">Copied</span>
            <p class="description">You can use this shortcode under post content</p>
        </div>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_pplugins id='<?php echo $post_id;  ?>']"> <span class="copied">Copied</span>
            <p class="description">To avoid conflict with 3rd party shortcode also used same <code>[accordions]</code>You can use this shortcode under post content</p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
            <p class="description">PHP Code, you can use under theme .php files.</p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_pplugins id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
            <p class="description">To avoid conflict, PHP code you can use under theme .php files.</p>
        </div>



        <?php

        $html = ob_get_clean();

        $args = array(
            'id'		=> 'accordions_shortcodes',
            'title'		=> __('Accordion Shortcode','accordions'),
            'details'	=> '',
            'type'		=> 'custom_html',
            'html'		=> $html,


        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php


        ob_start();

        ?>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_tabs id='<?php echo $post_id;  ?>']"> <span class="copied">Copied</span>
            <p class="description">You can use this shortcode under post content</p>
        </div>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_tabs_pplugins id='<?php echo $post_id;  ?>']"> <span class="copied">Copied</span>
            <p class="description">To avoid conflict with 3rd party shortcode also used same <code>[accordions_tabs]</code>You can use this shortcode under post content</p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_tabs id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
            <p class="description">PHP Code, you can use under theme .php files.</p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_tabs_pplugins id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
            <p class="description">To avoid conflict, PHP code you can use under theme .php files.</p>
        </div>



        <style type="text/css">
            .copy-to-clipboard{}
            .copy-to-clipboard .copied{
                display: none;
                background: #e5e5e5;
                padding: 4px 10px;
                line-height: normal;
            }
        </style>

        <script>
            jQuery(document).ready(function($){


                $(document).on('click', '.copy-to-clipboard input, .copy-to-clipboard textarea', function () {

                    $(this).focus();
                    $(this).select();
                    document.execCommand('copy');

                    $(this).parent().children('.copied').fadeIn().fadeOut(2000);
                })

            })


        </script>




        <?php

        $html = ob_get_clean();

        $args = array(
            'id'		=> 'accordions_shortcodes',
            'title'		=> __('Tabs Shortcodes','accordions'),
            'details'	=> '',
            'type'		=> 'custom_html',
            'html'		=> $html,


        );

        $settings_tabs_field->generate_field($args);
        ?>










    </div>
    <?php
}




add_action('settings_tabs_content_options', 'settings_tabs_content_options', 10, 2);

function settings_tabs_content_options($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();

    $accordions_child           = get_post_meta( $post_id, 'accordions_child', true );
    $enable_search              = get_post_meta( $post_id, 'enable_search', true );
    $accordions_collapsible     = get_post_meta( $post_id, 'accordions_collapsible', true );
    $accordions_expaned_other   = get_post_meta( $post_id, 'accordions_expaned_other', true );
    $accordions_heightStyle     = get_post_meta( $post_id, 'accordions_heightStyle', true );
    $accordions_click_scroll_top = get_post_meta( $post_id, 'accordions_click_scroll_top', true );
    $accordions_click_scroll_top_offset = get_post_meta( $post_id, 'accordions_click_scroll_top_offset', true );
    $accordions_header_toggle   = get_post_meta( $post_id, 'accordions_header_toggle', true );
    $accordions_active_event    = get_post_meta( $post_id, 'accordions_active_event', true );
    $accordions_lazy_load       = get_post_meta( $post_id, 'accordions_lazy_load', true );
    $accordions_lazy_load_src   = get_post_meta( $post_id, 'accordions_lazy_load_src', true );

    $accordions_animate_style   = get_post_meta( $post_id, 'accordions_animate_style', true );
    $accordions_animate_delay   = get_post_meta( $post_id, 'accordions_animate_delay', true );
    $accordions_hide_edit       = get_post_meta( $post_id, 'accordions_hide_edit', true );
    $accordions_expand_collapse_display = get_post_meta( $post_id, 'accordions_expand_collapse_display', true );
    $accordions_tabs_active_event = get_post_meta( $post_id, 'accordions_tabs_active_event', true );
    $accordions_tabs_collapsible = get_post_meta( $post_id, 'accordions_tabs_collapsible', true );
    $accordions_tabs_vertical   = get_post_meta( $post_id, 'accordions_tabs_vertical', true );
    $accordions_tabs_vertical_width_ratio = get_post_meta( $post_id, 'accordions_tabs_vertical_width_ratio', true );
    $accordions_tabs_icon_toggle = get_post_meta( $post_id, 'accordions_tabs_icon_toggle', true );

    $accordions_width           = get_post_meta( $post_id, 'accordions_width', true );

    $accordions_width_large     = !empty($accordions_width['large']) ? $accordions_width['large'] : '100%';
    $accordions_width_medium    = !empty($accordions_width['medium']) ? $accordions_width['medium'] : '100%';
    $accordions_width_small     = !empty($accordions_width['small']) ? $accordions_width['small'] : '100%';

    //var_dump($accordions_width_large);

    ?>

    <div class="section">
        <div class="section-title">Accordion Settings</div>
        <p class="description section-description">Some general setting for accordion</p>


        <?php
        ob_start();
        ?>
        <div class="accordion_width">
            <input type="text" placeholder="400px" name="accordions_width[large]" value="<?php echo $accordions_width_large; ?>">
            <p class="description">Accordion width in large screen, larger than 1200px</p>

            <input type="text" placeholder="80%" name="accordions_width[medium]" value="<?php echo $accordions_width_medium; ?>">
            <p class="description">Accordion width in medium screen, min 768px & max 1199px</p>

            <input type="text" placeholder="100%" name="accordions_width[small]" value="<?php echo $accordions_width_small; ?>">
            <p class="description">Accordion width in small screen, min 0px & max 767px</p>
        </div>
        <?php
        $html = ob_get_clean();
        $args = array(
            'id'		=> 'accordion_width',
            'title'		=> __('Accordion width','accordions'),
            'details'	=> '',
            'type'		=> 'custom_html',
            'html'		=> $html,
        );

        $settings_tabs_field->generate_field($args);














        $args = array(
            'id'		=> 'accordions_child',
            'title'		=> __('Use for child','accordions'),
            'details'	=> __('You can use this accordion as child to other accordion, check this option \'Yes\' and paste the short-code to another accordion inside content.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_child,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'enable_search',
            'title'		=> __('Enable search','accordions'),
            'details'	=> __('Display search input field.','accordions'),
            'type'		=> 'select',
            'value'		=> $enable_search,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>








        <?php
        $args = array(
            'id'		=> 'accordions_collapsible',
            'title'		=> __('Collapsible','accordions'),
            'details'	=> __('Make accordion collapsible.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_collapsible,
            'args'		=> array(
                'true'	=> __('True','accordions'),
                'false'	=> __('False','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_expaned_other',
            'title'		=> __('Keep expanded others','accordions'),
            'details'	=> __('This is useful when use collapsible.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_expaned_other,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_heightStyle',
            'title'		=> __('Content height style','accordions'),
            'details'	=> __('accordion content style.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_heightStyle,
            'args'		=> array(

                'content'	=> __('Content','accordions'),
                'fill'	=> __('Fill','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_click_scroll_top',
            'title'		=> __('Click header to scroll top','accordions'),
            'details'	=> __('When click on accordion header it will automatically scroll top','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_click_scroll_top,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_click_scroll_top_offset',
            'title'		=> __('Offset from top when scroll top enabled','accordions'),
            'details'	=> __('Offset Value: add some value to fix the top position, ex: 120, or -120','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_click_scroll_top_offset,
            'placeholder' => __('120','accordions'),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_header_toggle',
            'title'		=> __('Enable header text toggle','accordions'),
            'details'	=> __('When user click on header text will toggled','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_header_toggle,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_active_event',
            'title'		=> __('Activate event','accordions'),
            'details'	=> __('Activate event type for header.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_active_event,
            'args'		=> array(
                'click'	=> __('Click','accordions'),
                'mouseover'	=> __('Mouseover','accordions'),
                'focus'	=> __('Focus','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_lazy_load',
            'title'		=> __('Enable lazy load','accordions'),
            'details'	=> __('Accordion content will be hidden until page load completed.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_lazy_load,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_lazy_load_src',
            'title'		=> __('Lazy load image source','accordions'),
            'details'	=> __('You can set custom image source for lazy load icon.','accordions'),
            'type'		=> 'text',
            'placeholder' => 'http://domain.com/url-of-image-source.png',
            'value'		=> $accordions_lazy_load_src,
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_animate_style',
            'title'		=> __('Animation style','accordions'),
            'details'	=> __('Animation style for accordion','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_animate_style,
            'args'		=> array(
                'linear'	=> __('linear','accordions'),
                'swing'	=> __('swing','accordions'),
                'easeInQuad'	=> __('easeInQuad','accordions'),
                'easeOutQuad'	=> __('easeOutQuad','accordions'),
                'easeInOutQuad'	=> __('easeInOutQuad','accordions'),
                'easeInCubic'	=> __('easeInCubic','accordions'),
                'easeOutCubic'	=> __('easeOutCubic','accordions'),
                'easeInOutCubic'	=> __('easeInOutCubic','accordions'),
                'easeInQuart'	=> __('easeInQuart','accordions'),
                'easeOutQuart'	=> __('easeOutQuart','accordions'),
                'easeInOutQuart'	=> __('easeInOutQuart','accordions'),
                'easeInQuint'	=> __('easeInQuint','accordions'),
                'easeOutQuint'	=> __('easeOutQuint','accordions'),
                'easeInOutQuint'	=> __('easeInOutQuint','accordions'),
                'easeInExpo'	=> __('easeInExpo','accordions'),
                'easeOutExpo'	=> __('easeOutExpo','accordions'),
                'easeInOutExpo'	=> __('easeInOutExpo','accordions'),
                'easeInSine'	=> __('easeInSine','accordions'),
                'easeOutSine'	=> __('easeOutSine','accordions'),
                'easeInOutSine'	=> __('easeInOutSine','accordions'),
                'easeInCirc'	=> __('easeInCirc','accordions'),
                'easeOutCirc'	=> __('easeOutCirc','accordions'),
                'easeInOutCirc'	=> __('easeInOutCirc','accordions'),

                'easeInElastic'	=> __('easeInElastic','accordions'),
                'easeOutElastic'	=> __('easeOutElastic','accordions'),
                'easeInOutElastic'	=> __('easeInOutElastic','accordions'),
                'easeInBack'	=> __('easeInBack','accordions'),
                'easeOutBack'	=> __('easeOutBack','accordions'),
                'easeInOutBack'	=> __('easeInOutBack','accordions'),
                'easeInBounce'	=> __('easeInBounce','accordions'),
                'easeOutBounce'	=> __('easeOutBounce','accordions'),
                'easeInOutBounce'	=> __('easeInOutBounce','accordions'),


            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_animate_delay',
            'title'		=> __('Animation delay','accordions'),
            'details'	=> __('Animation delay time in millisecond.','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_animate_delay,
            'placeholder' => __('500','accordions'),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_hide_edit',
            'title'		=> __('Hide edit link on front-end.','accordions'),
            'details'	=> __('You can display/hide accordion edit link on front-end','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_hide_edit,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_expand_collapse_display',
            'title'		=> __('Display expand/collapse all button.','accordions'),
            'details'	=> __('This is useful to expand/collapse al together.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_expand_collapse_display,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);






















        ?>








    </div>

    <div class="section">
        <div class="section-title">Tabs Settings</div>
        <p class="description section-description">Settings for tabs</p>


        <?php
        $args = array(
            'id'		=> 'accordions_tabs_collapsible',
            'title'		=> __('Collapsible','accordions'),
            'details'	=> __('Make tabs collapsible.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_tabs_collapsible,
            'args'		=> array(
                'true'	=> __('True','accordions'),
                'false'	=> __('False','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_tabs_active_event',
            'title'		=> __('Activate event','accordions'),
            'details'	=> __('Event for activate tabs','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_tabs_active_event,
            'args'		=> array(
                'click'	=> __('Click','accordions'),
                'mouseover'	=> __('Mouseover','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>



        <?php
        $args = array(
            'id'		=> 'accordions_tabs_vertical',
            'title'		=> __('Vertical tabs','accordions'),
            'details'	=> __('To display vertical tabs.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_tabs_vertical,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_tabs_vertical_width_ratio',
            'title'		=> __('Vertical tabs nav width ratio','accordions'),
            'details'	=> __('Width ratio between nav and content.','accordions'),
            'type'		=> 'range',
            'value'		=> $accordions_tabs_vertical_width_ratio,
            'default'		=> '30',

        );

        $settings_tabs_field->generate_field($args);
        ?>








        <?php
        $args = array(
            'id'		=> 'accordions_tabs_icon_toggle',
            'title'		=> __('Header icon toggle','accordions'),
            'details'	=> __('Enable toggling icons','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_tabs_icon_toggle,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>






    </div>








    <?php


}










add_action('settings_tabs_content_style', 'settings_tabs_content_style', 10, 2);

function settings_tabs_content_style($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();

    $accordions_themes = get_post_meta( $post_id, 'accordions_themes', true );
    $accordions_icons_plus = get_post_meta( $post_id, 'accordions_icons_plus', true );
    $accordions_icons_minus = get_post_meta( $post_id, 'accordions_icons_minus', true );
    $accordions_icons_color = get_post_meta( $post_id, 'accordions_icons_color', true );
    $accordions_icons_color_hover = get_post_meta( $post_id, 'accordions_icons_color_hover', true );
    $accordions_icons_bg_color = get_post_meta( $post_id, 'accordions_icons_bg_color', true );
    $accordions_icons_font_size = get_post_meta( $post_id, 'accordions_icons_font_size', true );
    $accordions_icons_padding = get_post_meta( $post_id, 'accordions_icons_padding', true );
    $accordions_icons_position = get_post_meta( $post_id, 'accordions_icons_position', true );
    $accordions_default_bg_color = get_post_meta( $post_id, 'accordions_default_bg_color', true );
    $accordions_header_bg_opacity = get_post_meta( $post_id, 'accordions_header_bg_opacity', true );
    $accordions_active_bg_color = get_post_meta( $post_id, 'accordions_active_bg_color', true );
    $accordions_items_title_color = get_post_meta( $post_id, 'accordions_items_title_color', true );
    $accordions_items_title_color_hover = get_post_meta( $post_id, 'accordions_items_title_color_hover', true );
    $accordions_items_title_font_family = get_post_meta( $post_id, 'accordions_items_title_font_family', true );
    $accordions_items_title_font_size = get_post_meta( $post_id, 'accordions_items_title_font_size', true );
    $accordions_items_title_padding = get_post_meta( $post_id, 'accordions_items_title_padding', true );
    $accordions_items_title_margin = get_post_meta( $post_id, 'accordions_items_title_margin', true );
    $accordions_items_content_color = get_post_meta( $post_id, 'accordions_items_content_color', true );
    $accordions_items_content_font_family = get_post_meta( $post_id, 'accordions_items_content_font_family', true );
    $accordions_items_content_font_size = get_post_meta( $post_id, 'accordions_items_content_font_size', true );
    $accordions_items_content_bg_color = get_post_meta( $post_id, 'accordions_items_content_bg_color', true );
    $accordions_items_content_bg_opacity = get_post_meta( $post_id, 'accordions_items_content_bg_opacity', true );
    $accordions_items_content_padding = get_post_meta( $post_id, 'accordions_items_content_padding', true );
    $accordions_items_content_margin = get_post_meta( $post_id, 'accordions_items_content_margin', true );
    $accordions_container_padding = get_post_meta( $post_id, 'accordions_container_padding', true );
    $accordions_container_bg_color = get_post_meta( $post_id, 'accordions_container_bg_color', true );
    $accordions_bg_img = get_post_meta( $post_id, 'accordions_bg_img', true );
    $accordions_container_text_align = get_post_meta( $post_id, 'accordions_container_text_align', true );


    ?>

    <div class="section">
        <div class="section-title">Accordion Style Settings</div>
        <p class="description section-description">You can style accordion here.</p>


        <?php
        $class_accordions_functions = new class_accordions_functions();
        $accordions_themes_list = $class_accordions_functions->accordions_themes();




        $args = array(
            'id'		=> 'accordions_themes',
            'title'		=> __('Accordion themes','accordions'),
            'details'	=> __('You can choose accordion theme here.','accordions'),
            'type'		=> 'radio_image',
            'value'		=> $accordions_themes,
            'default'		=> 'flat',
            'args'		=> $accordions_themes_list,
        );

        $settings_tabs_field->generate_field($args);
        ?>
    </div>



    <div class="section">
        <div class="section-title">Accordion Icons</div>
        <p class="description section-description">Customize accordion icons.</p>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_plus',
            'title'		=> __('Plus icon','accordions'),
            'details'	=> __('Icon for idle, you can use <a target="_blank" href="https://fontawesome.com/icons">Font Awesome</a> icons, just put the css class <code>fas fa-chevron-up</code>','accordions'),
            'type'		=> 'text_icon',
            'value'		=> $accordions_icons_plus,
            'default'		=> 'fas fa-chevron-up',
            'placeholder' => __('fas fa-chevron-up','accordions'),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_minus',
            'title'		=> __('Minus icon','accordions'),
            'details'	=> __('Icon for activate, you can use <a target="_blank" href="https://fontawesome.com/icons">Font Awesome</a> icons, just put the css class <code>fas fa-chevron-down</code>','accordions'),
            'type'		=> 'text_icon',
            'value'		=> $accordions_icons_minus,
            'default'		=> 'fas fa-chevron-down',
            'placeholder' => __('fas fa-chevron-down','accordions'),
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_color',
            'title'		=> __('Icons color','accordions'),
            'details'	=> __('Color for icons','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_icons_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_color_hover',
            'title'		=> __('Icon hover color','accordions'),
            'details'	=> __('Color for icons on mousehover','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_icons_color_hover,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_icons_bg_color',
            'title'		=> __('Icons background color','accordions'),
            'details'	=> __('Background color for icons','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_icons_bg_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_font_size',
            'title'		=> __('Icon font size','accordions'),
            'details'	=> __('You can set custom font size.','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_icons_font_size,
            'placeholder' => '16px',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_icons_padding',
            'title'		=> __('Icon padding','accordions'),
            'details'	=> __('You can set custom padding size.','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_icons_padding,
            'placeholder' => '5px',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_position',
            'title'		=> __('Icon position.','accordions'),
            'details'	=> __('You can display icon at left or right on header text.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_icons_position,
            'args'		=> array(
                'left'	=> __('Left','accordions'),
                'right'	=> __('Right','accordions'),
                'none'	=> __('None','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>


    </div>


    <div class="section">
        <div class="section-title">Accordion Header Style</div>
        <p class="description section-description">Customize accordion header.</p>




        <?php
        $args = array(
            'id'		=> 'accordions_default_bg_color',
            'title'		=> __('Default background color.','accordions'),
            'details'	=> __('Background color of header on idle','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_default_bg_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_header_bg_opacity',
            'title'		=> __('Background color opacity.','accordions'),
            'details'	=> __('You can set opacity for background color','accordions'),
            'type'		=> 'range',
            'default'		=> '1',
            'value'		=> $accordions_header_bg_opacity,
            'args'		=> array(
                'min'	=> 0,
                'max'	=> 1,
                'step'	=> 0.1,

            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>



        <?php
        $args = array(
            'id'		=> 'accordions_active_bg_color',
            'title'		=> __('Active background color.','accordions'),
            'details'	=> __('Background color of header on active stats','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_active_bg_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_title_color',
            'title'		=> __('Accordions header font color.','accordions'),
            'details'	=> __('Font color for accordion headers','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_items_title_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_title_color_hover',
            'title'		=> __('Accordions header font color on hover.','accordions'),
            'details'	=> __('Font color for accordion headers','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_items_title_color_hover,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_font_family',
            'title'		=> __('Accordions header font family.','accordions'),
            'details'	=> __('Choose font family for header text','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_title_font_family,
            'placeholder' => 'Open Sans',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_font_size',
            'title'		=> __('Accordions header font size.','accordions'),
            'details'	=> __('Choose font size for header text','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_title_font_size,
            'placeholder' => '15px',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_padding',
            'title'		=> __('Accordions header padding.','accordions'),
            'details'	=> __('Choose header area padding','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_title_padding,
            'placeholder' => '10px',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_margin',
            'title'		=> __('Accordions header margin.','accordions'),
            'details'	=> __('Choose header area margin','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_title_margin,
            'placeholder' => '10px',
        );

        $settings_tabs_field->generate_field($args);
        ?>




    </div>


    <div class="section">
        <div class="section-title">Accordions Content Style</div>
        <p class="description section-description">Customize accordion content.</p>




        <?php
        $args = array(
            'id'		=> 'accordions_items_content_color',
            'title'		=> __('Accordions content font color.','accordions'),
            'details'	=> __('You can choose custom color for accordion content','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_items_content_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_content_font_family',
            'title'		=> __('Accordions content font family.','accordions'),
            'details'	=> __('You can set custom font family for accordion content','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_content_font_family,
            'placeholder' => 'Open Sans',
        );

        $settings_tabs_field->generate_field($args);
        ?>



        <?php
        $args = array(
            'id'		=> 'accordions_items_content_font_size',
            'title'		=> __('Accordions content font size.','accordions'),
            'details'	=> __('You can set custom font size for accordion content','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_content_font_size,
            'placeholder' => '14px',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_content_bg_color',
            'title'		=> __('Accordions content background color.','accordions'),
            'details'	=> __('You can choose custom background color for accordion content area','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_items_content_bg_color,
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_content_bg_opacity',
            'title'		=> __('Accordions content background color opacity.','accordions'),
            'details'	=> __('You can set custom background color opacity for accordion content area','accordions'),
            'type'		=> 'range',
            'default'		=> '1',
            'value'		=> $accordions_items_content_bg_opacity,
            'args'		=> array(
                'min'	=> 0,
                'max'	=> 1,
                'step'	=> 0.1,

            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>
        <?php
        $args = array(
            'id'		=> 'accordions_items_content_padding',
            'title'		=> __('Accordions content padding.','accordions'),
            'details'	=> __('You can set custom padding for accordion content','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_content_padding,
            'placeholder' => '10px',
        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_content_margin',
            'title'		=> __('Accordions content margin.','accordions'),
            'details'	=> __('You can set custom margin for accordion content','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_items_content_margin,
            'placeholder' => '10px',
        );

        $settings_tabs_field->generate_field($args);
        ?>













    </div>


    <div class="section">
        <div class="section-title">Accordion Container Style</div>
        <p class="description section-description">Customize accordion container settings.</p>

        <?php
        $args = array(
            'id'		=> 'accordions_container_padding',
            'title'		=> __('Container padding.','accordions'),
            'details'	=> __('Set container padding','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_container_padding,
            'placeholder' => '10px',

        );

        $settings_tabs_field->generate_field($args);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_container_bg_color',
            'title'		=> __('Container background color.','accordions'),
            'details'	=> __('Set container background color','accordions'),
            'type'		=> 'colorpicker',
            'value'		=> $accordions_container_bg_color,
            'placeholder' => '',

        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_container_text_align',
            'title'		=> __('Container text align.','accordions'),
            'details'	=> __('Set container text align','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_container_text_align,
            'args'		=> array(
                'left'	=> __('Left','accordions'),
                'right'	=> __('Right','accordions'),
                'center'	=> __('Center','accordions'),
                'justify'	=> __('Justify','accordions'),

            ),

        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_bg_img',
            'title'		=> __('Container background image.','accordions'),
            'details'	=> __('Set container background image','accordions'),
            'type'		=> 'text',
            'value'		=> $accordions_bg_img,
            'placeholder' => 'http://domain.com/url-of-image-source.png',

        );

        $settings_tabs_field->generate_field($args);
        ?>




    </div>












    <?php

}



add_action('settings_tabs_content_content', 'settings_tabs_content_content', 10, 2);

function settings_tabs_content_content($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();

    $accordions_content_title = get_post_meta($post_id,'accordions_content_title', true);
    $accordions_content_body = get_post_meta($post_id,'accordions_content_body', true);
    $accordions_content_title_toggled = get_post_meta($post_id,'accordions_content_title_toggled', true);
    $accordions_section_icon_plus = get_post_meta($post_id,'accordions_section_icon_plus', true);
    $accordions_section_icon_minus = get_post_meta($post_id,'accordions_section_icon_minus', true);
    $accordions_hide = get_post_meta($post_id,'accordions_hide', true);
    $accordions_bg_color = get_post_meta($post_id,'accordions_bg_color', true);
    $accordions_header_bg_img = get_post_meta($post_id,'accordions_header_bg_img', true);

    $accordions_active_accordion = get_post_meta($post_id,'accordions_active_accordion', true);

    ?>
    <div class="section">
        <div class="section-title">Accordions Content</div>
        <p class="description section-description">Add you accordion content here.</p>

        <?php




        ob_start();
        ?>
        <div class="accordions-content-buttons" >
            <div class="button add-accordions"><?php _e('Add', 'accordions'); ?></div>
            <div class="button expand-collapse"><?php _e('Expand all', 'accordions'); ?></div>
            <div class="button reset-active"><?php _e('Reset Active', 'accordions'); ?></div>
            <br />
            <br />
        </div>

        <div class="accordions-content expandable" id="accordions-content">

            <?php
            // $total_row = count($accordions_content_title);

            $time = time();


            $i=0;
            if(!empty($accordions_content_title)):
                foreach ($accordions_content_title as $accordions_key => $accordions_title){
                    ?>

                    <div class="item">

                        <div class="header">
                            <span class="remove"><i class="fa fa-times"></i></span>
                            <span class="move"><i class="fas fa-sort"></i></span>
                            <span class="expand"><i class="fa fa-expand"></i><i class="fa fa-compress"></i></span>

                            <span class="accordions-title-preview">
                                <?php if(!empty($accordions_title)) echo $accordions_title; ?>
                            </span>
                            <?php

                            $checked = !empty($accordions_hide[$accordions_key]) ? 'checked' : '';

                            ?>

                            <label title="Hide or display" class="hide-unhide float-right <?php if($checked == 'checked') echo 'active';?>">
                                <input  type="checkbox" name="accordions_hide[<?php echo $accordions_key; ?>]" value="1" <?php echo $checked; ?> />
                                <span class="hide"><i class="fas fa-eye"></i></span>
                                <span class="unhide"><i class="fas fa-eye-slash"></i></span>
                            </label>

                            <?php

                            $checked_active = ($accordions_active_accordion == $i) ? "checked" :"";

                            ?>


                            <label class="float-right"><input  type="radio" name="accordions_active_accordion" value="<?php echo $i; ?>" <?php echo $checked_active; ?> /><?php _e('Active', 'accordions'); ?></label>


                        </div>
                        <div class="options">

                            <strong><?php _e('Section icons, <a href="https://fontawesome.com/icons">fontawesome</a> icon id', 'accordions'); ?></strong> <br>
                            <div class="section-icon-plus">
                                <i class="fa fa-chevron-up"></i>
                                <input type="text" placeholder="fa-chevron-up" class="accordions_section_icon_plus" section-id="<?php echo $accordions_key; ?>" name="accordions_section_icon_plus[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_section_icon_plus[$accordions_key])) echo $accordions_section_icon_plus[$accordions_key]; ?>" />
                            </div>

                            <div class="section-icon-minus <?php echo $accordions_key; ?>">
                                <i class="fa fa-chevron-down"></i>
                                <input type="text" placeholder="fa-chevron-down" class="accordions_section_icon_minus" section-id="<?php echo $accordions_key; ?>" name="accordions_section_icon_minus[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_section_icon_minus[$accordions_key])) echo $accordions_section_icon_minus[$accordions_key]; ?>" />
                            </div>

                            <br><br>

                            <strong><?php _e('Header background color for this section', 'accordions'); ?></strong> <br>
                            <input class="accordions_color" placeholder="#dddddd"  type="text" name="accordions_bg_color[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_bg_color[$accordions_key])) echo $accordions_bg_color[$accordions_key]; ?>" />   <br> <br>



                            <strong><?php _e('Header background image url for this section', 'accordions'); ?></strong> <br>
                            <input type="text" placeholder="http://domain.com/url-of-image-source.png" name="accordions_header_bg_img[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_header_bg_img[$accordions_key])) echo $accordions_header_bg_img[$accordions_key]; ?>" />   <br> <br>

                            <strong><?php _e('Header text', 'accordions'); ?></strong> <br>
                            <input class="accordions_content_title" style="width:80%" placeholder="<?php echo __('Accordion header text', 'accordions'); ?>" type="text" name="accordions_content_title[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_title)) echo esc_attr($accordions_title); //htmlentities ?>" /><br><br>

                            <strong><?php _e('Header toggled text','accordions'); ?></strong> <br>
                            <input style="width:80%" placeholder="Accordions alter text on active" type="text" name="accordions_content_title_toggled[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_content_title_toggled[$accordions_key])) echo esc_attr($accordions_content_title_toggled[$accordions_key]); ?>" /><br><br>


                            <strong><?php _e('Content', 'accordions'); ?></strong> <br>
                            <?php

                            wp_editor( !empty($accordions_content_body[$accordions_key]) ? $accordions_content_body[$accordions_key] : '', 'accordions_content_body'.$accordions_key, $settings = array('textarea_name'=>'accordions_content_body['.$accordions_key.']') );


                            ?>
                        </div>



                    </div>
                    <?php

                    $i++;
                }
            else:
                ?>
                <div class="items"><?php echo __('Click "Add" button to add your accordion content', 'accordions'); ?></div>
            <?php

            endif;
            ?>

        </div>

        <script>
            jQuery(document).ready(function($)
            {
                $(function() {
                    $( "#accordions-content" ).sortable({ handle: '.move' });
                    //$( ".items-container" ).disableSelection();
                });



                $(document).on('click', '.accordions-content-buttons .add-accordions', function()
                {

                    var unique_key = $.now();

                    html = '<div class="item">';
                    html += '<div class="header">';
                    html += '<span class="remove"><i class="fa fa-times"></i></span>';
                    html += '<span class="move"><i class="fas fa-sort"></i></span>';
                    html += '<span class="expand"><i class="fa fa-expand"></i><i class="fa fa-compress"></i></span>';

                    html += '<span class="accordions-title-preview">#'+unique_key+'</span>';

                    html += '<label title="Hide or display" class="hide-unhide float-right ">\n'+
'                                <input  type="checkbox" name="accordions_hide['+unique_key+']" value="1"  />\n'+
'                                <span class="hide"><i class="fas fa-eye"></i></span>\n'+
'                                <span class="unhide"><i class="fas fa-eye-slash"></i></span>\n'+
'                            </label>';

                    html += '<label class="float-right"><input  type="radio" name="accordions_active_accordion" value="'+unique_key+'"  /><?php _e('Active', 'accordions'); ?></label>';

                    html += '</div><div class="options">';

                    html += '<strong>Section icons</strong> <br>';

                    html += '<div class="section-icon-plus">\n' +
                        '<i class="fa fa-chevron-up"></i>\n' +
                        '<input type="text" placeholder="fa-chevron-up" class="accordions_section_icon_plus" section-id="'+unique_key+'" name="accordions_section_icon_plus['+unique_key+']" value="" />\n' +
                        '</div>\n' +
                        '\n' +
                        ' <div class="section-icon-minus '+unique_key+'">\n' +
                        '<i class="fa fa-chevron-down"></i>\n' +
                        '<input type="text" placeholder="fa-chevron-down" class="accordions_section_icon_minus" section-id="'+unique_key+'" name="accordions_section_icon_minus['+unique_key+']" value="" />\n' +
                        '</div>';


                    html += '<strong>Header background color for this section</strong> <br>\n'+
'                            <input class="accordions_color" placeholder="#dddddd"  type="text" name="accordions_bg_color['+unique_key+']" value="" />   <br> <br>\n'+
'\n'+
'\n'+
'\n'+
'                            <strong>Header background image url for this section</strong> <br>\n'+
'                            <input type="text" placeholder="Image URL" name="accordions_header_bg_img['+unique_key+']" value="" />   <br> <br>\n'+
'\n'+
'                            <strong>Header text</strong> <br>\n'+
'                            <input class="accordions_content_title" style="width:80%" placeholder="Accordion header text" type="text" name="accordions_content_title['+unique_key+']" value="" /><br><br>\n'+
'\n'+
'                            <strong>Header toggled text</strong> <br>\n'+
'                            <input style="width:80%" placeholder="Accordions alter text on active" type="text" name="accordions_content_title_toggled['+unique_key+']" value="" /><br><br>\n';

                    html += '<strong>Content</strong> <br>';
                    html += '<textarea class="accordion-content-textarea" id="content-'+unique_key+'" placeholder="Accordion content" name="accordions_content_body['+unique_key+']" ></textarea>';
                    html += '</div>';




                    $("#accordions_metabox .accordions-content").append(html);

                    //$("#accordions_metabox .accordions-content").append('<div class="accordions-title-preview">Demo Title #'+unique_key+'</div><label class="switch"><input type="checkbox" value="1" name="accordions_hide['+unique_key+']">Hide on Frontend</label></div><div class="section-panel"><strong><?php _e('Header text','accordions'); ?></strong> <br><input style="width:80%" placeholder="<?php echo __('Accordion header text', 'accordions'); ?>" type="text" name="accordions_content_title['+unique_key+']" value="" /><br> <br><strong><?php _e('Content', 'accordions'); ?></strong> <br><textarea class="accordion-content-textarea" id="content-'+unique_key+'" placeholder="Accordion content" name="accordions_content_body['+unique_key+']" ></textarea></div></div>');

                    wp.editor.initialize( 'content-'+unique_key, {
                        mediaButtons: true,
                        tinymce:      {
                            toolbar1: 'bold,italic,bullist,numlist,link,blockquote,alignleft,aligncenter,alignright,strikethrough,hr,forecolor,pastetext,removeformat,codeformat,undo,redo'
                        },
                        quicktags:    true,
                    } );

                })

            })

        </script>


        <?php
        $html = ob_get_clean();
        $args = array(
            'id' => 'wcps_categories',
            'title' => __('Accordions content', 'woocommerce-products-slider'),
            'details'	=> __('accordion header and content','accordions'),
            'details' => '',
            'type' => 'custom_html',
            'html' => $html,
        );
        $settings_tabs_field->generate_field($args);








        $args = array(
            'id'		=> 'accordions_items_content_margin',
            'title'		=> __('Accordions Content.','accordions'),
            'details'	=> __('accordion content','accordions'),
            'type'		=> 'accordion_content',

        );

        $settings_tabs_field->generate_field($args);
        ?>


    </div>
    <?php
}






add_action('settings_tabs_content_stats', 'settings_tabs_content_stats', 10, 2);

function settings_tabs_content_stats($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();
    $accordions_click_track = get_post_meta($post_id,'accordions_click_track', true);

    $accordions_content_title = get_post_meta($post_id, 'accordions_content_title', true);
    $track_header = get_post_meta($post_id, 'track_header', true);

    ?>
    <div class="section">
        <div class="section-title">Accordions Stats</div>
        <p class="description section-description">Track where user click on accordion.</p>





        <?php
        $args = array(
            'id'		=> 'accordions_click_track',
            'title'		=> __('Enable click track on header.','accordions'),
            'details'	=> __('Tracking user interest where users clicked','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_click_track,
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args);
        ?>



        <?php
        ob_start();
        ?>
        <div class="">
            <table class="widefat" cellspacing="0">
                <thead>
                <tr>

                    <th id="cb" class="manage-column column-cb check-column" scope="col"></th>
                    <th id="columnname" class="manage-column column-columnname" scope="col">Header title</th>
                    <th id="columnname" class="manage-column column-columnname num" scope="col">Total Click</th>

                </tr>
                </thead>

                <tfoot>
                <tr>

                    <th class="manage-column column-cb check-column" scope="col"></th>
                    <th class="manage-column column-columnname" scope="col">Header title</th>
                    <th class="manage-column column-columnname num" scope="col">Total Click</th>

                </tr>
                </tfoot>

                <tbody>

                <?php

                //$accordions_content_title = array();


                if(!empty($accordions_content_title))
                    foreach ($accordions_content_title as $index=>$title){
                        ?><tr>
                        <th class="check-column" scope="row"></th>
                        <td  class="column-columnname"><?php echo $title; ?></td>
                        <td style="text-align: center" class="column-columnname" scope="col"><?php if(!empty($track_header['header-'.$index])) echo $track_header['header-'.$index]; else echo '0'; ?></td>
                        </tr>

                        <?php
                    }
                ?>

                </tbody>
            </table>
        </div>

        <?php

        $html = ob_get_clean();

        $args = array(
            'id' => 'accordions_items_stats',
            'title' => __('Stats for accordion', 'woocommerce-products-slider'),
            'details' => __('You will see click count on accordion headers.', 'woocommerce-products-slider'),

            'type' => 'custom_html',
            'html' => $html,
        );
        $settings_tabs_field->generate_field($args);



        ?>










    </div>
    <?php
}








add_action('settings_tabs_content_custom_scripts', 'settings_tabs_content_custom_scripts', 10, 2);

function settings_tabs_content_custom_scripts($tab, $post_id){


    $settings_tabs_field = new settings_tabs_field();
    $accordions_custom_js = get_post_meta($post_id,'accordions_custom_js', true);
    $accordions_custom_css = get_post_meta($post_id,'accordions_custom_css', true);

    ?>
    <div class="section">
        <div class="section-title">Custom Scripts & CSS</div>
        <p class="description section-description">Track where user click on accordion.</p>





        <?php
        $args = array(
            'id'		=> 'accordions_custom_js',
            'title'		=> __('Custom Js.','accordions'),
            'details'	=> __('You can add custom scripts here, do not use <code>&lt;script&gt; &lt;/script&gt;</code> tag','accordions'),
            'type'		=> 'scripts_js',
            'value'		=> $accordions_custom_js,
            'default'		=> '',


        );

        $settings_tabs_field->generate_field($args);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_custom_css',
            'title'		=> __('Custom CSS.','accordions'),
            'details'	=> __('You can add custom css here, do not use <code>  &lt;style&gt; &lt;/style&gt;</code> tag','accordions'),
            'type'		=> 'scripts_css',
            'value'		=> $accordions_custom_css,

        );

        $settings_tabs_field->generate_field($args);
        ?>

    </div>
    <?php


}
