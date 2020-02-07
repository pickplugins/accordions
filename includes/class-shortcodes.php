<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access


class class_accordions_shortcodes  {
	
	
    public function __construct(){
		


		add_shortcode( 'accordions', array( $this, 'accordions_display' ) );
		add_shortcode( 'accordions_pplugins', array( $this, 'accordions_display' ) );	// avoid conflict
		add_shortcode( 'accordions_pickplguins', array( $this, 'accordions_display' ) );
		
		add_shortcode( 'accordions_tabs', array( $this, 'accordions_tabs_display' ) );		
		add_shortcode( 'accordions_tabs_pplugins', array( $this, 'accordions_tabs_display' ) );	 // avoid conflict



		}

	
	public function accordions_display($atts, $content = null ) {
			$atts = shortcode_atts(
				array(
					'id' => "",
	
					), $atts);
	
				$post_id = $atts['id'];
	
				$accordions_themes = get_post_meta( $post_id, 'accordions_themes', true );

				ob_start();
				include accordions_plugin_dir.'/templates/accordion/accordion.php';
				return ob_get_clean();
				//return $html;

		}

	
	public function accordions_tabs_display($atts, $content = null ) {



        $atts = shortcode_atts(
            array(

                'id' => "",

                ), $atts);

        $post_id = $atts['id'];

        $accordions_tabs_themes = get_post_meta( $post_id, 'accordions_tabs_themes', true );

        ob_start();
        include accordions_plugin_dir.'/templates/tabs/tabs.php';



		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-core' );
		//wp_enqueue_script('jquery-ui-accordion');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-effects-core');



        return ob_get_clean();

    }
	

}

new class_accordions_shortcodes();