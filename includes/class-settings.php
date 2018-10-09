<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access



$help_options = array(

    'page_nav' 	=> __( 'Help', 'accordions' ),
    'priority' => 15,
    'page_settings' => array(

        'section_templates' => array(
            'title' 	=> 	__('Get Help & Support','accordions'),
            'description' 	=> __('If you have any issue for accordion please feel free to contact our support','accordions'),
            'options' 	=> array(
                array(
                    'id'		=> 'accordion_ask_forum',
                    'title'		=> __('Ask on our forum','accordions'),
                    'details'	=> __('Its free and you can ask any question about our plugins and get support fast.','accordions'),
                    'type'		=> 'custom_html',
                    'html'		=> '<a class="button" href="https://www.pickplugins.com/questions/?ref=dashboard" target="_blank">Ask Question</a>',
                ),

                array(
                    'id'		=> 'accordion_documentation',
                    'title'		=> __('Read documentation','accordions'),
                    'details'	=> __('Before asking, submitting reviews please take a look on our documentation, may help your issue fast.','accordions'),
                    'type'		=> 'custom_html',
                    'html'		=> '<a class="button" href="http://pickplugins.com/docs/documentation/accordions/?ref=dashboard" target="_blank">Documentation</a>',
                ),

                array(
                    'id'		=> 'accordion_submit_reviews',
                    'title'		=> __('Submit reviews','accordions'),
                    'details'	=> __('Your feedback and reviews are most important things to keep our development on track. If you have time please submit us five star <span style="color: orange"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span> reviews.','accordions'),
                    'type'		=> 'custom_html',
                    'html'		=> '<a class="button" href="https://wordpress.org/support/plugin/accordions/reviews/?filter=5" target="_blank">Submit Reviews</a> <a class="button" href="https://wordpress.org/support/plugin/accordions/#new-topic-0" target="_blank">Ask on wordpress.org</a><p>We spent thousand+ hours to development on this plugin, please submit your reviews wisely.</p><p>If you have any issue with this plugin please submit our forums or contact our support first.</p>',
                ),


                array(
                    'id'		=> 'accordion_faq',
                    'title'		=> __('Frequently asked questions','accordions'),
                    'details'	=> __('If you still have any question please contact our support.','accordions'),
                    'type'		=> 'faq',
                    'args'		=> array(

                        array(
                            'title'=>'Can\'t access to tabs on accordion edit page?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-create-accordion/?ref=dashboard',
                            'content'=>'This is mostly in cache issue, please deactivate any cache plugin you install on your site, also try another browser or clear browser cache. you can try hard refresh on browser by pressing keyboard.<p>Windows: Ctrl + Shift +R</p><p>Mac: Cmd +Shift + R</p>',

                        ),

                        array(
                            'title'=>'How to create accordion?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-create-accordion/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/how-to-create-accordion/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/faq/how-to-create-accordion/</a>',

                        ),
                        array(
                            'title'=>' How to upgrade to premium?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/upgrade-to-premium/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/upgrade-to-premium/?ref=dashboard" >https://www.pickplugins.com/documentation/accordions/faq/upgrade-to-premium/</a>',

                        ),

                        array(
                            'title'=>' How to activate license?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-activate-license/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/how-to-activate-license/?ref=dashboard" >https://www.pickplugins.com/documentation/accordions/faq/how-to-activate-license/</a>, We are working for license server, you don\'t need activate license.',

                        ),

                        array(
                            'title'=>' How to create nested accordion?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-create-nested-accordion/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/how-to-create-nested-accordion/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/faq/how-to-create-nested-accordion/?ref=dashboard</a> ',

                        ),
                        array(
                            'title'=>' Accordion Open/Closed on load',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/accordion-openclosed-on-load/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/accordion-openclosed-on-load/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/faq/accordion-openclosed-on-load/</a> ',

                        ),

                        array(
                            'title'=>' How to filter accordion header',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_title/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_title/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_title/</a> ',
                        ),

                        array(
                            'title'=>' How to filter accordion content',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_content/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_content/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_content/</a> ',
                        ),
                        array(
                            'title'=>' How to open/activate via URL parameter ?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-openactivate-via-url-parameter/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/how-to-openactivate-via-url-parameter/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/faq/how-to-openactivate-via-url-parameter/</a> ',
                        ),

                        array(
                            'title'=>' How to set custom header background image ?',
                            'link'=>'https://www.pickplugins.com/documentation/accordions/faq/custom-header-background-image/?ref=dashboard',
                            'content'=>'Please see the documentation here <a href="https://www.pickplugins.com/documentation/accordions/faq/custom-header-background-image/?ref=dashboard">https://www.pickplugins.com/documentation/accordions/faq/custom-header-background-image/</a> ',
                        ),





                    ),
                ),

            )
        ),

    ),
);




