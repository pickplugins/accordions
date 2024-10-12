<?php



if (!defined('ABSPATH')) exit;  // if direct access 	

class accordions_post_types
{


	public function __construct()
	{
		add_action('init', array($this, '_posttype_accordions'), 0);
		add_action('admin_init', array($this, 'add_capability'));
	}
	public function add_capability()
	{
		$accordions_settings = get_option('accordions_settings');

		$user_roles = isset($accordions_settings['user_roles']) ? $accordions_settings['user_roles'] : array("administrator");

		//error_log(serialize($user_roles));

		$wp_roles = new WP_Roles();
		$roles = $wp_roles->get_names();


		//error_log(serialize($roles));


		if (!empty($roles)) {
			foreach ($roles as $index => $user_role) {
				$role = get_role($index);

				$role->remove_cap('publish_accordionss');
				$role->remove_cap('edit_accordionss');
				$role->remove_cap('edit_others_accordionss');
				$role->remove_cap('read_private_accordionss');
				$role->remove_cap('edit_accordions');
				$role->remove_cap('read_accordions');
				$role->remove_cap('delete_accordions', false);
			}
		}

		if (!empty($user_roles)) {
			foreach ($user_roles as $user_role) {
				$role = get_role($user_role);

				$role->add_cap('publish_accordionss');
				$role->add_cap('edit_accordionss');
				$role->add_cap('edit_others_accordionss');
				$role->add_cap('read_private_accordionss');
				$role->add_cap('edit_accordions');
				$role->add_cap('read_accordions');
				$role->add_cap('delete_accordions', false);
			}
		}
	}

	public function _posttype_accordions()
	{

		if (post_type_exists("accordions"))
			return;

		$singular  = __('Accordions', 'accordions');
		$plural    = __('Accordions', 'accordions');

		$accordions_settings = get_option('accordions_settings');
		$accordions_preview = isset($accordions_settings['accordions_preview']) ? $accordions_settings['accordions_preview'] : 'yes';


		register_post_type(
			"accordions",
			apply_filters("accordions_posttype", array(
				'labels' => array(
					'name' 					=> $plural,
					'singular_name' 		=> $singular,
					'menu_name'             => $singular,
					'all_items'             => sprintf(__('All %s', 'accordions'), $plural),
					'add_new' 				=> __('Add New', 'accordions'),
					'add_new_item' 			=> sprintf(__('Add %s', 'accordions'), $singular),
					'edit' 					=> __('Edit', 'accordions'),
					'edit_item' 			=> sprintf(__('Edit %s', 'accordions'), $singular),
					'new_item' 				=> sprintf(__('New %s', 'accordions'), $singular),
					'view' 					=> sprintf(__('View %s', 'accordions'), $singular),
					'view_item' 			=> sprintf(__('View %s', 'accordions'), $singular),
					'search_items' 			=> sprintf(__('Search %s', 'accordions'), $plural),
					'not_found' 			=> sprintf(__('No %s found', 'accordions'), $plural),
					'not_found_in_trash' 	=> sprintf(__('No %s found in trash', 'accordions'), $plural),
					'parent' 				=> sprintf(__('Parent %s', 'accordions'), $singular)
				),
				'description' => sprintf(__('This is where you can create and manage %s.', 'accordions'), $plural),
				'public' 				=> false,
				'show_ui' 				=> true,
				'capability_type' 		=> 'post',
				'capabilities' => array(
					'publish_posts' => 'publish_accordionss',
					'edit_posts' => 'edit_accordionss',
					'edit_others_posts' => 'edit_others_accordionss',
					'read_private_posts' => 'read_private_accordionss',
					'edit_post' => 'edit_accordions',
					'delete_post' => 'delete_accordions',
					'read_post' => 'read_accordions',
				),
				'map_meta_cap'          => true,
				'publicly_queryable' 	=> ($accordions_preview == 'yes') ? true : false,
				'exclude_from_search' 	=> false,
				'hierarchical' 			=> false,
				'rewrite' 				=> true,
				'query_var' 			=> true,
				'supports' 				=> array('title', 'revisions'),
				'show_in_nav_menus' 	=> true,
				//'show_in_menu' 	=> 'edit.php?post_type=team',	
				'menu_icon' => 'dashicons-align-center',


			))
		);
	}
}


new accordions_post_types();
