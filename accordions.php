<?php
/*
Plugin Name: Accordions - By PickPlugins
Plugin URI: https://pickplugins.com/accordions/
Description: Fully responsive and mobile ready accordion grid for wordpress.
Version: 2.3.8
Author: PickPlugins
Author URI: http://pickplugins.com
Text Domain: accordions
Domain Path: /languages
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) exit;  // if direct access 


class Accordions
{

  public function __construct()
  {

    define('accordions_plugin_url', plugins_url('/', __FILE__));
    define('accordions_plugin_dir', plugin_dir_path(__FILE__));
    define('accordions_version', '2.3.8');
    define('accordions_plugin_name', 'Accordions Combo');
    define('accordions_plugin_basename', plugin_basename(__FILE__));

    $accordionsCss = '';
    $accordionsCustomCss = '';
    $accordionsCustomScripts = '';
    $accordionsActiveIndex = [];
    $accordionsSchema = [];
    $accordionsAttrData = [];


    global $accordionsSchema;
    global $accordionsCss;
    global $accordionsCss;
    global $accordionsCustomCss;
    global $accordionsBuilderCss;
    global $accordionsCustomScripts;
    global $accordionsActiveIndex;
    global $accordionsTabsActiveIndex;


    require_once(accordions_plugin_dir . 'includes/class-post-types.php');

    require_once(accordions_plugin_dir . 'includes/class-post-meta-accordions.php');
    require_once(accordions_plugin_dir . 'includes/class-post-meta-accordions-hook.php');

    require_once(accordions_plugin_dir . 'includes/class-settings.php');
    require_once(accordions_plugin_dir . 'includes/class-settings-hook.php');

    require_once(accordions_plugin_dir . 'includes/class-post-meta-product.php');
    require_once(accordions_plugin_dir . 'includes/class-admin-notices.php');
    require_once(accordions_plugin_dir . 'includes/functions-data-upgrade.php');

    require_once(accordions_plugin_dir . 'includes/functions-rest.php');

    require_once(accordions_plugin_dir . 'includes/class-settings-tabs.php');
    require_once(accordions_plugin_dir . 'includes/functions.php');
    require_once(accordions_plugin_dir . 'includes/functions-wc.php');
    require_once(accordions_plugin_dir . 'includes/functions-builder.php');
    require_once(accordions_plugin_dir . 'includes/class-shortcodes.php');
    require_once(accordions_plugin_dir . 'includes/duplicate-post.php');



    require_once(accordions_plugin_dir . 'templates/accordion/accordion-hook.php');
    require_once(accordions_plugin_dir . 'templates/tabs/tabs-hook.php');
    require_once(accordions_plugin_dir . 'templates/accordions-builder/accordions-builder-hook.php');
    require_once(accordions_plugin_dir . 'templates/accordions-builder/accordions-builder-functions.php');

    require_once(accordions_plugin_dir . 'templates/tabs-builder/tabs-builder-hook.php');
    require_once(accordions_plugin_dir . 'templates/image-accordion/index.php');

    require_once(accordions_plugin_dir . 'includes/3rd-party/3rd-party.php');


    register_activation_hook(__FILE__, array($this, '_activation'));

    add_action('wp_enqueue_scripts', array($this, '_front_scripts'));
    add_action('admin_enqueue_scripts', array($this, '_admin_scripts'));

    add_action('plugins_loaded', array($this, '_textdomain'));
    add_filter('cron_schedules', array($this, 'cron_recurrence_interval'));


    require_once(accordions_plugin_dir . 'includes/class-widget-accordions.php');

    add_action('widgets_init', array($this, 'widget_register'));
    add_action('before_woocommerce_init', array($this, 'high_performance_order_storage'));

    // Display shortcode in widgets
    add_filter('widget_text', 'do_shortcode');
    add_filter('plugin_action_links_' . accordions_plugin_basename, array($this, 'plugin_list_pro_link'));
  }

  function high_performance_order_storage()
  {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
      \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
  }

  public function widget_register()
  {
    register_widget('WidgetAccordions');
  }

  public function _textdomain()
  {

    $locale = apply_filters('plugin_locale', get_locale(), 'accordions');
    load_textdomain('accordions', WP_LANG_DIR . '/accordions/accordions-' . $locale . '.mo');

    load_plugin_textdomain('accordions', false, plugin_basename(dirname(__FILE__)) . '/languages/');
  }

  function cron_recurrence_interval($schedules)
  {

    $schedules['1minute'] = array(
      'interval' => 40,
      'display' => __('1 Minute', 'accordions')
    );


    return $schedules;
  }

  public function _install()
  {

    do_action('accordions_action_install');
  }

  public function _uninstall()
  {

    do_action('accordions_action_uninstall');
  }


  public function _activation()
  {

    $accordions_post_types = new accordions_post_types();
    $accordions_post_types->_posttype_accordions();
    flush_rewrite_rules();
  }


  public function _deactivation()
  {

    do_action('accordions_action_deactivation');
  }


  public function _front_scripts()
  {
    wp_register_style('accordions_animate', accordions_plugin_url . 'assets/css/animate.min.css');


    wp_register_script('accordions_front_scripts', accordions_plugin_url . 'templates/accordions-builder/front-scripts.js', array('jquery'), '20181018');
    wp_register_script('tabs_front_scripts', accordions_plugin_url . 'templates/tabs-builder/front-scripts.js', array('jquery'), '20181018');
    wp_register_script('image_accordion_front_scripts', accordions_plugin_url . 'templates/image-accordion/front-scripts.js', array('jquery'), '20181018');

    wp_register_script('accordions_js', accordions_plugin_url . 'assets/frontend/js/scripts.js', array('jquery'), time(), true);
    wp_register_style('accordions-style', accordions_plugin_url . 'assets/frontend/css/style.css');
    wp_register_style('style-tabs', accordions_plugin_url . 'assets/global/css/style-tabs.css');

    wp_register_style('accordions-tabs', accordions_plugin_url . 'assets/global/css/themesTabs.style.css');
    wp_register_style('fontawesome-5',  accordions_plugin_url . 'assets/global/css/font-awesome-5.css');
    wp_register_style('fontawesome-4',  accordions_plugin_url . 'assets/global/css/font-awesome-4.css');
    wp_register_style('jquery-ui',  accordions_plugin_url . 'assets/frontend/css/jquery-ui.css');
    wp_register_style('accordions-themes',  accordions_plugin_url . 'assets/global/css/themes.style.css');

    wp_register_style('bootstrap-icons', accordions_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');
    wp_register_style('fontawesome-icons', accordions_plugin_url . 'assets/css/fontawesome/css/all.min.css');
    wp_register_style('icofont-icons', accordions_plugin_url . 'assets/css/icofont/icofont.min.css');
  }

  public function _admin_scripts()
  {
    $screen = get_current_screen();

    //var_dump($screen);

    wp_register_style('accordions_animate', accordions_plugin_url . 'assets/css/animate.min.css');


    wp_enqueue_script('accordions_admin_js', accordions_plugin_url . 'assets/admin/js/scripts.js', array('jquery'), '20181018');
    wp_localize_script('accordions_admin_js', 'accordions_ajax', array('accordions_ajaxurl' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('accordions_nonce')));

    wp_register_style('settings-tabs', accordions_plugin_url . 'assets/settings-tabs/settings-tabs.css');
    wp_register_script('settings-tabs', accordions_plugin_url . 'assets/settings-tabs/settings-tabs.js', array('jquery'));

    wp_register_style('font-awesome-4', accordions_plugin_url . 'assets/global/css/font-awesome-4.css');
    wp_register_style('font-awesome-5', accordions_plugin_url . 'assets/global/css/font-awesome-5.css');

    if ($screen->id == 'accordions' || $screen->id == 'accordions_page_accordions-settings') {
      $settings_tabs_field = new settings_tabs_field();
      $settings_tabs_field->admin_scripts();
    }
  }

  public function plugin_list_pro_link($links)
  {

    $active_plugins = get_option('active_plugins');

    if (!in_array('accordions-pro/accordions-pro.php', (array) $active_plugins)) {
      $links['get_premium'] = '<a target="_blank" class="" style=" font-weight:bold;" href="https://pickplugins.com/accordions/?ref=dashboard">' . __('Buy Premium!', 'accordions') . '</a>';
    }



    return $links;
  }
}

new Accordions();
