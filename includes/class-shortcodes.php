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
	
				$html = '';
				$post_id = $atts['id'];
	
				$accordions_themes = get_post_meta( $post_id, 'accordions_themes', true );

				ob_start();
				include accordions_plugin_dir.'/templates/accordion/accordion.php';
				echo $html;
				return ob_get_clean();
				//return $html;

		}

	
	public function accordions_tabs_display($atts, $content = null ) {


        $atts = shortcode_atts(
            array(
                'id' => "",

                ), $atts);

            $html = '';
            $post_id = $atts['id'];

            $accordions_tabs_themes = get_post_meta( $post_id, 'accordions_tabs_themes', true );

            include accordions_plugin_dir.'/templates/tabs/variables.php';
            include accordions_plugin_dir.'/templates/tabs/tabs-scripts.php';
            include accordions_plugin_dir.'/templates/tabs/tabs-custom-css.php';
            include accordions_plugin_dir.'/templates/tabs/tabs-lazy.php';




            if(empty($accordions_tabs_themes)){

                $accordions_tabs_themes = 'flat';
                }


            $html.= '<div id="accordions-tabs-'.$post_id.'" class="accordions-tabs-themes accordions-tabs '.$accordions_tabs_themes.' accordions-tabs-'.$post_id.'">';
            $html.= '<ul>';



                if(!empty($accordions_content_title))
                foreach ($accordions_content_title as $index => $accordions_title){

                    if(empty($accordions_hide[$index])){

                            include accordions_plugin_dir.'/templates/tabs/tabs-header.php';


                        }
                    }

            $html.= '</ul>';


                if(!empty($accordions_content_title))
                foreach ($accordions_content_title as $index => $accordions_title){

                    if(empty($accordions_hide[$index])){
                        $html.= '<div class="tabs-content" id="tabs-'.$index.'">';

                            include accordions_plugin_dir.'/templates/tabs/tabs-content.php';
                        $html.= '</div>';
                        }
                    }


            $html.= '</div>';


            $html.= '<link rel="stylesheet" type="text/css" media="all" href="'.accordions_plugin_url.'assets/frontend/css/jquery-ui.css?ver=20181018"/>';
            $html.= '<link rel="stylesheet" type="text/css" media="all" href="'.accordions_plugin_url.'assets/global/css/fontawesome.min.css?ver=20181018"/>';

            return $html;

        }
	

}

new class_accordions_shortcodes();