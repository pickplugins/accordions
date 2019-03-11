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

        $accordions_track_product_view = get_option('accordions_track_product_view', 'no');
        $accordions_load_script_pages = get_option('accordions_load_script_pages', '');

        ?>
        <div class="section">
            <div class="section-title">Options</div>
            <p class="description section-description">Put license key to get automatic update.</p>

            <?php

            $args = array(
                'id'		=> 'accordions_track_product_view',
                //'parent'		=> '',
                'title'		=> __('Track product View','woocommerce-products-slider'),
                'details'	=> __('You can track view product by set Yes.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $accordions_track_product_view,
                'default'		=> 'OR',
                'args'		=> array(
                    'no'=>__('No','woocommerce-products-slider'),
                    'yes'=>__('Yes','woocommerce-products-slider'),



                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'accordions_load_script_pages',
                //'parent'		=> '',
                'title'		=> __('Optimize CSS & Scripts file load by page','woocommerce-products-slider'),
                'details'	=> __('Please use page ids where you using shortcode <code>[accordions id="123"]</code>Use comma separate value. ex: 12,14','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $accordions_load_script_pages,
                'default'		=> '',
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

        //$check_license_on_server = $class_accordions_license->check_license_on_server($license_key);

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
            <ul>
<!--                <li>Status: <span>--><?php //echo $license_status; ?><!--</span></li>-->
<!--                <li>Expire Date: <span>--><?php //echo $date_expiry; ?><!--</span></li>-->
            </ul>
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












