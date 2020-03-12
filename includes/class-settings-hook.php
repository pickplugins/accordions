<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('accordions_settings_content_general', 'accordions_settings_content_general');

function accordions_settings_content_general(){
    $settings_tabs_field = new settings_tabs_field();

    $accordions_settings = get_option('accordions_settings');

    $font_aw_version = isset($accordions_settings['font_aw_version']) ? $accordions_settings['font_aw_version'] : 'none';
    $accordions_preview = isset($accordions_settings['accordions_preview']) ? $accordions_settings['accordions_preview'] : 'yes';

    //echo '<pre>'.var_export($accordions_settings, true).'</pre>';

    ?>
    <div class="section">
        <div class="section-title"><?php echo __('General', 'accordions'); ?></div>
        <p class="description section-description"><?php echo __('Choose some general options.', 'accordions'); ?></p>

        <?php



        $args = array(
            'id'		=> 'font_aw_version',
            'parent'		=> 'accordions_settings',
            'title'		=> __('Font-awesome version','accordions'),
            'details'	=> __('Choose font awesome version you want to load.','accordions'),
            'type'		=> 'select',
            'value'		=> $font_aw_version,
            'default'		=> '',
            'args'		=> array('v_5'=>__('Version 5+','accordions'), 'v_4'=>__('Version 4+','accordions'), 'none'=>__('None','accordions')  ),
        );

        $settings_tabs_field->generate_field($args);

        $args = array(
            'id'		=> 'accordions_preview',
            'parent'		=> 'accordions_settings',
            'title'		=> __('Enable accordions preview','accordions'),
            'details'	=> __('You can enable preview accordions.','accordions'),
            'type'		=> 'select',
            'value'		=> $accordions_preview,
            'default'		=> 'yes',
            'args'		=> array('yes'=>__('Yes','accordions'), 'no'=>__('No','accordions')  ),
        );

        $settings_tabs_field->generate_field($args);






        ob_start();




        $meta_fields = array(
            'accordions_options',
        );


        $wp_query = new WP_Query( array (
            'post_type' => 'accordions',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ));

        $post_data_exported = array();

        if ( $wp_query->have_posts() ) :
            while ( $wp_query->have_posts() ) : $wp_query->the_post();
                foreach($meta_fields as $field){
                    $fields_data[$field] = get_post_meta(get_the_ID(),$field, true);
                }

                $post_data_exported[get_the_ID()] = array(
                    'title'=>get_the_title(),
                    'meta_fields'=>$fields_data,
                );


            endwhile;
            wp_reset_query();
        else:

            // echo __('Not  found');

        endif;

        $post_data_exported_json = json_encode($post_data_exported);


        ?>

        <textarea id="text-val" rows="4"><?php echo $post_data_exported_json; ?></textarea><br/>
        <input type="button" class="button" id="dwn-btn" value="Download json"/>

        <style type="text/css">
            #text-val{
                width: 260px;
            }
        </style>

        <script>
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }

            // Start file download.
            document.getElementById("dwn-btn").addEventListener("click", function(){
                // Generate download of hello.txt file with some content
                var text = document.getElementById("text-val").value;
                var filename = "<?php echo date('Y-m-d-h').'-'.time(); ?>.txt";

                download(filename, text);
            }, false);
        </script>


        <?php
        $html = ob_get_clean();
        $args = array(
            'id'		=> 'accordion_export',
            'title'		=> __('Export','accordions'),
            'details'	=> 'Please download this json first and upload somewhere, you can import by using the url of json file.',
            'type'		=> 'custom_html',
            'html'		=> $html,
        );
        $settings_tabs_field->generate_field($args);




        ob_start();


        ?>

        <input placeholder="json file url" type="text" class="json_file" name="json_file" value="">
        <div class="accordions-import-json button">Import</div>
        <?php
        $html = ob_get_clean();
        $args = array(
            'id'		=> 'accordion_import',
            'title'		=> __('Import','accordions'),
            'details'	=> 'Please put the url of json file where you uploaded the file.',
            'type'		=> 'custom_html',
            'html'		=> $html,
        );
        $settings_tabs_field->generate_field($args);






        ?>

    </div>

    <?php





}


add_action('accordions_settings_content_help_support', 'accordions_settings_content_help_support');

