<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-output', accordions_plugin_url . '/dist/output.css', [], time(), 'all');

//http://localhost/wordpress/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-reusable-blocks,wp-patterns,wp-editor,co&load%5Bchunk_1%5D=mmon,forms,wp-reset-editor-styles,wp-block-library,wp-block-editor-content,wp-edit-blocks,wp-commands,wp-edit-post,wp-block-dire&load%5Bchunk_2%5D=ctory,wp-format-library,admin-menu,dashboard,list-tables,edit,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-ico&load%5Bchunk_3%5D=n,l10n,wp-auth-check&ver=6.4.3

wp_enqueue_style('wp-components');


// wp_register_style('pgcontent_slider_splide_core', accordions_plugin_url . 'assets/admin/css/splide-core.min.css');

// wp_enqueue_style('pgcontent_slider_splide_core');
wp_enqueue_editor();



wp_enqueue_script(
    'post-grid-blocks',
    accordions_plugin_url . 'build/index.js',
    [
        'wp-blocks',
        'wp-editor',
        'wp-i18n',
        'wp-element',
        'wp-components',
        'wp-data',
        'wp-plugins',
        'wp-edit-post',
    ],
    time()

);

wp_localize_script('post-grid-blocks', 'accordions_builder_js', array('post_grid_ajaxurl' => admin_url('admin-ajax.php'), '_wpnonce' => wp_create_nonce('wp_rest')));






?>
<div class="wrap">
    <div id="cb-dashboard" class=""></div>
</div>