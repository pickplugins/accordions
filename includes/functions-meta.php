<?php

/*
* @Author 		PickPlugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access




add_action('settings_tabs_content_shortcode', 'settings_tabs_content_shortcode',10, 2);

function settings_tabs_content_shortcode($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();


    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Shortcodes','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Simply copy these shortcode and user under content','accordions');?></p>


        <?php


        ob_start();

        ?>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions id='<?php echo $post_id;  ?>']"> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('You can use this shortcode under post content','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_pplugins id='<?php echo $post_id;  ?>']"> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('To avoid conflict with 3rd party shortcode also used same <code>[accordions]</code>You can use this shortcode under post content.','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('PHP Code, you can use under theme .php files.','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_pplugins id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('To avoid conflict, PHP code you can use under theme .php files.','accordions'); ?></p>
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

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php


        ob_start();

        ?>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_tabs id='<?php echo $post_id;  ?>']"> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('You can use this shortcode under post content','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <input type="text" value="[accordions_tabs_pplugins id='<?php echo $post_id;  ?>']"> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('To avoid conflict with 3rd party shortcode also used same <code>[accordions_tabs]</code>You can use this shortcode under post content','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_tabs id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('PHP Code, you can use under theme .php files.','accordions'); ?></p>
        </div>

        <div class="copy-to-clipboard">
            <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions_tabs_pplugins id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea> <span class="copied"><?php echo __('Copied','accordions'); ?></span>
            <p class="description"><?php echo __('To avoid conflict, PHP code you can use under theme .php files.','accordions'); ?></p>
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

        $settings_tabs_field->generate_field($args, $post_id);
        ?>










    </div>
    <?php
}




add_action('settings_tabs_content_options', 'settings_tabs_content_options', 10, 2);

function settings_tabs_content_options($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();

    //var_dump($post_id);

    ?>

    <div class="section">
        <div class="section-title"><?php echo __('Accordion Settings','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Some general setting for accordion','accordions'); ?></p>





        <?php
        $args = array(
            'id'		=> 'accordions_collapsible',
            'title'		=> __('Collapsible','accordions'),
            'details'	=> __('Make accordion collapsible.','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'true'	=> __('True','accordions'),
                'false'	=> __('False','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_expaned_other',
            'title'		=> __('Keep expanded others','accordions'),
            'details'	=> __('This is useful when use collapsible.','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_heightStyle',
            'title'		=> __('Content height style','accordions'),
            'details'	=> __('accordion content style.','accordions'),
            'type'		=> 'select',
            'args'		=> array(

                'content'	=> __('Content','accordions'),
                'fill'	=> __('Fill','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




        <?php
        $args = array(
            'id'		=> 'accordions_active_event',
            'title'		=> __('Activate event','accordions'),
            'details'	=> __('Activate event type for header.','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'click'	=> __('Click','accordions'),
                'mouseover'	=> __('Mouseover','accordions'),
                'focus'	=> __('Focus','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_lazy_load',
            'title'		=> __('Enable lazy load','accordions'),
            'details'	=> __('Accordion content will be hidden until page load completed.','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_lazy_load_src',
            'title'		=> __('Lazy load image source','accordions'),
            'details'	=> __('You can set custom image source for lazy load icon.','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>





        <?php
        $args = array(
            'id'		=> 'accordions_hide_edit',
            'title'		=> __('Hide edit link on front-end.','accordions'),
            'details'	=> __('You can display/hide accordion edit link on front-end','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'no'	=> __('No','accordions'),
                'yes'	=> __('Yes','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




    </div>

    <div class="section">
        <div class="section-title"><?php echo __('Tabs Settings','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Settings for tabs','accordions'); ?></p>


        <?php
        $args = array(
            'id'		=> 'accordions_tabs_collapsible',
            'title'		=> __('Collapsible','accordions'),
            'details'	=> __('Make tabs collapsible.','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'true'	=> __('True','accordions'),
                'false'	=> __('False','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_tabs_active_event',
            'title'		=> __('Activate event','accordions'),
            'details'	=> __('Event for activate tabs','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'click'	=> __('Click','accordions'),
                'mouseover'	=> __('Mouseover','accordions'),
            ),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>



    </div>








    <?php


}










add_action('settings_tabs_content_style', 'settings_tabs_content_style', 10, 2);

function settings_tabs_content_style($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();





    ?>

    <div class="section">
        <div class="section-title"><?php echo __('Accordion Style Settings','accordions'); ?></div>
        <p class="description section-description"><?php echo __('You can style accordion here.','accordions'); ?></p>


        <?php
        $class_accordions_functions = new class_accordions_functions();
        $accordions_themes_list = $class_accordions_functions->accordions_themes();

        //var_dump($accordions_themes_list);


        $args = array(
            'id'		=> 'accordions_themes',
            'title'		=> __('Accordion themes','accordions'),
            'details'	=> __('You can choose accordion theme here.','accordions'),
            'type'		=> 'radio_image',
            'default_value'		=> 'flat',
            'args'		=> $accordions_themes_list,
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>
    </div>



    <div class="section">
        <div class="section-title"><?php echo __('Accordion Icons','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Customize accordion icons.','accordions'); ?></p>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_plus',
            'title'		=> __('Plus icon','accordions'),
            'details'	=> __('Icon for idle, you can use <a target="_blank" href="https://fontawesome.com/icons">Font Awesome</a> icons, just put the css class <code>fas fa-chevron-up</code>','accordions'),
            'type'		=> 'text_icon',
            'default_value'		=> 'fas fa-chevron-up',
            'placeholder' => __('fas fa-chevron-up','accordions'),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_minus',
            'title'		=> __('Minus icon','accordions'),
            'details'	=> __('Icon for activate, you can use <a target="_blank" href="https://fontawesome.com/icons">Font Awesome</a> icons, just put the css class <code>fas fa-chevron-down</code>','accordions'),
            'type'		=> 'text_icon',
            'default_value'		=> 'fas fa-chevron-down',
            'placeholder' => __('fas fa-chevron-down','accordions'),
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_icons_color',
            'title'		=> __('Icons color','accordions'),
            'details'	=> __('Color for icons','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_icons_color_hover',
            'title'		=> __('Icon hover color','accordions'),
            'details'	=> __('Color for icons on mousehover','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_icons_font_size',
            'title'		=> __('Icon font size','accordions'),
            'details'	=> __('You can set custom font size.','accordions'),
            'type'		=> 'text',
            'placeholder' => '16px',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




    </div>


    <div class="section">
        <div class="section-title"><?php echo __('Accordion Header Style','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Customize accordion header.','accordions'); ?></p>




        <?php
        $args = array(
            'id'		=> 'accordions_default_bg_color',
            'title'		=> __('Default background color.','accordions'),
            'details'	=> __('Background color of header on idle','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




        <?php
        $args = array(
            'id'		=> 'accordions_active_bg_color',
            'title'		=> __('Active background color.','accordions'),
            'details'	=> __('Background color of header on active stats','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_title_color',
            'title'		=> __('Accordions header font color.','accordions'),
            'details'	=> __('Font color for accordion headers','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_title_color_hover',
            'title'		=> __('Accordions header font color on hover.','accordions'),
            'details'	=> __('Font color for accordion headers','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>



        <?php
        $args = array(
            'id'		=> 'accordions_items_title_font_size',
            'title'		=> __('Accordions header font size.','accordions'),
            'details'	=> __('Choose font size for header text','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_padding',
            'title'		=> __('Accordions header padding.','accordions'),
            'details'	=> __('Choose header area padding','accordions'),
            'type'		=> 'text',
            'placeholder' => '10px',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_title_margin',
            'title'		=> __('Accordions header margin.','accordions'),
            'details'	=> __('Choose header area margin','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




    </div>


    <div class="section">
        <div class="section-title"><?php echo __('Accordions Content Style','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Customize accordion content.','accordions'); ?></p>




        <?php
        $args = array(
            'id'		=> 'accordions_items_content_color',
            'title'		=> __('Accordions content font color.','accordions'),
            'details'	=> __('You can choose custom color for accordion content','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_content_font_size',
            'title'		=> __('Accordions content font size.','accordions'),
            'details'	=> __('You can set custom font size for accordion content','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_items_content_bg_color',
            'title'		=> __('Accordions content background color.','accordions'),
            'details'	=> __('You can choose custom background color for accordion content area','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_content_padding',
            'title'		=> __('Accordions content padding.','accordions'),
            'details'	=> __('You can set custom padding for accordion content','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_items_content_margin',
            'title'		=> __('Accordions content margin.','accordions'),
            'details'	=> __('You can set custom margin for accordion content','accordions'),
            'type'		=> 'text',
            'placeholder' => '',
        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>













    </div>


    <div class="section">
        <div class="section-title"><?php echo __('Accordion Container Style','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Customize accordion container settings.','accordions'); ?></p>

        <?php
        $args = array(
            'id'		=> 'accordions_container_padding',
            'title'		=> __('Container padding.','accordions'),
            'details'	=> __('Set container padding','accordions'),
            'type'		=> 'text',
            'placeholder' => '10px',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


        <?php
        $args = array(
            'id'		=> 'accordions_container_bg_color',
            'title'		=> __('Container background color.','accordions'),
            'details'	=> __('Set container background color','accordions'),
            'type'		=> 'colorpicker',
            'placeholder' => '',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_container_text_align',
            'title'		=> __('Container text align.','accordions'),
            'details'	=> __('Set container text align','accordions'),
            'type'		=> 'select',
            'args'		=> array(
                'left'	=> __('Left','accordions'),
                'right'	=> __('Right','accordions'),
                'center'	=> __('Center','accordions'),
                'justify'	=> __('Justify','accordions'),

            ),

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_bg_img',
            'title'		=> __('Container background image.','accordions'),
            'details'	=> __('Set container background image','accordions'),
            'type'		=> 'text',
            'placeholder' => '',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>




    </div>












    <?php

}



add_action('settings_tabs_content_content', 'settings_tabs_content_content', 10, 2);

function settings_tabs_content_content($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();


    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Accordions Content','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Add you accordion content here.','accordions'); ?></p>

        <?php
        $args = array(
            'id'		=> 'accordions_items_content_margin',
            'title'		=> __('Accordions Content.','accordions'),
            'details'	=> __('accordion content','accordions'),
            'type'		=> 'accordion_content',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>


    </div>
    <?php
}


add_action('settings_tabs_field_accordion_content', 'settings_tabs_field_accordion_content', 10, 2);
function settings_tabs_field_accordion_content($option, $post_id){

    $id 			= isset( $option['id'] ) ? $option['id'] : "";
    $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
    $value 	 		= get_option( $id );

    $title			= isset( $option['title'] ) ? $option['title'] : "";
    $details 			= isset( $option['details'] ) ? $option['details'] : "";



    $accordions_content_title = get_post_meta($post_id,'accordions_content_title', true);
    $accordions_content_body = get_post_meta($post_id,'accordions_content_body', true);

    $accordions_hide = get_post_meta($post_id,'accordions_hide', true);




    ?>
    <div class="setting-field">
        <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
        <div class="field-input">

            <div class="accordions-content-buttons" >
                <div class="button add-accordions"><?php _e('Add', 'accordions'); ?></div>
                <div class="button expand-collapse"><?php _e('Expand all', 'accordions'); ?></div>
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

                    <div class="items">

                        <div class="section-header">

                            <span class="move"><i class="fa fa-bars"></i></span>
                            <span class="expand-compress"><i class="fa fa-expand"></i><i class="fa fa-compress"></i></span>

                            <div class="accordions-title-preview">
                                <?php if(!empty($accordions_title)) echo $accordions_title; ?>
                            </div>

                            <span class="removeaccordions"><?php _e('Remove', 'accordions'); ?></span>

                            <?php

                            if(!empty($accordions_hide[$accordions_key]))
                            {
                                $checked = 'checked';
                            }
                            else
                            {
                                $checked = '';
                            }


                            ?>

                            <label><input  type="checkbox" name="accordions_hide[<?php echo $accordions_key; ?>]" value="1" <?php echo $checked; ?> /><?php _e('Hide on Frontend', 'accordions'); ?></label>


                        </div>
                        <div class="section-panel">

                            <strong><?php _e('Header text', 'accordions'); ?></strong> <br>
                            <input class="accordions_content_title" style="width:80%" placeholder="<?php echo __('Accordion header text', 'accordions'); ?>" type="text" name="accordions_content_title[<?php echo $accordions_key; ?>]" value="<?php if(!empty($accordions_title)) echo esc_attr($accordions_title); //htmlentities ?>" /><br><br>
                            <strong><?php _e('Content', 'accordions'); ?></strong> <br>
                            <?php

                            wp_editor( $accordions_content_body[$accordions_key], 'accordions_content_body'.$accordions_key, $settings = array('textarea_name'=>'accordions_content_body['.$accordions_key.']') );


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
                jQuery(document).ready(function($){
                    $(function() {
                        $( "#accordions-content" ).sortable({ handle: '.move' });
                    });
                    $(document).on('click', '.accordions-content-buttons .add-accordions', function(){
                        var unique_key = $.now();
                        $("#accordions_metabox .accordions-content").append('<div class="items" valign="top"><div class="section-header"><span class="move"><i class="fa fa-bars"></i></span><span class="expand-compress"><i class="fa fa-expand"></i><i class="fa fa-compress"></i></span><div class="accordions-title-preview">Demo Title #'+unique_key+'</div><span class="removeaccordions">Remove</span><label class="switch"><input type="checkbox" value="1" name="accordions_hide['+unique_key+']">Hide on Frontend</label></div><div class="section-panel"><strong><?php _e('Header text','accordions'); ?></strong> <br><input style="width:80%" placeholder="<?php echo __('Accordion header text', 'accordions'); ?>" type="text" name="accordions_content_title['+unique_key+']" value="" /><br> <br><strong><?php _e('Content', 'accordions'); ?></strong> <br><textarea class="accordion-content-textarea" id="content-'+unique_key+'" placeholder="Accordion content" name="accordions_content_body['+unique_key+']" ></textarea></div></div>');
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



        </div>
    </div>


    <?php


}









add_action('settings_tabs_content_stats', 'settings_tabs_content_stats', 10, 2);

function settings_tabs_content_stats($tab, $post_id){

    $settings_tabs_field = new settings_tabs_field();


    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Accordions Stats','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Track where user click on accordion.','accordions'); ?></p>





        <?php
        $args = array(
            'id'		=> 'accordions_items_stats',
            'title'		=> __('Stats for accordion','accordions'),
            'details'	=> '',
            'type'		=> 'accordions_stats',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>










    </div>
    <?php
}



add_action('settings_tabs_field_accordions_stats', 'settings_tabs_field_accordions_stats',10,2);
function settings_tabs_field_accordions_stats($option, $post_id){

    $id = isset($option['id']) ? $option['id'] : "";
    $placeholder = isset($option['placeholder']) ? $option['placeholder'] : "";
    $value = get_post_meta($post_id,'track_header', true);

    $title = isset($option['title']) ? $option['title'] : "";
    $details = isset($option['details']) ? $option['details'] : "";


    $accordions_content_title = get_post_meta($post_id, 'accordions_content_title', true);
    $track_header = get_post_meta($post_id, 'track_header', true);


    ?>
    <div class="setting-field">
        <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
        <div class="field-input">
            <table class="widefat fixed" cellspacing="0">
                <thead>
                <tr>

                    <th id="cb" class="manage-column column-cb check-column" scope="col"></th>
                    <th id="columnname" class="manage-column column-columnname" scope="col"><?php echo __('Header title','accordions'); ?></th>
                    <th id="columnname" class="manage-column column-columnname num" scope="col"><?php echo __('Total click','accordions'); ?></th>

                </tr>
                </thead>

                <tfoot>
                <tr>

                    <th class="manage-column column-cb check-column" scope="col"></th>
                    <th class="manage-column column-columnname" scope="col"><?php echo __('Header title','accordions'); ?></th>
                    <th class="manage-column column-columnname num" scope="col"><?php echo __('Total click','accordions'); ?></th>

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


            <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
        </div>
    </div>
    <?php

}




add_action('settings_tabs_content_custom_scripts', 'settings_tabs_content_custom_scripts', 10, 2);

function settings_tabs_content_custom_scripts($tab, $post_id){


    $settings_tabs_field = new settings_tabs_field();


    ?>
    <div class="section">
        <div class="section-title"><?php echo __('Accordions Stats','accordions'); ?></div>
        <p class="description section-description"><?php echo __('Track where user click on accordion.','accordions'); ?></p>





        <?php
        $args = array(
            'id'		=> 'accordions_custom_js',
            'title'		=> __('Custom Js.','accordions'),
            'details'	=> __('You can add custom scripts here, do not use <code>&lt;script&gt; &lt;/script&gt;</code> tag','accordions'),
            'type'		=> 'scripts_js',
            'default_value'		=> '',


        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

        <?php
        $args = array(
            'id'		=> 'accordions_custom_css',
            'title'		=> __('Custom CSS.','accordions'),
            'details'	=> __('You can add custom css here, do not use <code>  &lt;style&gt; &lt;/style&gt;</code> tag','accordions'),
            'type'		=> 'scripts_css',

        );

        $settings_tabs_field->generate_field($args, $post_id);
        ?>

    </div>
    <?php


}
