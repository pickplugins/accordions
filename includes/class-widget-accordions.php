<?php


if (!defined('ABSPATH')) exit;  // if direct access

class WidgetAccordions extends WP_Widget
{

	function __construct()
	{

		parent::__construct('widget_accordions', __('Accordions', 'accordions'), array('description' => __('Show Accordions', 'accordions'),));
	}

	public function widget($args, $instance)
	{

		$title 			= apply_filters('widget_title', $instance['title']);
		$accordion_id	= isset($instance['accordion_id']) ? $instance['accordion_id'] : '';

		echo wp_kses_post($args['before_widget']);
		if (!empty($title)) echo $args['before_title'] . $title . $args['after_title'];
		echo do_shortcode("[accordions id='$accordion_id']");
		echo wp_kses_post($args['after_widget']);
	}

	public function form($instance)
	{

		$title 			= isset($instance['title']) ? $instance['title'] : __('Accordions', 'accordions');
		$accordion_id	= isset($instance['accordion_id']) ? $instance['accordion_id'] : '';
		$accordions		= get_posts(array('posts_per_page' => -1, 'post_type' => 'accordions'));

?>

		<p>
			<label for=<?php echo esc_attr($this->get_field_id('title')); ?>><?php echo __('Title', 'accordions'); ?> : </label>
			<input class='widefat' id=<?php echo esc_attr($this->get_field_id('title')); ?> name=<?php echo esc_attr($this->get_field_name('title')); ?> type='text' value=<?php echo esc_attr($title); ?> />
		</p>

		<p>
			<label for=<?php echo esc_attr($this->get_field_id('accordion_id')); ?>><?php echo __('Select Accordion', 'accordions'); ?> : </label>
			<select name=<?php echo esc_attr($this->get_field_name('accordion_id')); ?> id=<?php echo esc_attr($this->get_field_id('accordion_id')); ?> class='widefat'>

				<?php
				foreach ($accordions as $accordion) {

					$selected = $accordion_id == $accordion->ID ? 'selected' : '';
				?>
					<option value=<?php echo esc_html($accordion->ID); ?> <?php echo esc_attr($selected); ?>><?php echo esc_html($accordion->post_title); ?></option>
				<?php
				}
				?>

			</select>
		</p>

<?php
	}

	public function update($new_instance, $old_instance)
	{

		$instance = array();
		$instance['title'] 			= isset($new_instance['title']) 			? strip_tags($new_instance['title']) : '';
		$instance['accordion_id'] 	= isset($new_instance['accordion_id']) 	? strip_tags($new_instance['accordion_id']) : '';
		return $instance;
	}
}
