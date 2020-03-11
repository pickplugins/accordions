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

				ob_start();
				?>
                <div id="accordions-<?php echo $post_id; ?>" class="accordions-<?php echo $post_id; ?> accordions">
                    <?php
                    do_action('accordions_main', $atts);
                    ?>
                </div>
                <?php

				return ob_get_clean();
		}

	
	public function accordions_tabs_display($atts, $content = null ) {

        $atts = shortcode_atts(
            array(
                'id' => "",
                ),
            $atts);

        $post_id = $atts['id'];

        ob_start();

        ?>
        <div id="accordions-tabs-<?php echo $post_id; ?>" class="accordions-tabs-<?php echo $post_id; ?> accordions-tabs">
            <?php
            do_action('accordions_tabs_main', $atts);
            ?>
        </div>
        <?php

        return ob_get_clean();

    }
	

}

new class_accordions_shortcodes();