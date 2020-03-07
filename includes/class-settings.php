<?php
if ( ! defined('ABSPATH')) exit;  // if direct access 	


class accordions_class_settings{
	
	
    public function __construct(){

		add_action( 'admin_menu', array( $this, 'admin_menu' ), 12 );

    }
	
	
	public function admin_menu() {

        add_submenu_page( 'edit.php?post_type=accordions', __( 'Settings', 'accordions' ), __( 'Settings', 'accordions' ), 'manage_options', 'settings', array( $this, 'settings' ) );


	}
	
	public function settings(){
        include( 'menu/settings.php' );

    }

}

new accordions_class_settings();

