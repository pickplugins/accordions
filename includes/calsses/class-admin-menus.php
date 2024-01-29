<?php
if (!defined('ABSPATH')) exit;  // if direct access 	


class Accordions_admin_menus
{


    public function __construct()
    {

        add_action('admin_menu', array($this, 'admin_menu'), 12);
    }


    public function admin_menu()
    {

        $accordions_plugin_info = get_option('accordions_plugin_info');
        $accordions_upgrade = isset($accordions_plugin_info['accordions_upgrade']) ? $accordions_plugin_info['accordions_upgrade'] : '';

        add_menu_page(__('Accordions', 'mail-picker'), __('Accordions', 'mail-picker'), 'manage_options', 'accordions', array($this, 'accordions'), 'dashicons-email');
    }

    public function accordions()
    {
        include('menu/accordions.php');
    }
}

new Accordions_admin_menus();
