<?php
/*
Plugin Name: License Manager - Clients
Plugin URI: http://pickplugins.com
Description: Awesome Question and Answer.
Version: 2.0.1
Text Domain: question-answer
Author: pickplugins
Author URI: http://pickplugins.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


if( ! class_exists( 'class_accordions_license' ) ) {
    class class_accordions_license
    {

        public function __construct()
        {


            add_action('init', array($this, 'check_plugin_update'), 12);

        }

        public function check_plugin_update(){

            $accordions_license = get_option('accordions_license');
            $license_key = isset($accordions_license['license_key']) ? $accordions_license['license_key'] : '';


            require_once('class-wp-autoupdate.php');

            $plugin_current_version = accordions_version;
            $plugin_remote_path = accordions_server_url;
            $plugin_slug = accordions_plugin_basename;


            new WP_AutoUpdate ($plugin_current_version, $plugin_remote_path, $plugin_slug, $license_key);

        }


        public function check_license_on_server($license_key){


            if (is_multisite()) {

                $domain = site_url();
            } else {
                $domain = $_SERVER['SERVER_NAME'];
            }


            // API query parameters
            $api_params = array(
                'license_manager_action' => '_activate',
                'license_key' => $license_key,
                'registered_domain' => $domain,
            );

            // Send query to the license manager server
            $response = wp_remote_get(add_query_arg($api_params, accordions_server_url), array('timeout' => 20, 'sslverify' => false));

            // Check for error in the response
            if (is_wp_error($response)) {
                echo __("Unexpected Error! The query returned with an error.", 'woocommerce-products-slider');
            } else {
                //var_dump($response);//uncomment it if you want to look at the full response

                // License data.
                $license_data = json_decode(wp_remote_retrieve_body($response));
                //var_dump($license_data);
                //echo $license_data->message;


                $license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';
                $date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
                $date_expiry = isset($license_data->date_expiry) ? sanitize_text_field($license_data->date_expiry) : '';
                $license_status = isset($license_data->license_status) ? sanitize_text_field($license_data->license_status) : '';
                $license_found = isset($license_data->license_found) ? sanitize_text_field($license_data->license_found) : '';
                $mgs = isset($license_data->mgs) ? sanitize_text_field($license_data->mgs) : '';
                $days_remaining = isset($license_data->days_remaining) ? sanitize_text_field($license_data->days_remaining) : '';


                $plugin_slug_license = array(
                    'license_key' => $license_key,
                    'date_created' => $date_created,
                    'date_expiry' => $date_expiry,
                    'license_status' => $license_status,
                    'license_found' => $license_found,
                    'mgs' => $mgs,
                    'days_remaining' => $days_remaining,
                );

                update_option('plugin_slug_license', $plugin_slug_license);

                return $plugin_slug_license;
            }


        }


    }
}
new class_accordions_license();