<?php	


/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins.com
*/

if ( ! defined('ABSPATH')) exit;  // if direct access



$accordions_settings_tab = array();

$accordions_settings_tab[] = array(
    'id' => 'options',
    'title' => __('<i class="fas fa-cog"></i> Options','woocommerce-products-slider'),
    'priority' => 1,
    'active' => true,
);

$accordions_settings_tab[] = array(
    'id' => 'license',
    'title' => __('<i class="fas fa-key"></i> License','woocommerce-products-slider'),
    'priority' => 2,
    'active' => false,
);




//$accordions_settings_tab[] = array(
//    'id' => 'our_plugins',
//    'title' => __('<i class="fa fa-cubes"></i> Our Plugins','woocommerce-products-slider'),
//    'priority' => 2,
//    'active' => false,
//);




$accordions_settings_tabs = apply_filters('accordions_settings', $accordions_settings_tab);


$tabs_sorted = array();
foreach ($accordions_settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset( $tab['priority'] ) ? $tab['priority'] : 0;
array_multisort($tabs_sorted, SORT_ASC, $accordions_settings_tabs);













?>





<div class="wrap">


    <h2><?php echo __('Accordions - Settings','woocommerce-products-slider')?></h2><br>

    <?php

    if(empty($_POST['accordions_hidden'])) {

        $accordions_license = get_option('accordions_license');
        $license_key = isset($accordions_license['license_key']) ? $accordions_license['license_key'] : '';
        $accordions_track_product_view = get_option( 'accordions_track_product_view' );
        $accordions_load_script_pages = get_option( 'accordions_load_script_pages' );

    }
    else{

        $nonce = sanitize_text_field($_POST['_wpnonce']);

        if(wp_verify_nonce( $nonce, 'accordions_nonce' ) && $_POST['accordions_hidden'] == 'Y') {

            $license_key = sanitize_text_field($_POST['license_key']);
            $accordions_license = array(
                'license_key'=>$license_key,
                'license_status'=>'pending',

            );

            update_option('accordions_license', $accordions_license);





            ?>
            <div class="updated notice  is-dismissible"><p><strong><?php _e('Changes Saved.', 'woocommerce-products-slider' ); ?></strong></p></div>

            <?php
        }
    }



    //var_dump($accordions_1);

    ?>

 
        <form  method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
            <input type="hidden" name="accordions_hidden" value="Y">


            <div class="clear clearfix"></div>
            <div class="accordions-settings">
                <div class="settings-tabs vertical">
                    <ul class="tab-navs">
                        <?php
                        foreach ($accordions_settings_tabs as $tab){
                            $id = $tab['id'];
                            $title = $tab['title'];
                            $active = $tab['active'];
                            $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                            $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                            ?>
                            <li class="tab-nav <?php if($hidden) echo 'hidden';?> <?php if($active) echo 'active';?>" data-id="<?php echo $id; ?>"><?php echo $title; ?></li>
                            <?php
                        }
                        ?>
                    </ul>
                    <?php
                    foreach ($accordions_settings_tabs as $tab){
                        $id = $tab['id'];
                        $title = $tab['title'];
                        $active = $tab['active'];


                        ?>

                        <div class="tab-content <?php if($active) echo 'active';?>" id="<?php echo $id; ?>">
                            <?php
                            do_action('accordions_settings_'.$id, $tab);
                            ?>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>
            <div class="clear clearfix"></div>



            <p class="submit">
                <?php wp_nonce_field( 'accordions_nonce' ); ?>
                <input type="submit" name="submit" value="<?php _e('Update', 'woocommerce-products-slider'); ?>" class="button-primary" />

            </p>
        </form>

























</div>
