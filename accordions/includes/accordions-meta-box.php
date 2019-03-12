<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access	

function accordions_posttype_register() {
 
        $labels = array(
                'name' => __('Accordions', 'accordions'),
                'singular_name' => __('Accordions', 'accordions'),
                'add_new' => __('New Accordions', 'accordions'),
                'add_new_item' => __('New Accordions'),
                'edit_item' => __('Edit Accordions'),
                'new_item' => __('New Accordions'),
                'view_item' => __('View Accordions'),
                'search_items' => __('Search Accordions'),
                'not_found' =>  __('Nothing found'),
                'not_found_in_trash' => __('Nothing found in Trash'),
                'parent_item_colon' => ''
        );
 
        $args = array(
                'labels' => $labels,
                'public' => false,
                'publicly_queryable' => false,
                'show_ui' => true,
                'query_var' => true,
                'menu_icon' => null,
                'rewrite' => true,
                'capability_type' => 'post',
                'hierarchical' => false,
                'menu_position' => null,
                'supports' => array('title'),
				'menu_icon' => 'dashicons-editor-justify',
				
          );
 
        register_post_type( 'accordions' , $args );

}

add_action('init', 'accordions_posttype_register');





/**
 * Adds a box to the main column on the Post and Page edit screens.
 */
function meta_boxes_accordions(){

    $screens = array( 'accordions' );
    foreach ( $screens as $screen ){

        add_meta_box('accordions_metabox',__( 'Accordions Options', 'accordions' ),'meta_boxes_accordions_input', $screen);
        add_meta_box('accordions_side_metabox',__( 'Accordions Info', 'accordions' ),'meta_boxes_accordions_side', $screen,'side');
        }

	add_meta_box('accordions_product_metabox',__( 'Product FAQ Tab', 'accordions' ),'meta_boxes_accordions_product_input', 'product', 'side', 'high');


	}
add_action( 'add_meta_boxes', 'meta_boxes_accordions' );


function meta_boxes_accordions_product_input( $post ) {

	global $post;
	wp_nonce_field( 'meta_boxes_accordions_wc_input', 'meta_boxes_accordions_wc_input_nonce' );


	$accordions_id = get_post_meta( $post->ID, 'accordions_id', true );
	$accordions_tab_title = get_post_meta( $post->ID, 'accordions_tab_title', true );

	//var_dump($accordions_id);
	?>


    <select style="width: 100%;" id="accordions_id" name="accordions_id">
        <option>Select accordion</option>
        <option value="<?php echo $accordions_id; ?>" selected><?php echo get_the_title($accordions_id); ?></option>
    </select>


    <p>
        <input style="width: 100%;" type="text" placeholder="Tab title" value="<?php echo $accordions_tab_title; ?>" name="accordions_tab_title">
    </p>


    <script>
        jQuery(document).ready(function($) {



            $('#accordions_id').select2({
                ajax: {
                    url: accordions_ajax.accordions_ajaxurl, // AJAX URL is predefined in WordPress admin
                    dataType: 'json',
                    delay: 250, // delay in ms while typing when to perform a AJAX search
                    data: function (params) {
                        return {
                            q: params.term, // search query
                            action: 'accordions_ajax_wc_get_accordions' // AJAX action for admin-ajax.php
                        };
                    },
                    processResults: function( data ) {
                        var options = [];
                        if ( data ) {

                            // data is the array of arrays, and each of them contains ID and the Label of the option
                            $.each( data, function( index, text ) { // do not forget that "index" is just auto incremented value
                                options.push( { id: text[0], text: text[1]  } );
                            });

                        }
                        return {
                            results: options
                        };
                    },
                    cache: true
                },
                minimumInputLength: 3 // the minimum of symbols to input before perform a search
            });
        })

    </script>

    <?php

}



