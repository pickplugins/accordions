<?php
if (!defined('ABSPATH'))
	exit();



class AccordionsRest
{
	function __construct()
	{
		add_action('rest_api_init', array($this, 'register_routes'));
	}


	public function register_routes()
	{






		register_rest_route(
			'accordions/v2',
			'/update_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'update_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'accordions/v2',
			'/check_license',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'check_license'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);





		register_rest_route(
			'accordions/v2',
			'/get_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);




		register_rest_route(
			'accordions/v2',
			'/get_posts',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_posts'),
				'permission_callback' => '__return_true',

			)
		);



		register_rest_route(
			'accordions/v2',
			'/accordions_list',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'accordions_list'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},

			)
		);
		register_rest_route(
			'accordions/v2',
			'/accordions_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'accordions_data'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},

			)
		);
		register_rest_route(
			'accordions/v2',
			'/update_post_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'update_post_data'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},

			)
		);
		register_rest_route(
			'accordions/v2',
			'/create_post',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'create_post'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);

		register_rest_route(
			'accordions/v2',
			'/user_roles_list',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'user_roles_list'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);



		register_rest_route(
			'accordions/v2',
			'/get_post_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_data'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
	}



	/**
	 * Return user_roles_list
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function user_roles_list($request)
	{
		$response = [];
		$formdata = isset($request['formdata']) ? $request['formdata'] : 'no data';
		global $wp_roles;
		$roles = [];
		if ($wp_roles && property_exists($wp_roles, 'roles')) {
			$rolesAll = isset($wp_roles->roles) ? $wp_roles->roles : [];
			foreach ($rolesAll as $roleIndex => $role) {
				$roles[$roleIndex] = $role['name'];
			}
		}
		$response['roles'] = $roles;
		die(wp_json_encode($response));
	}


	/**
	 * Return update_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function update_options($request)
	{
		$response = [];


		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$value = isset($request['value']) ? post_grid_recursive_sanitize_arr($request['value']) : '';
		$message = "";
		if (!empty($value)) {
			$status = update_option($name, $value);
			$message = __("Options updated", "accordions");
		} else {
			$status = false;
			$message = __("Value should not empty", "accordions");
		}


		$response['status'] = $status;
		$response['message'] = $message;

		die(wp_json_encode($response));
	}

	/**
	 * Return check_license
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function check_license($request)
	{
		$response = [];


		$license_key = isset($request['license_key']) ? sanitize_text_field($request['license_key']) : '';
		$message = "";



		//$response['status'] = $status;
		$response['message'] = $message;

		die(wp_json_encode($response));
	}


















	/**
	 * Return get_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_options($request)
	{
		$response = [];


		$option = isset($request['option']) ? $request['option'] : '';

		$response = get_option($option);

		// $response['customFonts'] = [];
		// $response['googleFonts'] = [];

		// $response['container']['width'] = '1155px';

		// $response['breakpoints'] = [];
		// $response['colors'] = ['#fff'];
		// $response['editor']['width'] = '1155px';
		// $response['blocks']['disabled'] = [];
		// $response['license']['key'] = '';
		// $response['license']['status'] = '';
		// $response['license']['created'] = '';
		// $response['license']['renewed'] = '';
		// $response['license']['expire'] = '';

		die(wp_json_encode($response));
	}









	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_post_data($post_data)
	{

		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';
		$fields = isset($post_data['fields']) ? $post_data['fields'] : [];

		$response = new stdClass();


		$post = get_post($postId);


		$response->ID = $post->ID;
		$response->post_title = $post->post_title;
		$response->post_content = $post->post_content;

		$taxonomies = get_object_taxonomies(get_post_type($postId));



		if (!empty($taxonomies))
			foreach ($taxonomies as $taxonomy) {

				$terms = get_the_terms($postId, $taxonomy);

				$termsData = [];

				if (!empty($terms))
					foreach ($terms as $index => $term) {

						$termsData[$index]['term_id'] = $term->term_id;
						$termsData[$index]['name'] = $term->name;
						$termsData[$index]['slug'] = $term->slug;
						$termsData[$index]['count'] = $term->count;
						$termsData[$index]['url'] = get_term_link($term->term_id);
					}


				if (!empty($termsData))
					$response->$taxonomy = $termsData;
			}


		// $post_id = $post->ID;
		// $post->post_id = $post->ID;
		// $post->post_title = $post->post_title;

		// $post->post_content = $post->post_content;
		// $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
		// $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
		// $post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/images/placeholder.png';

		if ($post->post_type == 'product') {

			$product = wc_get_product($post->ID);



			$response->total_sales = $product->get_total_sales();


			$response->type = $product->get_type();
			$response->sku = $product->get_sku();
			$response->manage_stock = $product->get_manage_stock();
			$response->stock_quantity = $product->get_stock_quantity();
			$response->stock_status = $product->get_stock_status();
			$response->backorders = $product->get_backorders();
			$response->weight = $product->get_weight();
			$response->length = $product->get_length();
			$response->width = $product->get_width();
			$response->height = $product->get_height();
			$response->dimensions = $product->get_dimensions();
			$response->rating_count = $product->get_rating_count();
			$response->review_count = $product->get_review_count();
			$response->average_rating = $product->get_average_rating();
			$response->on_sale = $product->is_on_sale();
			$response->gallery_image_ids = $product->get_gallery_image_ids();
			$response->image = $product->get_image();
			// $response->date_on_sale_to = $product->get_date_on_sale_to();




			$response->currency = get_woocommerce_currency();
			$response->currency_symbol = get_woocommerce_currency_symbol();
			$response->currency_pos = get_option('woocommerce_currency_pos');



			$formatted_attributes = array();

			$attributes = $product->get_attributes();

			foreach ($attributes as $attr => $attr_deets) {

				$attribute_label = wc_attribute_label($attr);

				if (isset($attributes[$attr]) || isset($attributes['pa_' . $attr])) {

					$attribute = isset($attributes[$attr]) ? $attributes[$attr] : $attributes['pa_' . $attr];

					if ($attribute['is_taxonomy']) {

						$formatted_attributes[$attr] = ['label' => $attribute_label, 'values' => implode(', ', wc_get_product_terms($product->id, $attribute['name'], array('fields' => 'names')))];
					} else {

						$formatted_attributes[$attr] = ['label' => $attribute_label, 'values' => $attribute['value']];
					}
				}
			}




			$response->attributes = $formatted_attributes;




			$productType = $product->get_type();

			if ($productType == 'variable') {
				$response->variation_prices = $product->get_variation_prices();
				$response->min_price = $product->get_variation_price();
				$response->max_price = $product->get_variation_price('max');
			}
			if ($productType != 'variable') {
				$response->regular_price = $product->get_regular_price();
				$response->sale_price = $product->get_sale_price();
				$response->date_on_sale_from = $product->get_date_on_sale_from();
				$response->date_on_sale_to = $product->get_date_on_sale_to();
				$response->price = $product->get_price();
			}
		}


		die(wp_json_encode($response));
	}










	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function accordions_data($post_data)
	{

		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';

		$response = new stdClass();
		if (empty($postId)) {
			$response->post_id_missing = "";
			die(wp_json_encode($response));
		}

		$post = get_post($postId);



		$post_title = isset($post->post_title) ? $post->post_title : "";
		$post_content = isset($post->post_content) ? $post->post_content : "";

		$post_content = maybe_serialize($post_content) ? unserialize($post_content) : $post_content;

		$response->ID = $post->ID;
		$response->post_title = $post_title;
		$response->post_content = $post_content;




		die(wp_json_encode($response));
	}

	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function update_post_data($post_data)
	{

		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';
		$content = isset($post_data['content']) ? $post_data['content'] : '';
		$response = new stdClass();

		if (empty($postId)) {
			$response["id_missing"] = __("Post Id should not empty");
		}




		$my_post = array(
			'ID'           => $postId,
			'post_content' => serialize($content),
		);

		// Update the post into the database
		$updatep_post_id = wp_update_post($my_post);

		if ($updatep_post_id)
			$response->id = $updatep_post_id;

		die(wp_json_encode($response));
	}


	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function create_post($post_data)
	{

		$postTitle = isset($post_data['postTitle']) ? sanitize_text_field($post_data['postTitle']) : '';
		$content = isset($post_data['content']) ? sanitize_text_field($post_data['content']) : '';
		$response = new stdClass();

		if (empty($postTitle)) {
			$response->error = true;
			$response->errorMessage = __("Post title should not empty");
			die(wp_json_encode($response));
		}


		$my_post = array(
			'post_title' => ($postTitle),
			'post_content' => ($content),
			'post_type' => "accordions",
		);

		// Update the post into the database
		$updatep_post_id = wp_insert_post($my_post);

		if ($updatep_post_id) {
			$response->success = true;
			$response->successMessage = __("Post created");
		}
		$response->id = $updatep_post_id;

		die(wp_json_encode($response));
	}












	function nestedToSingle($array, $slug = '')
	{
		$singleDimArray = [];



		if (is_array($array))
			foreach ($array as $index => $item) {



				if (is_array($item)) {
					$singleDimArray = array_merge($singleDimArray, $this->nestedToSingle((array) $item, $index));
				} else if (is_object($item)) {
					$singleDimArray = array_merge($singleDimArray, $this->nestedToSingle((array) $item, $index));
				} else {
					$index1 = !empty($slug) ? $slug . '-' . $index : $index;


					$singleDimArray['{' . $index1 . '}'] = $item;
				}
			}

		return $singleDimArray;
	}












	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_posts($post_data)
	{
		$query_args = [];


		$nonce = isset($post_data['_wpnonce']) ? $post_data['_wpnonce'] : "";


		if (!wp_verify_nonce($nonce, 'wp_rest')) return $query_args;



		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
		$rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
		$rawData = !empty($post_data['rawData']) ? $post_data['rawData'] : $rawData;

		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : "";
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : "";
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;


		$paged = 1;





		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {



				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';



				if ($val) {
					if ($id == 'postType') {
						$query_args['post_type'] = $val;
					} elseif ($id == 'postStatus') {




						if (($key = array_search("draft", $val)) !== false) {
							unset($val[$key]);
						}
						if (($key = array_search("auto-draft", $val)) !== false) {
							unset($val[$key]);
						}

						if (($key = array_search("future", $val)) !== false) {
							unset($val[$key]);
						}





						$status =  $val;
						$query_args['post_status'] = $status;

						// $query_args['post_status'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'orderby') {
						$query_args['orderby'] = implode(' ', $val);
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'dateQuery') {


						$date_query = [];

						foreach ($val as $arg) {
							$id = isset($arg['id']) ? $arg['id'] : '';
							$value = isset($arg['value']) ? $arg['value'] : '';


							if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
								$compare = isset($arg['compare']) ? $arg['compare'] : '';

								if (!empty($value))
									$date_query[] = [$id => $value, 'compare' => $compare,];
							}


							if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {

								if (!empty($value))
									$date_query[$id] = $value;
							}

							if ($id == 'after' || $id == 'before') {
								$year = isset($arg['year']) ? $arg['year'] : '';
								$month = isset($arg['month']) ? $arg['month'] : '';
								$day = isset($arg['day']) ? $arg['day'] : '';

								if (!empty($year))
									$date_query[$id]['year'] = $year;

								if (!empty($month))
									$date_query[$id]['month'] = $month;

								if (!empty($day))
									$date_query[$id]['day'] = $day;
							}
						}



						$query_args['date_query'] = $date_query;
					} elseif ($id == 'year') {



						$query_args['year'] = $val;
					} elseif ($id == 'monthnum') {
						$query_args['monthnum'] = $val;
					} elseif ($id == 'w') {
						$query_args['w'] = $val;
					} elseif ($id == 'day') {
						$query_args['day'] = $val;
					} elseif ($id == 'hour') {
						$query_args['hour'] = $val;
					} elseif ($id == 'minute') {
						$query_args['minute'] = $val;
					} elseif ($id == 'second') {
						$query_args['second'] = $val;
					} elseif ($id == 'm') {
						$query_args['m'] = $val;
					} elseif ($id == 'author') {


						$query_args['author'] = $val;
					} elseif ($id == 'authorName') {
						$query_args['author_name'] = $val;
					} elseif ($id == 'authorIn') {
						$query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'authorNotIn') {
						$query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'cat') {
						$query_args['cat'] = $val;
					} elseif ($id == 'categoryName') {
						$query_args['category_name'] = $val;
					} elseif ($id == 'categoryAnd') {
						$query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryIn') {
						$query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryNotIn') {
						$query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tag') {
						$query_args['tag'] = $val;
					} elseif ($id == 'tagId') {
						$query_args['tag_id'] = $val;
					} elseif ($id == 'tagAnd') {
						$query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagIn') {
						$query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagNotIn') {
						$query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugAnd') {
						$query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugIn') {
						$query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'taxQuery') {
						$query_args['tax_query'] = $val[0];
					} elseif ($id == 'p') {
						$query_args['p'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] = $val;
					} elseif ($id == 'pageId') {
						$query_args['page_id'] = $val;
					} elseif ($id == 'pagename') {
						$query_args['pagename'] = $val;
					} elseif ($id == 'postParent') {
						$query_args['post_parent'] = $val;
					} elseif ($id == 'postParentIn') {
						$query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postParentNotIn') {
						$query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postIn') {


						$query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNotIn') {
						$query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNameIn') {
						$query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hasPassword') {

						$query_args['has_password'] = ($val === 'true') ? true : false;;
					} elseif ($id == 'postPassword') {
						$query_args['post_password'] = $val;
					} elseif ($id == 'commentCount') {
						$query_args['comment_count'] = $val;
					} elseif ($id == 'nopaging') {
						$query_args['nopaging'] = $val;
					} elseif ($id == 'postsPerPage') {

						$per_page = (int) $val;
						$per_page = ($val > 10) ? 10 : $val;
						$query_args['posts_per_page'] = $per_page;

						// $query_args['posts_per_page'] = $val;
					} elseif ($id == 'paged') {
						$paged = $val;
						$query_args['paged'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'postsPerArchivePage') {
						$query_args['posts_per_archive_page'] = $val;
					} elseif ($id == 'ignoreStickyPosts') {
						$query_args['ignore_sticky_posts'] = $val;
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'metaValue') {
						$query_args['meta_value'] = $val;
					} elseif ($id == 'metaValueNum') {
						$query_args['meta_value_num'] = (int) $val;
					} elseif ($id == 'metaCompare') {
						$query_args['meta_compare'] = $val;
					} elseif ($id == 'metaQuery') {
						$query_args['meta_query'] = $val;
					} elseif ($id == 'perm') {
						$query_args['perm'] = $val;
					} elseif ($id == 'postMimeType') {
						$query_args['post_mime_type'] = $val;
					} elseif ($id == 'cacheResults') {
						$query_args['cache_results'] = $val;
					} elseif ($id == 'updatePostMetaCache') {
						$query_args['update_post_meta_cache '] = $val;
					} elseif ($id == 'updatePostTermCache') {
						$query_args['update_post_term_cache'] = $val;
					}
				}
			}


		$posts = [];
		$responses = [];


		$post_grid_wp_query = new WP_Query($query_args);




		if ($post_grid_wp_query->have_posts()) :

			$responses['noPosts'] = false;


			while ($post_grid_wp_query->have_posts()) :
				$post_grid_wp_query->the_post();

				global $post;

				$post_id = $post->ID;
				$post->post_id = $post->ID;
				$post->post_title = $post->post_title;
				$post->post_excerpt = wp_kses_post($post->post_excerpt);
				$post->post_content = $post->post_content;
				$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
				$thumb_url = isset($thumb[0]) ? $thumb[0] : '';
				$post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/images/placeholder.png';

				$post->is_pro = ($post_id % 2 == 0) ? true : false;


				$blocks = parse_blocks($rawData);

				$html = '';

				foreach ($blocks as $block) {
					//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
					$html .= render_block($block);
				}

				$post->html = $html;

				$posts[] = $post;




			endwhile;


			$big = 999999999; // need an unlikely integer

			$maxPageNum = (!empty($maxPageNum)) ? $maxPageNum : $post_grid_wp_query->max_num_pages;



			$pages = paginate_links(
				array(
					'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
					'format' => '?paged=%#%',
					'current' => max(1, $paged),
					'total' => $maxPageNum,
					'prev_text' => $prevText,
					'next_text' => $nextText,
					'type' => 'array',

				)
			);





			$responses['posts'] = $posts;
			$responses['pagination'] = $pages;

			wp_reset_query();
			wp_reset_postdata();
		else :
			$responses['noPosts'] = true;

		endif;


		die(wp_json_encode($responses));
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function accordions_list($post_data)
	{
		$query_args = [];


		$nonce = isset($post_data['_wpnonce']) ? $post_data['_wpnonce'] : "";


		if (!wp_verify_nonce($nonce, 'wp_rest')) return $query_args;



		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];

		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : __("Previous", "accordions");
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : __("Next", "accordions");
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;


		$paged = 1;





		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {



				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';



				if ($val) {
					if ($id == 'postType') {
						$query_args['post_type'] = $val;
					} elseif ($id == 'postStatus') {




						// if (($key = array_search("draft", $val)) !== false) {
						// 	unset($val[$key]);
						// }
						// if (($key = array_search("auto-draft", $val)) !== false) {
						// 	unset($val[$key]);
						// }

						// if (($key = array_search("future", $val)) !== false) {
						// 	unset($val[$key]);
						// }





						$status =  $val;
						$query_args['post_status'] = $status;

						// $query_args['post_status'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'orderby') {
						$query_args['orderby'] = implode(' ', $val);
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 's') {
						$query_args['s'] = $val;
					} elseif ($id == 'dateQuery') {


						$date_query = [];

						foreach ($val as $arg) {
							$id = isset($arg['id']) ? $arg['id'] : '';
							$value = isset($arg['value']) ? $arg['value'] : '';


							if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
								$compare = isset($arg['compare']) ? $arg['compare'] : '';

								if (!empty($value))
									$date_query[] = [$id => $value, 'compare' => $compare,];
							}


							if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {

								if (!empty($value))
									$date_query[$id] = $value;
							}

							if ($id == 'after' || $id == 'before') {
								$year = isset($arg['year']) ? $arg['year'] : '';
								$month = isset($arg['month']) ? $arg['month'] : '';
								$day = isset($arg['day']) ? $arg['day'] : '';

								if (!empty($year))
									$date_query[$id]['year'] = $year;

								if (!empty($month))
									$date_query[$id]['month'] = $month;

								if (!empty($day))
									$date_query[$id]['day'] = $day;
							}
						}



						$query_args['date_query'] = $date_query;
					} elseif ($id == 'year') {



						$query_args['year'] = $val;
					} elseif ($id == 'monthnum') {
						$query_args['monthnum'] = $val;
					} elseif ($id == 'w') {
						$query_args['w'] = $val;
					} elseif ($id == 'day') {
						$query_args['day'] = $val;
					} elseif ($id == 'hour') {
						$query_args['hour'] = $val;
					} elseif ($id == 'minute') {
						$query_args['minute'] = $val;
					} elseif ($id == 'second') {
						$query_args['second'] = $val;
					} elseif ($id == 'm') {
						$query_args['m'] = $val;
					} elseif ($id == 'author') {


						$query_args['author'] = $val;
					} elseif ($id == 'authorName') {
						$query_args['author_name'] = $val;
					} elseif ($id == 'authorIn') {
						$query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'authorNotIn') {
						$query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'cat') {
						$query_args['cat'] = $val;
					} elseif ($id == 'categoryName') {
						$query_args['category_name'] = $val;
					} elseif ($id == 'categoryAnd') {
						$query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryIn') {
						$query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryNotIn') {
						$query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tag') {
						$query_args['tag'] = $val;
					} elseif ($id == 'tagId') {
						$query_args['tag_id'] = $val;
					} elseif ($id == 'tagAnd') {
						$query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagIn') {
						$query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagNotIn') {
						$query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugAnd') {
						$query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugIn') {
						$query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'taxQuery') {
						$query_args['tax_query'] = $val[0];
					} elseif ($id == 'p') {
						$query_args['p'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] = $val;
					} elseif ($id == 'pageId') {
						$query_args['page_id'] = $val;
					} elseif ($id == 'pagename') {
						$query_args['pagename'] = $val;
					} elseif ($id == 'postParent') {
						$query_args['post_parent'] = $val;
					} elseif ($id == 'postParentIn') {
						$query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postParentNotIn') {
						$query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postIn') {


						$query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNotIn') {
						$query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNameIn') {
						$query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hasPassword') {

						$query_args['has_password'] = ($val === 'true') ? true : false;;
					} elseif ($id == 'postPassword') {
						$query_args['post_password'] = $val;
					} elseif ($id == 'commentCount') {
						$query_args['comment_count'] = $val;
					} elseif ($id == 'nopaging') {
						$query_args['nopaging'] = $val;
					} elseif ($id == 'postsPerPage') {

						$per_page = (int) $val;
						$per_page = ($val > 10) ? 10 : $val;
						$query_args['posts_per_page'] = $per_page;

						// $query_args['posts_per_page'] = $val;
					} elseif ($id == 'paged') {
						$paged = $val;
						$query_args['paged'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'postsPerArchivePage') {
						$query_args['posts_per_archive_page'] = $val;
					} elseif ($id == 'ignoreStickyPosts') {
						$query_args['ignore_sticky_posts'] = $val;
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'metaValue') {
						$query_args['meta_value'] = $val;
					} elseif ($id == 'metaValueNum') {
						$query_args['meta_value_num'] = (int) $val;
					} elseif ($id == 'metaCompare') {
						$query_args['meta_compare'] = $val;
					} elseif ($id == 'metaQuery') {
						$query_args['meta_query'] = $val;
					} elseif ($id == 'perm') {
						$query_args['perm'] = $val;
					} elseif ($id == 'postMimeType') {
						$query_args['post_mime_type'] = $val;
					} elseif ($id == 'cacheResults') {
						$query_args['cache_results'] = $val;
					} elseif ($id == 'updatePostMetaCache') {
						$query_args['update_post_meta_cache '] = $val;
					} elseif ($id == 'updatePostTermCache') {
						$query_args['update_post_term_cache'] = $val;
					}
				}
			}


		$posts = [];
		$responses = [];



		$post_grid_wp_query = new WP_Query($query_args);




		if ($post_grid_wp_query->have_posts()) :

			$responses['noPosts'] = false;


			while ($post_grid_wp_query->have_posts()) :
				$post_grid_wp_query->the_post();

				global $post;

				$post_id = $post->ID;
				$post->post_id = $post->ID;
				$post->post_title = $post->post_title;
				$post->post_excerpt = wp_kses_post($post->post_excerpt);
				$post->post_content = $post->post_content;



				$posts[] = $post;




			endwhile;




			error_log(serialize($posts));



			$responses['posts'] = $posts;

			wp_reset_query();
			wp_reset_postdata();
		else :
			$responses['noPosts'] = true;

		endif;


		die(wp_json_encode($responses));
	}
}

$AccordionsRest = new AccordionsRest();