$our_plugins_options = array(

    'page_nav' 	=> __( 'Our Plugins', 'accordions' ),
    'priority' => 15,
    'page_settings' => array(

        'section_templates' => array(
            'title' 	=> 	__('Ready Plugins','accordions'),
            'description' 	=> __('If you have any issue for accordion please feel free to contact our support','accordions'),
            'options' 	=> array(

                array(
                    'id'		=> 'accordion_plugins',
                    'title'		=> __('Our Plugins','accordions'),
                    'details'	=> __('Some ready plugin for your project.','accordions'),
                    'type'		=> 'addons_grid',
                    'args'		=> array(

                        array(
                            'title'=>'Post Grid',
                            'link'=>'http://www.pickplugins.com/item/post-grid-create-awesome-grid-from-any-post-type-for-wordpress/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2015/12/3814-post-grid-thumb-500x262.jpg',

                        ),

                        array(
                            'title'=>'Woocommerce Products Slider',
                            'link'=>'http://www.pickplugins.com/item/woocommerce-products-slider-for-wordpress/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/03/4357-woocommerce-products-slider-thumb-500x250.jpg',

                        ),

                        array(
                            'title'=>'Team Showcase',
                            'link'=>'http://www.pickplugins.com/item/team-responsive-meet-the-team-grid-for-wordpress/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/06/5145-team-thumb-500x250.jpg',

                        ),

                        array(
                            'title'=>'Job Board Manager',
                            'link'=>'https://wordpress.org/plugins/job-board-manager/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2015/08/3466-job-board-manager-thumb-500x250.png',

                        ),

                        array(
                            'title'=>'Wishlist for WooCommerce',
                            'link'=>'https://www.pickplugins.com/item/woocommerce-wishlist/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2017/10/12047-woocommerce-wishlist.png',

                        ),

                        array(
                            'title'=>'Breadcrumb',
                            'link'=>'https://www.pickplugins.com/item/breadcrumb-awesome-breadcrumbs-style-navigation-for-wordpress/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/03/4242-breadcrumb-500x252.png',

                        ),

                        array(
                            'title'=>'Pricing Table',
                            'link'=>'https://www.pickplugins.com/item/pricing-table/',
                            'thumb'=>'https://www.pickplugins.com/wp-content/uploads/2016/10/7042-pricing-table-thumbnail-500x250.png',

                        ),



                    ),
                ),





            )
        ),

    ),
);




$args = array(
    'add_in_menu'       => true,
    'menu_type'         => 'submenu',
    'menu_title'        => __( 'Help & Support', 'accordions' ),
    'page_title'        => __( 'Accordion - Help', 'accordions' ),
    'menu_page_title'   => __( 'Accordion - Help', 'accordions' ),
    'capability'        => "manage_options",
    'menu_slug'         => "help-support",
    'parent_slug'       => "edit.php?post_type=accordions",
    'menu_icon'         => "dashicons-businessman",
    'pages' 	        => array(
        'help-support'   => $help_options,
        'our-plugins'   => $our_plugins_options,

    ),
);

$WPAdminSettings = new WPAdminSettings( $args );













$license_options = array(

    'page_nav' 	=> __( 'License', 'accordions' ),
    'priority' => 15,
    'page_settings' => array(

        'section_templates' => array(
            'title' 	=> 	__('Activate license','accordions'),
            'description' 	=> __('If you have license key, please activate your plugin here.','accordions'),
            'options' 	=> array(

                array(
                    'id'		=> 'accordion_license',
                    'title'		=> __('License','accordions'),
                    'details'	=> '',
                    'type'		=> 'text',

                ),





            )
        ),

    ),
);










$args = array(
    'add_in_menu'       => true,
    'menu_type'         => 'submenu',
    'menu_title'        => __( 'License', 'accordions' ),
    'page_title'        => __( 'Accordion - License', 'accordions' ),
    'menu_page_title'   => __( 'Accordion - License', 'accordions' ),
    'capability'        => "manage_options",
    'menu_slug'         => "license-new",
    'parent_slug'       => "edit.php?post_type=accordions",
    'menu_icon'         => "dashicons-businessman",
    'pages' 	        => array(
        'license'   => $license_options,
    ),
);

//$WPAdminSettings = new WPAdminSettings( $args );









add_action('wp_admin_settings_custom_field_accordion_export','wp_admin_settings_custom_field_accordion_export');

function wp_admin_settings_custom_field_accordion_export($option){

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
        'accordions_content_title_toogled',
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

}





add_action('wp_admin_settings_custom_field_accordion_import','wp_admin_settings_custom_field_accordion_import');

function wp_admin_settings_custom_field_accordion_import($option){

    ?>
    <input placeholder="json file url" type="text" class="json_file" name="json_file" value="">
    <div class="accordions-import-json button">Import</div>
    <?php

}










$export_import_options = array(

    'page_nav' 	=> __( 'Export/import', 'accordions' ),
    'priority' => 15,
    'page_settings' => array(

        'section_templates' => array(
            'title' 	=> 	__('Export/import','accordions'),
            'description' 	=> __('you can Export/import accordions here.','accordions'),
            'options' 	=> array(

                array(
                    'id'		=> 'accordion_export',
                    'title'		=> __('Export','accordions'),
                    'details'	=> __('Please download this json first and upload somewhere, you can import by using the url of json file.','accordions'),
                    'type'		=> 'accordion_export',

                ),

                array(
                    'id'		=> 'accordion_import',
                    'title'		=> __('Import','accordions'),
                    'details'	=> __('Please put the url of json file where you uploaded the file.','accordions'),
                    'type'		=> 'accordion_import',

                ),



            )
        ),

    ),
);



$args = array(
    'add_in_menu'       => true,
    'menu_type'         => 'submenu',
    'menu_title'        => __( 'Settings', 'accordions' ),
    'page_title'        => __( 'Accordion - Settings', 'accordions' ),
    'menu_page_title'   => __( 'Accordion - Settings', 'accordions' ),
    'capability'        => "manage_options",
    'menu_slug'         => "settings",
    'parent_slug'       => "edit.php?post_type=accordions",
    'menu_icon'         => "dashicons-businessman",
    'pages' 	        => array(
        'export_import'   => $export_import_options,
        //'license'   => $license_options,
    ),
);

$WPAdminSettings = new WPAdminSettings( $args );




















