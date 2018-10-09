<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		
		
	if(isset($_GET['id'])){
		
		$accordions_active_accordion = (int)sanitize_text_field($_GET['id']);
		}
	
			
			$html.= '<script>
					jQuery(document).ready(function($)
					{';
						
					if($accordions_tabs_vertical=='yes'){
						
						$html.= '
						
						$(function() {
							$( "#accordions-tabs-'.$post_id.'" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
							$( "#accordions-tabs-'.$post_id.' li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
						});
						
						$("#accordions-tabs-'.$post_id.'" ).tabs({
								collapsible: '.$accordions_tabs_collapsible.',
								event: "'.$accordions_tabs_active_event.'",
								active: "'.$accordions_active_accordion.'",
															
								});
								';
						
						}
					else{
						
						$html.= '
						$( "#accordions-tabs-'.$post_id.'" ).tabs({
								collapsible: '.$accordions_tabs_collapsible.',
								event: "'.$accordions_tabs_active_event.'",
								active: "'.$accordions_active_accordion.'",								
								});
								';
						
						
						}
						

							
							
							
				$html.= '	})

					</script>';

		
		
		
		
		
		
		
		
		



		
		
		
		
		
		
		