function meta_boxes_accordions_input( $post ) {
	
	global $post;
	wp_nonce_field( 'meta_boxes_accordions_input', 'meta_boxes_accordions_input_nonce' );
	


    $accordion_settings_tab = array();


	$accordion_settings_tab[] = array(
        'id' => 'shortcode',
        'title' => __('<i class="fas fa-laptop-code"></i> Shortcode','accordions'),
        'priority' => 1,
        'active' => false,
    );


    $accordion_settings_tab[] = array(
        'id' => 'options',
        'title' => __('<i class="fa fa-cogs"></i> Options','accordions'),
        'priority' => 2,
        'active' => true,
    );

    $accordion_settings_tab[] = array(
        'id' => 'style',
        'title' => __('<i class="fas fa-palette"></i> Style','accordions'),
        'priority' => 3,
        'active' => false,
    );

    $accordion_settings_tab[] = array(
        'id' => 'content',
        'title' => __('<i class="fas fa-qrcode"></i> Content','accordions'),
        'priority' => 4,
        'active' => false,
    );


    $accordion_settings_tab[] = array(
        'id' => 'stats',
        'title' => __('<i class="fas fa-chart-line"></i> Stats','accordions'),
        'priority' => 5,
        'active' => false,
    );

    $accordion_settings_tab[] = array(
        'id' => 'custom_scripts',
        'title' => __('<i class="far fa-file-code"></i> Custom Scripts','accordions'),
        'priority' => 6,
        'active' => false,
    );


    $accordion_settings_tabs = apply_filters('accordion_settings_tabs', $accordion_settings_tab);


    $tabs_sorted = array();
    foreach ($accordion_settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset( $tab['priority'] ) ? $tab['priority'] : 0;
    array_multisort($tabs_sorted, SORT_ASC, $accordion_settings_tabs);



    $post_id = $post->ID;


?>
    <div class="accordions-meta-box">
        <div class="accordion-builder settings-tabs">
            <div class="accordion-editor">
                <div class="settings-tabs vertical">
                    <ul class="tab-navs">
                        <?php
                        foreach ($accordion_settings_tabs as $tab){
                            $id = $tab['id'];
                            $title = $tab['title'];
                            $active = $tab['active'];
                            ?>
                            <li class="tab-nav <?php if($active) echo 'active';?>" data-id="<?php echo $id; ?>"><?php echo $title; ?></li>
                            <?php
                        }
                        ?>
                    </ul>
                    <?php
                    foreach ($accordion_settings_tabs as $tab){
                        $id = $tab['id'];
                        $title = $tab['title'];
                        $active = $tab['active'];
                        ?>

                        <div class="tab-content <?php if($active) echo 'active';?>" id="<?php echo $id; ?>">
                            <?php
                            do_action('settings_tabs_content_'.$id, $tab, $post_id);
                            ?>
                        </div>
                        <?php
                    }
                    ?>
                </div>
                <div class="clear clearfix"></div>
            </div>
            <div class="accordion-preview">
                <div class="preview-output">

                    <div class="preview-header">
                        <div class="preview-title">Preview</div>
                        <div class="navs">
                            <div class="screen-size mobile" size="mobile"><i class="fas fa-mobile-alt"></i></div>
                            <div class="screen-size tablet" size="tablet"><i class="fas fa-tablet-alt"></i></div>
                            <div class="screen-size desktop" size="desktop"><i class="fas fa-desktop"></i></div>

                        </div>
                    </div>

                    <div class="clear clearfix"></div>
                    <div class="preview-main">
                        <div class="">
                            <p>Accordion</p>
                            <?php echo do_shortcode("[accordions id='".$post_id."']"); ?>

                            <p>Tabs</p>
                            <?php echo do_shortcode("[accordions_tabs id='".$post_id."']"); ?>
                        </div>

                    </div>

                    <p class="description">Preview may defers from front-end to admin because of admin css overite some basic elements, like paragraph, h1, h2 tags and etc. to get exact result please preview on front-end.</p>


                </div>


            </div>

            <script>
                jQuery(document).ready(function($){


                    $(document).on('click','.preview-output .navs .screen-size',function(){

                        size = $(this).attr('size');

                        $('.preview-main').removeClass('mobile');
                        $('.preview-main').removeClass('tablet');

                        $('.preview-main').addClass(size);




                    })

                })
            </script>

            <style type="text/css">
                .preview-output{
                    background: #fff;
                    padding: 17px 20px;
                    margin: 15px 0;
                }

                .preview-header{}

                .preview-output .preview-title{
                    display: inline-block;
                    font-size: 20px;
                }
                .preview-output .navs{
                    display: inline-block;
                    float: right;
                }
                .preview-output .screen-size{
                    display: inline-block;
                    background: #00a0d2;
                    text-align: center;
                    padding: 10px 10px;
                    cursor: pointer;
                    min-width: 20px;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 4px;
                }

                .accordion-preview{}
                .preview-main{}
                .preview-main.mobile{
                    max-width: 576px;
                    margin: 0 auto;
                }
                .preview-main.tablet{
                    max-width: 768px;
                    margin: 0 auto;
                }
                .preview-main.desktop{
                    margin: 0 auto;
                }


            </style>


        </div>
    </div>

<?php


	
}

/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */



function meta_boxes_accordions_save( $post_id ) {

  /*
   * We need to verify this came from the our screen and with proper authorization,
   * because save_post can be triggered at other times.
   */

  // Check if our nonce is set.
  if ( ! isset( $_POST['meta_boxes_accordions_input_nonce'] ) )
    return $post_id;

  $nonce = $_POST['meta_boxes_accordions_input_nonce'];

  // Verify that the nonce is valid.
  if ( ! wp_verify_nonce( $nonce, 'meta_boxes_accordions_input' ) )
      return $post_id;

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
      return $post_id;



  /* OK, its safe for us to save the data now. */

  // Sanitize user input.
 	$accordions_collapsible = sanitize_text_field( $_POST['accordions_collapsible'] );	
 	$accordions_expaned_other = sanitize_text_field( $_POST['accordions_expaned_other'] );		   
  	$accordions_heightStyle = sanitize_text_field( $_POST['accordions_heightStyle'] );	  
  	//$accordions_active_accordion = sanitize_text_field( $_POST['accordions_active_accordion'] );
	
		if(isset($_POST['accordions_active_accordion']))
			{
				$accordions_active_accordion = sanitize_text_field( $_POST['accordions_active_accordion'] );
				
			}
		else{
				$accordions_active_accordion = 999999;
			}
		  
  	$accordions_click_scroll_top = sanitize_text_field( $_POST['accordions_click_scroll_top'] );
  	$accordions_header_toggle = sanitize_text_field( $_POST['accordions_header_toggle'] );	
  	$accordions_click_scroll_top_offset = sanitize_text_field( $_POST['accordions_click_scroll_top_offset'] );	 
  	$accordions_active_event = sanitize_text_field( $_POST['accordions_active_event'] ); 	
  	$accordions_lazy_load = sanitize_text_field( $_POST['accordions_lazy_load'] );
 	$accordions_lazy_load_src = sanitize_text_field( $_POST['accordions_lazy_load_src'] );	
  	$accordions_animate_style = sanitize_text_field( $_POST['accordions_animate_style'] );  
  	$accordions_animate_delay = sanitize_text_field( $_POST['accordions_animate_delay'] );  	
  	$accordions_hide_edit = sanitize_text_field( $_POST['accordions_hide_edit'] );
	$accordions_expand_collapse_display = sanitize_text_field( $_POST['accordions_expand_collapse_display'] );

 	$accordions_child = sanitize_text_field( $_POST['accordions_child'] );
    $enable_search = sanitize_text_field( $_POST['enable_search'] );

    $accordions_width = stripslashes_deep( $_POST['accordions_width'] );

	$accordions_container_padding = sanitize_text_field( $_POST['accordions_container_padding'] );	
	$accordions_container_bg_color = sanitize_text_field( $_POST['accordions_container_bg_color'] );
	$accordions_container_text_align = sanitize_text_field( $_POST['accordions_container_text_align'] );		 
	$accordions_bg_img = sanitize_text_field( $_POST['accordions_bg_img'] );
		
	$accordions_themes = sanitize_text_field( $_POST['accordions_themes'] );
	$accordions_icons_plus = sanitize_text_field( $_POST['accordions_icons_plus'] );
	$accordions_icons_minus = sanitize_text_field( $_POST['accordions_icons_minus'] );
	$accordions_icons_color = sanitize_text_field( $_POST['accordions_icons_color'] );	
	$accordions_icons_color_hover = sanitize_text_field( $_POST['accordions_icons_color_hover'] );	
	$accordions_icons_font_size = sanitize_text_field( $_POST['accordions_icons_font_size'] );
    $accordions_icons_bg_color = sanitize_text_field( $_POST['accordions_icons_bg_color'] );
    $accordions_icons_padding = sanitize_text_field( $_POST['accordions_icons_padding'] );

	$accordions_icons_position = sanitize_text_field( $_POST['accordions_icons_position'] );	

	$accordions_default_bg_color = sanitize_text_field( $_POST['accordions_default_bg_color'] );	
	$accordions_active_bg_color = sanitize_text_field( $_POST['accordions_active_bg_color'] );
	$accordions_header_bg_opacity = sanitize_text_field( $_POST['accordions_header_bg_opacity'] );	
	
	
	$accordions_bg_color = stripslashes_deep( $_POST['accordions_bg_color'] );
	$accordions_header_bg_img = stripslashes_deep( $_POST['accordions_header_bg_img'] );	

	$accordions_items_title_color = sanitize_text_field( $_POST['accordions_items_title_color'] );	
	$accordions_items_title_color_hover = sanitize_text_field( $_POST['accordions_items_title_color_hover'] );	
	$accordions_items_title_font_family = sanitize_text_field( $_POST['accordions_items_title_font_family'] );
	$accordions_items_title_font_size = sanitize_text_field( $_POST['accordions_items_title_font_size'] );
	$accordions_items_title_margin = sanitize_text_field( $_POST['accordions_items_title_margin'] );	
	$accordions_items_title_padding = sanitize_text_field( $_POST['accordions_items_title_padding'] );	

	$accordions_items_content_color = sanitize_text_field( $_POST['accordions_items_content_color'] );	
	$accordions_items_content_font_family = sanitize_text_field( $_POST['accordions_items_content_font_family'] );	
	$accordions_items_content_font_size = sanitize_text_field( $_POST['accordions_items_content_font_size'] );	
	$accordions_items_content_bg_color = sanitize_text_field( $_POST['accordions_items_content_bg_color'] );
	$accordions_items_content_bg_opacity = sanitize_text_field( $_POST['accordions_items_content_bg_opacity'] );	
	$accordions_items_content_padding = sanitize_text_field( $_POST['accordions_items_content_padding'] );	
	$accordions_items_content_margin = sanitize_text_field( $_POST['accordions_items_content_margin'] );			
	
	$accordions_content_title = stripslashes_deep( $_POST['accordions_content_title'] );	
	$accordions_content_title_toggled = stripslashes_deep( $_POST['accordions_content_title_toggled'] );
	$accordions_content_body = stripslashes_deep( $_POST['accordions_content_body'] );		
	
	$accordions_section_icon_plus = stripslashes_deep( $_POST['accordions_section_icon_plus'] );	
	$accordions_section_icon_minus = stripslashes_deep( $_POST['accordions_section_icon_minus'] );	
		
	
	
	if(empty($_POST['accordions_hide']))
		{
			$_POST['accordions_hide'] = '';	
		}
	
	$accordions_hide = stripslashes_deep( $_POST['accordions_hide'] );	
	
	$accordions_custom_css = stripslashes_deep( $_POST['accordions_custom_css'] );
    $accordions_custom_js = $_POST['accordions_custom_js'];

	$accordions_tabs_collapsible = sanitize_text_field( $_POST['accordions_tabs_collapsible'] );
	$accordions_tabs_active_event = sanitize_text_field( $_POST['accordions_tabs_active_event'] );
	$accordions_tabs_vertical = sanitize_text_field( $_POST['accordions_tabs_vertical'] );
    $accordions_tabs_vertical_width_ratio = sanitize_text_field( $_POST['accordions_tabs_vertical_width_ratio'] );
	$accordions_tabs_icon_toggle = sanitize_text_field( $_POST['accordions_tabs_icon_toggle'] );
	$accordions_click_track = sanitize_text_field( $_POST['accordions_click_track'] );

  // Update the meta field in the database.
 	update_post_meta( $post_id, 'accordions_collapsible', $accordions_collapsible );
 	update_post_meta( $post_id, 'accordions_expaned_other', $accordions_expaned_other );	
 	update_post_meta( $post_id, 'accordions_heightStyle', $accordions_heightStyle );		  
 	update_post_meta( $post_id, 'accordions_active_accordion', $accordions_active_accordion );
 	update_post_meta( $post_id, 'accordions_click_scroll_top', $accordions_click_scroll_top );
 	update_post_meta( $post_id, 'accordions_header_toggle', $accordions_header_toggle );	
 	update_post_meta( $post_id, 'accordions_click_scroll_top_offset', $accordions_click_scroll_top_offset );	
 	update_post_meta( $post_id, 'accordions_active_event', $accordions_active_event );
 	update_post_meta( $post_id, 'accordions_lazy_load', $accordions_lazy_load );
 	update_post_meta( $post_id, 'accordions_lazy_load_src', $accordions_lazy_load_src );					  
 	update_post_meta( $post_id, 'accordions_animate_style', $accordions_animate_style );  
 	update_post_meta( $post_id, 'accordions_animate_delay', $accordions_animate_delay );  	
 	update_post_meta( $post_id, 'accordions_hide_edit', $accordions_hide_edit );
	update_post_meta( $post_id, 'accordions_expand_collapse_display', $accordions_expand_collapse_display );


	update_post_meta( $post_id, 'accordions_child', $accordions_child );
    update_post_meta( $post_id, 'enable_search', $enable_search );

    update_post_meta( $post_id, 'accordions_width', $accordions_width );
	
	update_post_meta( $post_id, 'accordions_container_padding', $accordions_container_padding );	
	update_post_meta( $post_id, 'accordions_container_bg_color', $accordions_container_bg_color );
	update_post_meta( $post_id, 'accordions_container_text_align', $accordions_container_text_align );	 
	 
	update_post_meta( $post_id, 'accordions_bg_img', $accordions_bg_img );	
	update_post_meta( $post_id, 'accordions_themes', $accordions_themes );

	update_post_meta( $post_id, 'accordions_icons_plus', $accordions_icons_plus );
	update_post_meta( $post_id, 'accordions_icons_minus', $accordions_icons_minus );
	update_post_meta( $post_id, 'accordions_icons_color', $accordions_icons_color );
	update_post_meta( $post_id, 'accordions_icons_color_hover', $accordions_icons_color_hover );	
	
	update_post_meta( $post_id, 'accordions_icons_font_size', $accordions_icons_font_size );
    update_post_meta( $post_id, 'accordions_icons_bg_color', $accordions_icons_bg_color );
    update_post_meta( $post_id, 'accordions_icons_padding', $accordions_icons_padding );

	update_post_meta( $post_id, 'accordions_icons_position', $accordions_icons_position );	

	update_post_meta( $post_id, 'accordions_default_bg_color', $accordions_default_bg_color );
	update_post_meta( $post_id, 'accordions_active_bg_color', $accordions_active_bg_color );
	update_post_meta( $post_id, 'accordions_header_bg_opacity', $accordions_header_bg_opacity );	
	
	update_post_meta( $post_id, 'accordions_bg_color', $accordions_bg_color );
	update_post_meta( $post_id, 'accordions_header_bg_img', $accordions_header_bg_img );	

	update_post_meta( $post_id, 'accordions_items_title_color', $accordions_items_title_color );
	update_post_meta( $post_id, 'accordions_items_title_color_hover', $accordions_items_title_color_hover );
    update_post_meta( $post_id, 'accordions_items_title_font_family', $accordions_items_title_font_family );
	update_post_meta( $post_id, 'accordions_items_title_font_size', $accordions_items_title_font_size );
	update_post_meta( $post_id, 'accordions_items_title_margin', $accordions_items_title_margin );
	update_post_meta( $post_id, 'accordions_items_title_padding', $accordions_items_title_padding );	

	update_post_meta( $post_id, 'accordions_items_content_color', $accordions_items_content_color );
    update_post_meta( $post_id, 'accordions_items_content_font_family', $accordions_items_content_font_family );
	update_post_meta( $post_id, 'accordions_items_content_font_size', $accordions_items_content_font_size );
	update_post_meta( $post_id, 'accordions_items_content_bg_color', $accordions_items_content_bg_color );
	update_post_meta( $post_id, 'accordions_items_content_bg_opacity', $accordions_items_content_bg_opacity );	
	update_post_meta( $post_id, 'accordions_items_content_padding', $accordions_items_content_padding );	
	update_post_meta( $post_id, 'accordions_items_content_margin', $accordions_items_content_margin );		
	
	update_post_meta( $post_id, 'accordions_content_title', $accordions_content_title );
	update_post_meta( $post_id, 'accordions_content_title_toggled', $accordions_content_title_toggled );
	update_post_meta( $post_id, 'accordions_content_body', $accordions_content_body );	
	
	update_post_meta( $post_id, 'accordions_section_icon_plus', $accordions_section_icon_plus );
	update_post_meta( $post_id, 'accordions_section_icon_minus', $accordions_section_icon_minus );			
	
	
	update_post_meta( $post_id, 'accordions_hide', $accordions_hide );

	update_post_meta( $post_id, 'accordions_custom_css', $accordions_custom_css );
    update_post_meta( $post_id, 'accordions_custom_js', $accordions_custom_js );
	
	update_post_meta( $post_id, 'accordions_tabs_collapsible', $accordions_tabs_collapsible );
	update_post_meta( $post_id, 'accordions_tabs_active_event', $accordions_tabs_active_event );
	update_post_meta( $post_id, 'accordions_tabs_vertical', $accordions_tabs_vertical );
    update_post_meta( $post_id, 'accordions_tabs_vertical_width_ratio', $accordions_tabs_vertical_width_ratio );
	update_post_meta( $post_id, 'accordions_tabs_icon_toggle', $accordions_tabs_icon_toggle );
	update_post_meta( $post_id, 'accordions_click_track', $accordions_click_track );





}
add_action( 'save_post', 'meta_boxes_accordions_save' );






function meta_boxes_accordions_product_save( $post_id ) {

    global $post;


    $active_plugins = get_option('active_plugins');

    if( !empty($post) && $post->post_type=='product' && in_array( 'woocommerce/woocommerce.php', (array) $active_plugins ) ){



	/*
	 * We need to verify this came from the our screen and with proper authorization,
	 * because save_post can be triggered at other times.
	 */

	// Check if our nonce is set.
	if ( ! isset( $_POST['meta_boxes_accordions_wc_input_nonce'] ) )
		return $post_id;

	$nonce = $_POST['meta_boxes_accordions_wc_input_nonce'];

	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $nonce, 'meta_boxes_accordions_wc_input' ) )
		return $post_id;

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
		return $post_id;



	/* OK, its safe for us to save the data now. */

	// Sanitize user input.
	$accordions_id = sanitize_text_field( $_POST['accordions_id'] );
	$accordions_tab_title = sanitize_text_field( $_POST['accordions_tab_title'] );

	update_post_meta( $post_id, 'accordions_id', $accordions_id );
	update_post_meta( $post_id, 'accordions_tab_title', $accordions_tab_title );

    }


}
add_action( 'save_post', 'meta_boxes_accordions_product_save' );







