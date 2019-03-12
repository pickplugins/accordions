<?php

/*
* @Author 		PickPlugins
* Copyright: 	2015 PickPlugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 	

if( ! class_exists( 'class_accordions_settings' ) ) {
    class class_accordions_settings
    {

        public function __construct()
        {

            add_action('admin_menu', array($this, 'admin_menu'), 12);

        }


        public function admin_menu()
        {

            add_submenu_page('edit.php?post_type=accordions', __('Settings', 'woocommerce-products-slider'), __('Settings', 'woocommerce-products-slider'), 'manage_options', 'accordions_settings', array($this, 'settings_page'));

        }

        public function settings_page()
        {

            include(accordions_plugin_dir . 'includes/menu/settings.php');

        }


    }
}
	new class_accordions_settings();