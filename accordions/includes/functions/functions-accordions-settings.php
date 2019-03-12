<?php
/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 







add_action('accordions_settings_options', 'accordions_settings_options',10, 2);

if(!function_exists('accordions_settings_options')) {
    function accordions_settings_options($tab){
        $settings_tabs_field = new settings_tabs_field();



        ?>
        <div class="section">
            <div class="section-title">Options</div>
            <p class="description section-description">Put license key to get automatic update.</p>

            <?php




            ob_start();




            $meta_fields = array(
                'accordions_collapsible',
                'accordions_expaned_other',
                'accordions_heightStyle',
                'accordions_active_accordion',
                'accordions_click_scroll_top',
                'accordions_header_toggle',
                'accordions_click_scroll_top_offset',
                'accordions_active_event',
                'accordions_lazy_load',
                'accordions_lazy_load_src',
                'accordions_animate_style',
                'accordions_animate_delay',
                'accordions_hide_edit',
                'accordions_expand_collapse_display',
                'accordions_child',
                'accordions_container_padding',
                'accordions_container_bg_color',
                'accordions_container_text_align',
                'accordions_bg_img',
                'accordions_themes',
                'accordions_icons_plus',
                'accordions_icons_minus',
                'accordions_section_icon_plus',
                'accordions_section_icon_minus',
                'accordions_icons_color',
                'accordions_icons_color_hover',
                'accordions_icons_font_size',
                'accordions_icons_position',
                'accordions_default_bg_color',
                'accordions_active_bg_color',
                'accordions_header_bg_opacity',
                'accordions_bg_color',
                'accordions_header_bg_img',
                'accordions_items_title_color',
                'accordions_items_title_color_hover',
                'accordions_items_title_font_family',
                'accordions_items_title_font_size',
                'accordions_items_title_margin',
                'accordions_items_title_padding',
                'accordions_items_content_color',
                'accordions_items_content_font_family',
                'accordions_items_content_font_size',
                'accordions_items_content_bg_color',
                'accordions_items_content_bg_opacity',
                'accordions_items_content_padding',
                'accordions_items_content_margin',
                'accordions_content_title',
                'accordions_content_title_toggled',
                'accordions_content_body',
                'accordions_hide',
                'accordions_custom_css',
                'accordions_tabs_collapsible',
                'accordions_tabs_active_event',
                'accordions_tabs_vertical',
                'accordions_tabs_icon_toggle',
                'accordions_click_track',
                'track_header',
            );


            $wp_query = new WP_Query( array (
                'post_type' => 'accordions',
                'post_status' => 'publish',

            ));

            $post_data_exported = array();

            if ( $wp_query->have_posts() ) :
                while ( $wp_query->have_posts() ) : $wp_query->the_post();
                    foreach($meta_fields as $field){
                        $fields_data[$field] = get_post_meta(get_the_ID(),$field, true);
                    }

                    $post_data_exported[get_the_ID()] = array(
                        'title'=>get_the_title(),
                        'meta_fields'=>$fields_data,
                    );


                endwhile;
                wp_reset_query();
            else:

                // echo __('Not  found');

            endif;

            $post_data_exported_json = json_encode($post_data_exported);


            ?>

            <textarea id="text-val" rows="4"><?php echo $post_data_exported_json; ?></textarea><br/>
            <input type="button" class="button" id="dwn-btn" value="Download json"/>

            <style type="text/css">
                #text-val{
                    width: 260px;
                }
            </style>

            <script>
                function download(filename, text) {
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                    element.setAttribute('download', filename);

                    element.style.display = 'none';
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                }

                // Start file download.
                document.getElementById("dwn-btn").addEventListener("click", function(){
                    // Generate download of hello.txt file with some content
                    var text = document.getElementById("text-val").value;
                    var filename = "<?php echo date('Y-m-d-h').'-'.time(); ?>.txt";

                    download(filename, text);
                }, false);
            </script>


            <?php
            $html = ob_get_clean();
            $args = array(
                'id'		=> 'accordion_export',
                'title'		=> __('Export','woocommerce-products-slider'),
                'details'	=> 'Please download this json first and upload somewhere, you can import by using the url of json file.',
                'type'		=> 'custom_html',
                'html'		=> $html,
            );
            $settings_tabs_field->generate_field($args);



            ob_start();


            ?>

            <input placeholder="json file url" type="text" class="json_file" name="json_file" value="">
            <div class="accordions-import-json button">Import</div>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'		=> 'accordion_import',
                'title'		=> __('Import','woocommerce-products-slider'),
                'details'	=> 'Please put the url of json file where you uploaded the file.',
                'type'		=> 'custom_html',
                'html'		=> $html,
            );
            $settings_tabs_field->generate_field($args);





























            ?>

        </div>
            <?php
    }
}






add_action('accordions_settings_license', 'accordions_settings_license',10, 2);

if(!function_exists('accordions_settings_license')) {
    function accordions_settings_license($tab){


        $accordions_license = get_option('accordions_license');
        $license_key = isset($accordions_license['license_key']) ? $accordions_license['license_key'] : '';
        $settings_tabs_field = new settings_tabs_field();

        $class_accordions_license = new class_accordions_license();

        $check_license_on_server = $class_accordions_license->check_license_on_server($license_key);

        $license_key = isset($accordions_license['license_key']) ? $accordions_license['license_key'] : '';

        //var_dump($check_license_on_server);

        //$date_expiry = isset($check_license_on_server['date_expiry']) ? $check_license_on_server['date_expiry'] : 'Not set yet';
        //$license_status = isset($check_license_on_server['license_status']) ? $check_license_on_server['license_status'] : 'Not set yet';
        //$mgs = isset($check_license_on_server['mgs']) ? $check_license_on_server['mgs'] : '';

        ?>
        <div class="section">
            <div class="section-title">License</div>
            <p class="description section-description">Put license key to get automatic update.</p>



            <?php
            ob_start();
            ?>
            <input type="text" name="license_key" value="<?php echo $license_key; ?>">
<!--            <ul>-->
<!--                <li>Status: <span>--><?php //echo $license_status; ?><!--</span></li>-->
<!--                <li>Expire Date: <span>--><?php //echo $date_expiry; ?><!--</span></li>-->
<!--            </ul>-->
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'		=> 'license_key',
                'title'		=> __('License key','woocommerce-products-slider'),
                'details'	=> 'To get automatic plugin update plugin put lincese key here.',
                'type'		=> 'custom_html',
                'html'		=> $html,
            );
            $settings_tabs_field->generate_field($args);


            ?>

        </div>
        <?php





	}

}












