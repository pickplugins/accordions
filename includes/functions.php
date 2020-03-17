<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


function accordions_old_content($post_id){

    $accordions_content_title = get_post_meta( $post_id, 'accordions_content_title', true );
    $accordions_content_title_toggled = get_post_meta( $post_id, 'accordions_content_title_toggled', true );
    $accordions_content_body = get_post_meta( $post_id, 'accordions_content_body', true );
    $accordions_hide = get_post_meta( $post_id, 'accordions_hide', true );
    $accordions_section_icon_plus = get_post_meta( $post_id, 'accordions_section_icon_plus', true );
    $accordions_section_icon_minus = get_post_meta( $post_id, 'accordions_section_icon_minus', true );
    $accordions_active_accordion = get_post_meta( $post_id, 'accordions_active_accordion', true );

    $accordions_data = array();

    $i = 0;

    if(!empty($accordions_content_title))
    foreach ($accordions_content_title as $index => $item){


        $accordions_data[$index]['header'] = $item;
        $accordions_data[$index]['body'] = isset($accordions_content_body[$index]) ? $accordions_content_body[$index] : '';

        $is_active = ($accordions_active_accordion == $i) ? array($i) : array();
        $accordions_data[$index]['is_active'] = $is_active;
        $accordions_data[$index]['toggled_text'] = isset($accordions_content_title_toggled[$index]) ? $accordions_content_title_toggled[$index] : '';

        $active_icon = !empty($accordions_section_icon_plus[$index]) ? '<i class="fa '.$accordions_section_icon_plus[$index].'"></i>' : '';
        $inactive_icon = !empty($accordions_section_icon_minus[$index]) ? '<i class="fa '.$accordions_section_icon_minus[$index].'"></i>' : '';



        $accordions_data[$index]['active_icon'] = $active_icon;
        $accordions_data[$index]['inactive_icon'] = $inactive_icon;
        $accordions_data[$index]['hide'] = !empty($accordions_hide[$index]) ? 'yes' : 'no';


        $i++;
    }

    return $accordions_data;

}




//add_filter('the_content','accordions_get_shortcode');
function accordions_get_shortcode($content){


    if(strpos($content, '[restabs')){
        $tabs = accordions_str_between_all($content, "[restabs", "[/restabs]");

        foreach ($tabs as $tab_content){

            $shortcode_content = accordions_nested_shortcode_content($tab_content, $child_tag='restab');
            echo '<pre>'.var_export('#####', true).'</pre>';
            echo '<pre>'.var_export($shortcode_content, true).'</pre>';
        }
    }

    return $content;
}




function accordions_str_between_all($string, $start, $end, $includeDelimiters = false,  &$offset = 0){
    $strings = [];
    $length = strlen($string);

    while ($offset < $length)
    {
        $found = accordions_str_between($string, $start, $end, $includeDelimiters, $offset);
        if ($found === null) break;

        $strings[] = $found;
        $offset += strlen($includeDelimiters ? $found : $start . $found . $end); // move offset to the end of the newfound string
    }

    return $strings;
}

function accordions_str_between($string, $start, $end, $includeDelimiters = false, &$offset = 0){
    if ($string === '' || $start === '' || $end === '') return null;

    $startLength = strlen($start);
    $endLength = strlen($end);

    $startPos = strpos($string, $start, $offset);
    if ($startPos === false) return null;

    $endPos = strpos($string, $end, $startPos + $startLength);
    if ($endPos === false) return null;

    $length = $endPos - $startPos + ($includeDelimiters ? $endLength : -$startLength);
    if (!$length) return '';

    $offset = $startPos + ($includeDelimiters ? 0 : $startLength);

    $result = substr($string, $offset, $length);

    return ($result !== false ? $result : null);
}









function accordions_nested_shortcode_content($string, $child_tag='restab'){

    $accordion_content = array();

    //echo '<pre>'.var_export($tabs, true).'</pre>';


    $tabs = explode('['.$child_tag, $string);
    unset($tabs[0]);

    $i = 0;
    foreach ($tabs as $tab){
        $tab = str_replace('[/'.$child_tag.']','', $tab);
        $tab = str_replace(' active="active"','', $tab);

        $title_content = explode(']', $tab);
        $title = isset($title_content[0]) ? $title_content[0] : '';

        preg_match('/title="(.*?)"/', $title, $output_array);

        $title = $output_array[1];

        //$title = str_replace('title="','', $title);
        //$title = str_replace('"','', $title);
        $acc_title = ltrim($title);

        $acc_content = isset($title_content[1]) ? $title_content[1] : '';

        $accordion_content[$i]['title'] = $acc_title;
        $accordion_content[$i]['content'] = $acc_content;

        $i++;
    }

    //echo '<pre>'.var_export($accordion_content, true).'</pre>';




    return $accordion_content;
}








add_filter('the_content','accordions_preview_content');
function accordions_preview_content($content){
    if(is_singular('accordions')){
        $post_id = get_the_id();
        $content .= do_shortcode('[accordions id="'.$post_id.'"]');
    }

    return $content;
}




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









