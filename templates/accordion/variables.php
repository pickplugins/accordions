<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 
		

$accordions_collapsible = get_post_meta( $post_id, 'accordions_collapsible', true );
if(empty($accordions_collapsible)){$accordions_collapsible = 'true';}

$accordions_expaned_other = get_post_meta( $post_id, 'accordions_expaned_other', true );
if(empty($accordions_expaned_other)){$accordions_expaned_other = 'no';}

$accordions_heightStyle = get_post_meta( $post_id, 'accordions_heightStyle', true );
if(empty($accordions_heightStyle)){$accordions_heightStyle = 'content';}

$accordions_active_accordion = get_post_meta( $post_id, 'accordions_active_accordion', true );
if(!isset($accordions_active_accordion )){$accordions_active_accordion = 99999;}

$accordions_click_scroll_top = get_post_meta( $post_id, 'accordions_click_scroll_top', true );
if(empty($accordions_click_scroll_top)){$accordions_click_scroll_top = 'no';}

$accordions_header_toggle = get_post_meta( $post_id, 'accordions_header_toggle', true );
if(empty($accordions_header_toggle)){$accordions_header_toggle = 'no';}


$accordions_click_scroll_top_offset = get_post_meta( $post_id, 'accordions_click_scroll_top_offset', true );
if(empty($accordions_click_scroll_top_offset)){$accordions_click_scroll_top_offset = 0;}

$accordions_active_event = get_post_meta( $post_id, 'accordions_active_event', true );
if(empty($accordions_active_event)){$accordions_active_event = 'click';}

$accordions_lazy_load = get_post_meta( $post_id, 'accordions_lazy_load', true );
if(empty($accordions_lazy_load)){$accordions_lazy_load = 'yes';}

$accordions_lazy_load_src = get_post_meta( $post_id, 'accordions_lazy_load_src', true );

$accordions_animate_style = get_post_meta( $post_id, 'accordions_animate_style', true );
if(empty($accordions_animate_style)){$accordions_animate_style = 'swing';}

$accordions_animate_delay = get_post_meta( $post_id, 'accordions_animate_delay', true );
if(empty($accordions_animate_delay)){$accordions_animate_delay = 1000;}


$accordions_hide_edit = get_post_meta( $post_id, 'accordions_hide_edit', true );
if(empty($accordions_hide_edit)){$accordions_hide_edit = 'yes';}

$accordions_expand_collapse_display = get_post_meta( $post_id, 'accordions_expand_collapse_display', true );
if(empty($accordions_expand_collapse_display)){$accordions_expand_collapse_display = 'no';}


$accordions_child = get_post_meta( $post_id, 'accordions_child', true );
if(empty($accordions_child)){$accordions_child = 'no';}

$accordions_themes = get_post_meta( $post_id, 'accordions_themes', true );
if(empty($accordions_themes)){$accordions_themes = 'flat';}

$accordions_container_padding = get_post_meta( $post_id, 'accordions_container_padding', true );
if(empty($accordions_container_padding)){$accordions_container_padding = 0;}

$accordions_container_bg_color = get_post_meta( $post_id, 'accordions_container_bg_color', true );
if(empty($accordions_container_bg_color)){$accordions_container_bg_color = '';}

$accordions_container_text_align = get_post_meta( $post_id, 'accordions_container_text_align', true );
if(empty($accordions_container_text_align)){$accordions_container_text_align = 'left';}

$accordions_bg_img = get_post_meta( $post_id, 'accordions_bg_img', true );
if(empty($accordions_bg_img)){$accordions_bg_img = '';}

$accordions_header_bg_img = get_post_meta( $post_id, 'accordions_header_bg_img', true );
if(empty($accordions_header_bg_img )){$accordions_header_bg_img  = array();}


$accordions_icons_plus = get_post_meta( $post_id, 'accordions_icons_plus', true );
if(empty($accordions_icons_plus)){$accordions_icons_plus = 'fa-chevron-up';}

$accordions_icons_minus = get_post_meta( $post_id, 'accordions_icons_minus', true );
if(empty($accordions_icons_minus)){$accordions_icons_minus = 'fa-chevron-down';}

$accordions_icons_color = get_post_meta( $post_id, 'accordions_icons_color', true );
if(empty($accordions_icons_color)){$accordions_icons_color = '#565656';}

$accordions_icons_color_hover = get_post_meta( $post_id, 'accordions_icons_color_hover', true );
if(empty($accordions_icons_color_hover)){$accordions_icons_color_hover = '#999';}


$accordions_icons_font_size = get_post_meta( $post_id, 'accordions_icons_font_size', true );
if(empty($accordions_icons_font_size)){$accordions_icons_font_size = '16px';}

$accordions_icons_position = get_post_meta( $post_id, 'accordions_icons_position', true );
if(empty($accordions_icons_position)){$accordions_icons_position = 'left';}

$accordions_default_bg_color = get_post_meta( $post_id, 'accordions_default_bg_color', true );
if(empty($accordions_default_bg_color)){$accordions_default_bg_color = '#70b0ff';}

$accordions_header_bg_opacity = get_post_meta( $post_id, 'accordions_header_bg_opacity', true );
if(empty($accordions_header_bg_opacity)){$accordions_header_bg_opacity = '1';}