function meta_boxes_accordions_side( $post ) {
    $class_accordions_support = new class_accordions_support();
    ?>
    <div class="post-grid-meta-box">

        <ul>
            <li>Version: <?php echo accordions_version; ?></li>
            <li>Tested WP: 5.1</li>
        </ul>

        <h3>Documentation</h3>
        <a class="button" href="http://pickplugins.com/docs/documentation/accordions/?ref=dashboard" target="_blank">Documentation</a><p class="description">Before asking, submitting reviews please take a look on our documentation, may help your issue fast.</p>

        <h3>Looking for support?</h3>
        <a class="button" href="https://www.pickplugins.com/questions/?ref=dashboard" target="_blank">Ask Question</a><p class="description">Its free and you can ask any question about our plugins and get support fast.</p>



        <h3>Provide your feedback</h3>

        <a class="button" href="https://wordpress.org/support/plugin/accordions/reviews/?filter=5" target="_blank">Submit Reviews</a> <a class="button" href="https://wordpress.org/support/plugin/accordions/#new-topic-0" target="_blank">Ask wordpress.org</a><p>We spent thousand+ hours to development on this plugin, please submit your reviews wisely.</p><p>If you have any issue with this plugin please submit our forums or contact our support first.</p><p class="description">Your feedback and reviews are most important things to keep our development on track. If you have time please submit us five star <span style="color: orange"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span> reviews.</p>





        <?php


        ?>



        <?php
        $video_tutorials =  $class_accordions_support->faq();
        if(!empty($video_tutorials)):
            ?>
            <div class="faq">
                <h3>FAQ</h3>
                <ul>
                    <?php
                    foreach($video_tutorials as $item){
                        ?>
                        <li class="item">
                            <a target="_blank" href="<?php echo $item['url']; ?>"><i class="far fa-dot-circle"></i> <?php echo $item['title']; ?></a>

                        </li>
                        <?php
                    }

                    ?>
                </ul>
            </div>
        <?php

        endif;
        ?>



        <?php
        $video_tutorials =  $class_accordions_support->video_tutorials();
        if(!empty($video_tutorials)):
            ?>
            <div class="video-tutorials">
                <h3>Video Tutorials</h3>
                <ul>
                    <?php
                    foreach($video_tutorials as $item){
                        ?>
                        <li class="item">
                            <a target="_blank" href="<?php echo $item['video_url']; ?>"><i class="far fa-dot-circle"></i> <?php echo $item['title']; ?></a>

                        </li>
                        <?php
                    }

                    ?>
                </ul>
            </div>
        <?php

        endif;
        ?>











    </div>
    <?php

}