if(!function_exists('accordions_settings_content_help_support')) {
    function accordions_settings_content_help_support($tab){

        $settings_tabs_field = new settings_tabs_field();

        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Get support', 'accordions'); ?></div>
            <p class="description section-description"><?php echo __('Use following to get help and support from our expert team.', 'accordions'); ?></p>

            <?php


            ob_start();
            ?>

            <p><?php echo __('Ask question for free on our forum and get quick reply from our expert team members.', 'accordions'); ?></p>
            <a class="button" href="https://www.pickplugins.com/create-support-ticket/"><?php echo __('Create support ticket', 'accordions'); ?></a>

            <p><?php echo __('Read our documentation before asking your question.', 'accordions'); ?></p>
            <a class="button" href="https://www.pickplugins.com/documentation/accordions/"><?php echo __('Documentation', 'accordions'); ?></a>

            <p><?php echo __('Watch video tutorials.', 'accordions'); ?></p>
            <a class="button" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94ZPeQ83jOnteDDrOeDLBuFD"><i class="fab fa-youtube"></i> <?php echo __('All tutorials', 'accordions'); ?></a>

<!--            <ul>-->
<!--                <li><i class="far fa-dot-circle"></i> <a href="https://www.youtube.com/watch?v=SOe0D-Og3nQ&list=PL0QP7T2SN94atYZswlnBMhDuIYoqlmlxy&index=1">How to install plugin & setup</a></li>-->
<!---->
<!---->
<!--            </ul>-->



            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'get_support',
                //'parent'		=> '',
                'title'		=> __('Ask question','accordions'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>

            <p class="">We wish your 2 minutes to write your feedback about the <b>PickPlugins Product Slider</b> plugin. give us <span style="color: #ffae19"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></p>

            <a target="_blank" href="https://wordpress.org/plugins/accordions/#reviews" class="button"><i class="fab fa-wordpress"></i> Write a review</a>


            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'reviews',
                //'parent'		=> '',
                'title'		=> __('Submit reviews','accordions'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            $accordions_plugin_info = get_option('accordions_plugin_info');

            //delete_option('accordions_plugin_info');
            //var_dump($accordions_plugin_info);

            $migration_reset_stats = isset($accordions_plugin_info['migration_reset']) ? $accordions_plugin_info['migration_reset'] : '';


            $actionurl = admin_url().'edit.php?post_type=accordions&page=settings&tab=help_support';
            $actionurl = wp_nonce_url( $actionurl,  'accordions_reset_migration' );

            $nonce = isset($_REQUEST['_wpnonce']) ? $_REQUEST['_wpnonce'] : '';

            if ( wp_verify_nonce( $nonce, 'accordions_reset_migration' )  ){

                $accordions_plugin_info['migration_reset'] = 'processing';
                update_option('accordions_plugin_info', $accordions_plugin_info);

                wp_schedule_event(time(), '1minute', 'accordions_cron_reset_migrate');


                $migration_reset_stats = 'processing';
            }

            if($migration_reset_stats == 'processing'){

                $url = admin_url().'edit.php?post_type=accordions&page=settings&tab=help_support';

                ?>
                <p style="color: #f00;"><i class="fas fa-spin fa-spinner"></i> Migration reset on process, please wait until complete.</p>
                <p><a href="<?php echo $url; ?>">Refresh</a> to check Migration reset stats</p>

                <script>
                    setTimeout(function(){
                        window.location.href = '<?php echo $url; ?>';
                    }, 1000*20);

                </script>


                <?php
            }elseif($migration_reset_stats == 'done'){
                ?>
                <p style="color: #22631a;font-weight: bold;"><i class="fas fa-check"></i> Migration reset completed.</p>
                <?php
            }else{

            }



            ?>

            <p class="">Please click the button bellow to reset migration data, you can start over, Please use with caution, your new migrate data will deleted. you can use default <a href="<?php echo admin_url().'export.php'; ?>">export</a> menu to take your wcps, wcps layouts data saved.</p>

            <p class="reset-migration"><a class="button  button-primary" href="<?php echo $actionurl; ?>">Reset migration</a> <span style="display: none; color: #f2433f; margin: 0 5px"> Click again to confirm!</span></p>

            <script>
                jQuery(document).ready(function($){
                    $(document).on('click','.reset-migration a',function(event){

                        event.preventDefault();

                        is_confirm = $(this).attr('confirm');
                        url = $(this).attr('href');

                        if(is_confirm == 'ok'){
                            window.location.href = url;
                        }else{
                            $(this).attr('confirm', 'ok');


                        }
                        $('.reset-migration span').fadeIn();

                    })
                })
            </script>

            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'reset_migrate',
                //'parent'		=> '',
                'title'		=> __('Reset migration','accordions'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);










            ?>


        </div>
        <?php


    }
}






add_action('accordions_settings_content_buy_pro', 'accordions_settings_content_buy_pro');

if(!function_exists('accordions_settings_content_buy_pro')) {
    function accordions_settings_content_buy_pro($tab){

        $settings_tabs_field = new settings_tabs_field();


        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Get Premium', 'accordions'); ?></div>
            <p class="description section-description"><?php echo __('Thanks for using our plugin, if you looking for some advance feature please buy premium version.', 'accordions'); ?></p>

            <?php


            ob_start();
            ?>

            <p><?php echo __('If you love our plugin and want more feature please consider to buy pro version.', 'accordions'); ?></p>
            <a class="button" href="https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=dashobard"><?php echo __('Buy premium', 'accordions'); ?></a>
            <a class="button" href="http://www.pickplugins.com/demo/accordions/?ref=dashobard"><?php echo __('See all demo', 'accordions'); ?></a>

            <h2><?php echo __('See the differences','accordions'); ?></h2>

            <table class="pro-features">
                <thead>
                <tr>
                    <th class="col-features"><?php echo __('Features','accordions'); ?></th>
                    <th class="col-free"><?php echo __('Free','accordions'); ?></th>
                    <th class="col-pro"><?php echo __('Premium','accordions'); ?></th>
                </tr>
                </thead>

                <tr>
                    <td class="col-features"><?php echo __('Nested/multi level accordion','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Click header to scroll top','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Header text toggle','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Display expand/collapse all button','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Expand/collapse all text','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Expand/collapse all button background color','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Header click track & stats','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Header background image','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Custom background color','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Active accordion on page load','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Icon position to right','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Enable search','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Search placeholder text','accordions'); ?> </td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>


                <tr>
                    <td class="col-features"><?php echo __('Enable lazy load','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Lazy load image','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Enable autoembed','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('3rd party shortcode on content','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Enable wpautop','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Schema for FAQ page','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion feature collapsible','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion feature keep expanded others','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion feature content height style','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion feature activate event','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion custom active icon','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion custom inactive icon','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion icons text color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion icons hover color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion icons background color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion icons font size','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion icons padding','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion icons margin','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion header custom class','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion header background color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion header Active background color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion header text color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion header hover text color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion header font size','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion header padding','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion header margin','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion header font family','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>



                <tr>
                    <td class="col-features"><?php echo __('Accordion content custom class','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion content background color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordion content text color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>


                <tr>
                    <td class="col-features"><?php echo __('Accordion content font size','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion content padding','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion content margin','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion content font family','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>



                <tr>
                    <td class="col-features"><?php echo __('Accordion container padding','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion container background color','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion container background image','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Accordion container text align','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Sort accordion content','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Hide accordion content','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('WP editor for accordion content','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Font-awesome version selection','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Accordions preview on frontend','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Export accordion','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>

                <tr>
                    <td class="col-features"><?php echo __('Import accordion','accordions'); ?> </td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>



                <tr>
                    <th class="col-features"><?php echo __('Features','accordions'); ?></th>
                    <th class="col-free"><?php echo __('Free','accordions'); ?></th>
                    <th class="col-pro"><?php echo __('Premium','accordions'); ?></th>
                </tr>
                <tr>
                    <td class="col-features"><?php echo __('Buy now','accordions'); ?></td>
                    <td> </td>
                    <td><a class="button" href="https://www.pickplugins.com/item/accordions-html-css3-responsive-accordion-grid-for-wordpress/?ref=dashobard"><?php echo __('Buy premium', 'accordions'); ?></a></td>
                </tr>

            </table>



            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'get_pro',
                'title'		=> __('Get pro version','accordions'),
                'details'	=> '',
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ?>


        </div>

        <style type="text/css">
            .pro-features{
                margin: 30px 0;
                border-collapse: collapse;
                border: 1px solid #ddd;
            }
            .pro-features th{
                width: 120px;
                background: #ddd;
                padding: 10px;
            }
            .pro-features tr{
            }
            .pro-features td{
                border-bottom: 1px solid #ddd;
                padding: 10px 10px;
                text-align: center;
            }
            .pro-features .col-features{
                width: 230px;
                text-align: left;
            }

            .pro-features .col-free{
            }
            .pro-features .col-pro{
            }

            .pro-features i.fas.fa-check {
                color: #139e3e;
                font-size: 16px;
            }
            .pro-features i.fas.fa-times {
                color: #f00;
                font-size: 17px;
            }
        </style>
        <?php


    }
}









add_action('accordions_settings_save', 'accordions_settings_save');

function accordions_settings_save(){

    $accordions_settings = isset($_POST['accordions_settings']) ?  stripslashes_deep($_POST['accordions_settings']) : array();
    update_option('accordions_settings', $accordions_settings);
}
