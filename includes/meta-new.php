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
        <option><?php echo __('Select accordion','accordions'); ?></option>
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
        'title' => __('Shortcode','accordions'),
        'priority' => 1,
        'active' => true,
    );


    $accordion_settings_tab[] = array(
        'id' => 'options',
        'title' => __('Options','accordions'),
        'priority' => 2,
        'active' => false,
    );

    $accordion_settings_tab[] = array(
        'id' => 'style',
        'title' => __('Style','accordions'),
        'priority' => 3,
        'active' => false,
    );

    $accordion_settings_tab[] = array(
        'id' => 'content',
        'title' => __('Content','accordions'),
        'priority' => 4,
        'active' => false,
    );



    $accordion_settings_tab[] = array(
        'id' => 'custom_scripts',
        'title' => __('Custom Scripts','accordions'),
        'priority' => 6,
        'active' => false,
    );


    $accordion_settings_tabs = apply_filters('accordion_settings_tabs', $accordion_settings_tab);


    $tabs_sorted = array();
    foreach ($accordion_settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset( $tab['priority'] ) ? $tab['priority'] : 0;
    array_multisort($tabs_sorted, SORT_ASC, $accordion_settings_tabs);



    $post_id = $post->ID;


?>
    <div class="accordion-builder">
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
                    <div class="preview-title"><?php echo __('Preview','accordions'); ?></div>
                    <div class="navs">
                        <div class="screen-size mobile" size="mobile"><i class="fas fa-mobile-alt"></i></div>
                        <div class="screen-size tablet" size="tablet"><i class="fas fa-tablet-alt"></i></div>
                        <div class="screen-size desktop" size="desktop"><i class="fas fa-desktop"></i></div>

                    </div>
                </div>

                <div class="clear clearfix"></div>
                <div class="preview-main">
                    <div class="">
                        <?php echo do_shortcode("[accordions id='".$post_id."']"); ?>
                    </div>

                </div>

                <p class="description"><?php echo __('Preview may different from front-end to admin because of admin css overite some basic elements, like paragraph, h1, h2 tags and etc. to get exact result please preview on front-end.','accordions'); ?></p>


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

		  



  	$accordions_active_event = sanitize_text_field( $_POST['accordions_active_event'] ); 	
  	$accordions_lazy_load = sanitize_text_field( $_POST['accordions_lazy_load'] );
 	$accordions_lazy_load_src = sanitize_text_field( $_POST['accordions_lazy_load_src'] );	

  	$accordions_hide_edit = sanitize_text_field( $_POST['accordions_hide_edit'] );



	

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


	$accordions_default_bg_color = sanitize_text_field( $_POST['accordions_default_bg_color'] );	
	$accordions_active_bg_color = sanitize_text_field( $_POST['accordions_active_bg_color'] );

	$accordions_items_title_color = sanitize_text_field( $_POST['accordions_items_title_color'] );	
	$accordions_items_title_color_hover = sanitize_text_field( $_POST['accordions_items_title_color_hover'] );	
	$accordions_items_title_font_size = sanitize_text_field( $_POST['accordions_items_title_font_size'] );
	$accordions_items_title_margin = sanitize_text_field( $_POST['accordions_items_title_margin'] );	
	$accordions_items_title_padding = sanitize_text_field( $_POST['accordions_items_title_padding'] );	

	$accordions_items_content_color = sanitize_text_field( $_POST['accordions_items_content_color'] );	
	$accordions_items_content_font_size = sanitize_text_field( $_POST['accordions_items_content_font_size'] );
	$accordions_items_content_bg_color = sanitize_text_field( $_POST['accordions_items_content_bg_color'] );
	$accordions_items_content_padding = sanitize_text_field( $_POST['accordions_items_content_padding'] );
	$accordions_items_content_margin = sanitize_text_field( $_POST['accordions_items_content_margin'] );			
	
	$accordions_content_title = isset($_POST['accordions_content_title']) ? stripslashes_deep( $_POST['accordions_content_title'] ) : array();
	$accordions_content_body = isset($_POST['accordions_content_body']) ? stripslashes_deep( $_POST['accordions_content_body'] ) : array();
	


	
	
	if(empty($_POST['accordions_hide']))
		{
			$_POST['accordions_hide'] = '';	
		}
	
	$accordions_hide = stripslashes_deep( $_POST['accordions_hide'] );	
	
	$accordions_custom_css = stripslashes_deep( $_POST['accordions_custom_css'] );
    $accordions_custom_js = $_POST['accordions_custom_js'];

	$accordions_tabs_collapsible = sanitize_text_field( $_POST['accordions_tabs_collapsible'] );
	$accordions_tabs_active_event = sanitize_text_field( $_POST['accordions_tabs_active_event'] );



  // Update the meta field in the database.
 	update_post_meta( $post_id, 'accordions_collapsible', $accordions_collapsible );
 	update_post_meta( $post_id, 'accordions_expaned_other', $accordions_expaned_other );	
 	update_post_meta( $post_id, 'accordions_heightStyle', $accordions_heightStyle );		  

 	update_post_meta( $post_id, 'accordions_active_event', $accordions_active_event );
 	update_post_meta( $post_id, 'accordions_lazy_load', $accordions_lazy_load );
 	update_post_meta( $post_id, 'accordions_lazy_load_src', $accordions_lazy_load_src );					  

 	update_post_meta( $post_id, 'accordions_hide_edit', $accordions_hide_edit );


	
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

	update_post_meta( $post_id, 'accordions_default_bg_color', $accordions_default_bg_color );
	update_post_meta( $post_id, 'accordions_active_bg_color', $accordions_active_bg_color );

	

	update_post_meta( $post_id, 'accordions_items_title_color', $accordions_items_title_color );
	update_post_meta( $post_id, 'accordions_items_title_color_hover', $accordions_items_title_color_hover );
	update_post_meta( $post_id, 'accordions_items_title_font_size', $accordions_items_title_font_size );
	update_post_meta( $post_id, 'accordions_items_title_margin', $accordions_items_title_margin );
	update_post_meta( $post_id, 'accordions_items_title_padding', $accordions_items_title_padding );	

	update_post_meta( $post_id, 'accordions_items_content_color', $accordions_items_content_color );
	update_post_meta( $post_id, 'accordions_items_content_font_size', $accordions_items_content_font_size );
	update_post_meta( $post_id, 'accordions_items_content_bg_color', $accordions_items_content_bg_color );
	update_post_meta( $post_id, 'accordions_items_content_padding', $accordions_items_content_padding );
	update_post_meta( $post_id, 'accordions_items_content_margin', $accordions_items_content_margin );		
	
	update_post_meta( $post_id, 'accordions_content_title', $accordions_content_title );
	update_post_meta( $post_id, 'accordions_content_body', $accordions_content_body );
	

	
	update_post_meta( $post_id, 'accordions_hide', $accordions_hide );

	update_post_meta( $post_id, 'accordions_custom_css', $accordions_custom_css );
    update_post_meta( $post_id, 'accordions_custom_js', $accordions_custom_js );
	
	update_post_meta( $post_id, 'accordions_tabs_collapsible', $accordions_tabs_collapsible );
	update_post_meta( $post_id, 'accordions_tabs_active_event', $accordions_tabs_active_event );







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





