<?php
/*
Plugin Name: Accordions by PickPlugins
Plugin URI: https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=dashboard
Description: Fully responsive and mobile ready accordion grid for wordpress.
Version: 3.2.7
Author: PickPlugins
Author URI: http://pickplugins.com
Text Domain: accordions
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


class Accordions{
	
	public function __construct(){

		define('accordions_plugin_url', plugins_url('/', __FILE__)  );
		define('accordions_plugin_dir', plugin_dir_path( __FILE__ ) );


        define('accordions_version', '3.2.7' );
        define('accordions_server_url', 'https://www.pickplugins.com' );
        define('accordions_plugin_basename', plugin_basename( __FILE__ ) );


        require_once( plugin_dir_path( __FILE__ ) . 'includes/accordions-meta-box.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/functions/functions-accordions-meta-box.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/functions/functions-duplicate-post.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/functions/functions-wc.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/functions/functions-accordions-settings.php');


        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-functions.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-accordions-support.php');

        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-wp-autoupdate.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-accordions-license.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-settings.php');
        require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-settings-tabs.php');

		require_once( plugin_dir_path( __FILE__ ) . 'includes/functions.php');



		require_once( plugin_dir_path( __FILE__ ) . 'includes/classes/class-shortcodes.php');

        //require_once( plugin_dir_path( __FILE__ ) . 'includes/class-WPAdminSettings.php');
        //require_once( plugin_dir_path( __FILE__ ) . 'includes/class-settings.php');




		add_action( 'wp_enqueue_scripts', array( $this, 'accordions_front_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'accordions_admin_scripts' ) );
		
		add_action( 'plugins_loaded', array( $this, 'accordions_load_textdomain' ));
		
		
		require_once( plugin_dir_path( __FILE__ ) . 'includes/class-widget-accordions.php');		
				
		add_action( 'widgets_init', array( $this, 'widget_register' ) );
		
		// Display shortcode in widgets
		add_filter('widget_text', 'do_shortcode');
	}
	
	public function widget_register() {
		register_widget( 'WidgetAccordions' );
	}
	
	public function accordions_load_textdomain() {
		
		load_plugin_textdomain( 'accordions', false, plugin_basename( dirname( __FILE__ ) ) . '/languages/' );
		}
	
	
	public function accordions_install(){
		
		do_action( 'accordions_action_install' );
		
		}		
		
	public function accordions_uninstall(){
		
		do_action( 'accordions_action_uninstall' );
		}		
		
	public function accordions_deactivation(){
		
		do_action( 'accordions_action_deactivation' );
		}
	
	
	public function accordions_front_scripts(){


		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script('jquery-ui-accordion');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-effects-core');			
		wp_enqueue_script('accordions_js', plugins_url( 'assets/frontend/js/scripts.js' , __FILE__ ) , array( 'jquery' ));
		wp_localize_script( 'accordions_js', 'accordions_ajax', array( 'accordions_ajaxurl' => admin_url( 'admin-ajax.php')));

		//wp_enqueue_style('jquery-ui', plugins_url( 'assets/frontend/css/jquery-ui.css', __FILE__ ));
		//wp_enqueue_style('accordions_style', plugins_url( 'assets/frontend/css/style.css', __FILE__ ));
		//wp_enqueue_style('accordions_themes.style', plugins_url( 'assets/global/css/themes.style.css', __FILE__ ));
		//wp_enqueue_style('accordions_themes.Tabs.style', plugins_url( 'assets/global/css/themesTabs.style.css', __FILE__ ));
		//wp_enqueue_style('fontawesome.min', plugins_url( 'assets/global/css/fontawesome.min.css', __FILE__ ));


		}

	public function accordions_admin_scripts(){

        global $post;

        if( !empty($post)) {

            if ($post->post_type == 'accordions') {

                wp_enqueue_editor();

            }

        }

		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-ui-sortable');
        wp_enqueue_script( 'jquery-ui-core' );
        wp_enqueue_script('jquery-ui-accordion');
        wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('accordions_admin_js', plugins_url( 'assets/admin/js/scripts.js' , __FILE__ ) , array( 'jquery' ));
		wp_localize_script( 'accordions_admin_js', 'L10n_accordions', array(
							'confirm_text' => __( 'Confirm', 'accordions' )
							));

		wp_localize_script( 'accordions_admin_js', 'accordions_ajax', array( 'accordions_ajaxurl' => admin_url( 'admin-ajax.php')));



		wp_enqueue_style('accordions_admin_style', plugins_url( 'assets/admin/css/style.css', __FILE__ ));
		//wp_enqueue_style('fontawesome-4', plugins_url( 'assets/global/css/fontawesome.min.css', __FILE__ ));
        wp_enqueue_style('fontawesome-5.min', plugins_url( 'assets/global/css/fontawesome-5.min.css', __FILE__ ));

        wp_enqueue_script('accordion-editor', plugins_url( 'assets/admin/js/accordion-editor.js' , __FILE__ ) , array( 'jquery' ));
        wp_enqueue_style('accordion-editor', plugins_url( 'assets/admin/css/accordion-editor.css', __FILE__ ));

        wp_enqueue_script('codemirror', plugins_url( 'assets/admin/js/codemirror.js' , __FILE__ ) , array( 'jquery' ));
        wp_enqueue_style('codemirror', plugins_url( 'assets/admin/css/codemirror.css', __FILE__ ));

        wp_enqueue_script('settings-tabs', plugins_url( 'assets/admin/js/settings-tabs.js' , __FILE__ ) , array( 'jquery' ));
        wp_enqueue_style('settings-tabs', plugins_url( 'assets/admin/css/settings-tabs.css', __FILE__ ));

		
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'accordions_color_picker', plugins_url('assets/admin/js/color-picker.js', __FILE__ ), array( 'wp-color-picker' ), false, true );

		}

	}

new Accordions();
