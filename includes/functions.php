<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access



function accordions_ajax_import_json(){

	$response = array();
	$json_file = isset($_POST['json_file']) ? $_POST['json_file'] : '';
	$string = file_get_contents($json_file);
	$json_a = json_decode($string,true);


	foreach ($json_a as $post_id=>$post_data){

	    $meta_fields = $post_data['meta_fields'];
		$title = $post_data['title'];

		// Create post object
		$my_post = array(
			'post_title'    => $title,
			'post_type' => 'accordions',
			'post_status'   => 'publish',

		);

		$post_inserted_id = wp_insert_post( $my_post );

		foreach ($meta_fields as $meta_key=>$meta_value){
			update_post_meta( $post_inserted_id, $meta_key, $meta_value );
        }




    }


	$response['json_a'] = $json_a;
	//$response['string'] = $string;
	//$response['json_file'] = $json_file;




	echo json_encode( $response );



	die();
}
add_action('wp_ajax_accordions_ajax_import_json', 'accordions_ajax_import_json');
//add_action('wp_ajax_nopriv_accordions_ajax_import_json', 'accordions_ajax_import_json');







add_shortcode('accordions_youtube', 'accordions_youtube');


function accordions_youtube($atts, $content = null ){

		$atts = shortcode_atts(
			array(
				'video_id' => "",
				'width' => "560",	
				'height' => "315",										

				), $atts);
		
		$video_id = $atts['video_id'];
		$width = $atts['width'];			
		$height = $atts['height'];			
		
		$html = '';
		$html.= '<iframe width="'.$width.'" height="'.$height.'" src="https://www.youtube.com/embed/'.$video_id.'" frameborder="0" allowfullscreen></iframe>';

		return $html;	
	}











function accordions_add_shortcode_column( $columns ) {
    return array_merge( $columns, 
        array( 'shortcode' => __( 'Shortcode', 'accordions' ) ) );
}
add_filter( 'manage_accordions_posts_columns' , 'accordions_add_shortcode_column' );


function accordions_posts_shortcode_display( $column, $post_id ) {
    if ($column == 'shortcode'){
		?>
        <input style="background:#bfefff" type="text" onClick="this.select();" value="[accordions <?php echo 'id=&quot;'.$post_id.'&quot;';?>]" /><br />
      <textarea cols="50" rows="1" style="background:#bfefff" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[accordions id='; echo "'".$post_id."']"; echo '"); ?>'; ?></textarea>
        <?php		
		
    }
}

add_action( 'manage_accordions_posts_custom_column' , 'accordions_posts_shortcode_display', 10, 2 );






function accordions_paratheme_hex2rgb($hex) {
   $hex = str_replace("#", "", $hex);

   if(strlen($hex) == 3) {
      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
   } else {
      $r = hexdec(substr($hex,0,2));
      $g = hexdec(substr($hex,2,2));
      $b = hexdec(substr($hex,4,2));
   }
   $rgb = $r.','.$g.','.$b;
   //return implode(",", $rgb); // returns the rgb values separated by commas
   return $rgb; // returns an array with the rgb values
}










function accordions_plugin_list_meta_links( $links ) {

    $links['get_premium'] = '<a target="_blank" class="" style=" font-weight:bold;color:#f00;" href="https://www.pickplugins.com/product/accordions/?ref=dashboard">'.__('Buy Premium!', 'accordions').'</a>';


    return $links;

}
add_filter( 'plugin_action_links_'.plugin_basename( __FILE__ ) , 'accordions_plugin_list_meta_links' );