$accordions_active_bg_color = get_post_meta( $post_id, 'accordions_active_bg_color', true );
if(empty($accordions_active_bg_color)){$accordions_active_bg_color = '#4b8fe3';}

$accordions_bg_color = get_post_meta( $post_id, 'accordions_bg_color', true );
if(empty($accordions_active_bg_color)){$accordions_active_bg_color = '#ffffff';}

$accordions_items_title_color = get_post_meta( $post_id, 'accordions_items_title_color', true );
if(empty($accordions_items_title_color)){$accordions_items_title_color = '#ffffff';}

$accordions_items_title_color_hover = get_post_meta( $post_id, 'accordions_items_title_color_hover', true );
if(empty($accordions_items_title_color_hover)){$accordions_items_title_color_hover = '#000';}

$accordions_items_title_font_family = get_post_meta( $post_id, 'accordions_items_title_font_family', true );
if(empty($accordions_items_title_font_family)){$accordions_items_title_font_family = '';}

$accordions_items_title_font_size = get_post_meta( $post_id, 'accordions_items_title_font_size', true );
if(empty($accordions_items_title_font_size)){$accordions_items_title_font_size = '14px';}

$accordions_items_title_padding = get_post_meta( $post_id, 'accordions_items_title_padding', true );
if(empty($accordions_items_title_padding)){$accordions_items_title_padding = '10px';}

$accordions_items_title_margin = get_post_meta( $post_id, 'accordions_items_title_margin', true );
if(empty($accordions_items_title_margin)){$accordions_items_title_margin = '1px';}

$accordions_items_content_color = get_post_meta( $post_id, 'accordions_items_content_color', true );
if(empty($accordions_items_content_color)){$accordions_items_content_color = '#333333';}

$accordions_items_content_font_family = get_post_meta( $post_id, 'accordions_items_content_font_family', true );
if(empty($accordions_items_content_font_family)){$accordions_items_content_font_family = '';}

$accordions_items_content_font_size = get_post_meta( $post_id, 'accordions_items_content_font_size', true );
if(empty($accordions_items_content_font_size)){$accordions_items_content_font_size = '13px';}

$accordions_items_content_bg_color = get_post_meta( $post_id, 'accordions_items_content_bg_color', true );
if(empty($accordions_items_content_bg_color)){$accordions_items_content_bg_color = '#ffffff';}

$accordions_items_content_bg_opacity = get_post_meta( $post_id, 'accordions_items_content_bg_opacity', true );
if(empty($accordions_items_content_bg_opacity)){$accordions_items_content_bg_opacity = 1;}


$accordions_items_content_padding = get_post_meta( $post_id, 'accordions_items_content_padding', true );
if(empty($accordions_items_content_padding)){$accordions_items_content_padding = '10px';}

$accordions_items_content_margin = get_post_meta( $post_id, 'accordions_items_content_margin', true );
if(empty($accordions_items_content_margin)){$accordions_items_content_margin = '0';}

$accordions_content_title = get_post_meta( $post_id, 'accordions_content_title', true );
if(empty($accordions_content_title)){$accordions_content_title = array('0'=>'Demo Title');}

$accordions_content_title_toogled = get_post_meta( $post_id, 'accordions_content_title_toogled', true );
if(empty($accordions_content_title_toogled)){$accordions_content_title_toogled = array('0'=>'');}


$accordions_content_body = get_post_meta( $post_id, 'accordions_content_body', true );
if(empty($accordions_content_body)){$accordions_content_body = array('0'=>'Demo content');}

$accordions_hide = get_post_meta( $post_id, 'accordions_hide', true );
if(empty($accordions_hide)){$accordions_hide = array('0'=>'');}


$accordions_section_icon_plus = get_post_meta( $post_id, 'accordions_section_icon_plus', true );
if(empty($accordions_section_icon_plus)){$accordions_section_icon_plus = array('0'=>'fa-chevron-up');}

$accordions_section_icon_minus = get_post_meta( $post_id, 'accordions_section_icon_minus', true );
if(empty($accordions_section_icon_minus)){$accordions_section_icon_minus = array('0'=>'fa-chevron-down');}

$accordions_custom_css = get_post_meta( $post_id, 'accordions_custom_css', true );


$accordions_custom_js = get_post_meta( $post_id, 'accordions_custom_js', true );




/*tabs options*/
$accordions_tabs_collapsible = get_post_meta( $post_id, 'accordions_tabs_collapsible', true );
if(empty($accordions_tabs_collapsible)){$accordions_tabs_collapsible = 'true';}

$accordions_tabs_active_event = get_post_meta( $post_id, 'accordions_tabs_active_event', true );
if(empty($accordions_tabs_active_event)){$accordions_tabs_active_event = 'click';}

$accordions_tabs_vertical = get_post_meta( $post_id, 'accordions_tabs_vertical', true );
if(empty($accordions_tabs_vertical)){$accordions_tabs_vertical = 'no';}

$accordions_tabs_icon_toggle = get_post_meta( $post_id, 'accordions_tabs_icon_toggle', true );
if(empty($accordions_tabs_icon_toggle)){$accordions_tabs_icon_toggle = 'no';}


$accordions_click_track = get_post_meta( $post_id, 'accordions_click_track', true );
if(empty($accordions_click_track)){$accordions_click_track = 'no';}