<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		

		$html .= "<style type='text/css'>";	
			
		if($accordions_lazy_load=='yes'){
			
			$html .= '
			//#accordions-tabs-'.$post_id.'{display: none;}';
		
			}
				
		$html .= '
		#accordions-tabs-'.$post_id.'{
				text-align: '.$accordions_container_text_align.';}';	
			

		$html .= '
		#accordions-tabs-'.$post_id.'{
				background:'.$accordions_container_bg_color.' url('.$accordions_bg_img.') repeat scroll 0 0;
				padding: '.$accordions_container_padding.';
				}';			

		$html .= '
		#accordions-tabs-'.$post_id.' .accordions-tab-head{
			background:rgba('.accordions_paratheme_hex2rgb($accordions_default_bg_color).','.$accordions_header_bg_opacity.') none repeat scroll 0 0;
			color:'.$accordions_items_title_color.';
			font-size:'.$accordions_items_title_font_size.';
			
			margin:'.$accordions_items_title_margin.';
			padding:'.$accordions_items_title_padding.';			
			}		
		
		#accordions-tabs-'.$post_id.' .accordions-head-title{
			
			}
		
		
		#accordions-tabs-'.$post_id.' .ui-tabs-active a{
			background: '.$accordions_active_bg_color.';
		
			}';


		$html .= '
		#accordions-tabs-'.$post_id.' .tabs-content{
				background:rgba('.accordions_paratheme_hex2rgb($accordions_items_content_bg_color).','.$accordions_items_content_bg_opacity.') none repeat scroll 0 0;
				
				color:'.$accordions_items_content_color.';
				font-size:'.$accordions_items_content_font_size.';
				margin:'.$accordions_items_content_margin.';
				padding:'.$accordions_items_content_padding.';
				}
				';


		$html .= '
		#accordions-tabs-'.$post_id.' .accordions-tab-icons{
				color:'.$accordions_icons_color.';
				font-size:'.$accordions_icons_font_size.';				
				}
				';		
	
	

		$html .= '</style>';
			
			
			
		if(!empty($accordions_custom_css)){
				$html .= '<style type="text/css">'.$accordions_custom_css.'</style>';	
			}
			
			
			
			
		if($accordions_tabs_vertical=='yes'){
				$html .= '<style type="text/css">
				
  .ui-tabs-vertical { width: 55em; }
  .ui-tabs-vertical .ui-tabs-nav { float: left; width: 200px;overflow: hidden; }
  .ui-tabs-vertical .ui-tabs-nav li { clear: left; width: 100%; }
  .ui-tabs-vertical .ui-tabs-panel { padding: 1em; float: left; width: 40em;}
				
				</style>';	
			}			
			
			
		if($accordions_tabs_icon_toggle=='yes'){
				$html .= '<style type="text/css">
				
.accordions-tabs .ui-tabs-active .accordions-tab-plus {
  display: none;
}

.accordions-tabs .ui-tabs-active .accordions-tab-minus {
  display: inline;
}
				
				</style>';	
			}			
			
			
			
			