<?php
if (! defined('ABSPATH')) exit; // if direct access 

class class_accordions_notices
{

    public function __construct()
    {
        //add_action('admin_notices', array( $this, 'data_upgrade' ));
        add_action('admin_notices', array($this, 'beta_test'));
    }



    public function beta_test()
    {
        // delete_option("accordions_notices");


        $screen = get_current_screen();
        $accordions_notices = get_option('accordions_notices', []);
        $is_hidden = isset($accordions_notices['hide_notice_beta_test']) ? $accordions_notices['hide_notice_beta_test'] : 'no';
        $actionurl = admin_url() . '?hide_notice_beta_test=yes';
        $actionurl = wp_nonce_url($actionurl,  'hide_notice_beta_test');
        $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';
        $hide_notice_beta_test = isset($_REQUEST['hide_notice_beta_test']) ? sanitize_text_field($_REQUEST['hide_notice_beta_test']) : '';
        if (wp_verify_nonce($nonce, 'hide_notice_beta_test') && $hide_notice_beta_test == 'yes') {
            $accordions_notices['hide_notice_beta_test'] = 'hidden';
            update_option('accordions_notices', $accordions_notices);
            return;
        }
        ob_start();
        if ($is_hidden == 'no') :
?>
            <div class="notice">

                <h3>⚡ Intorducing React Based Modern Builder for Accordions, <strong><a target="_blank" href="<?php echo admin_url(); ?>edit.php?post_type=accordions&page=accordions-builder">Try Now</a></strong></h3>

                <p> <a style="margin: 0 20px;" class="" href="<?php echo esc_url_raw($actionurl) ?>">❌ Hide Notice</a></p>
            </div>
        <?php
        endif;
        echo (ob_get_clean());
    }







    public function data_upgrade()
    {



        $accordions_plugin_info = get_option('accordions_plugin_info');
        $accordions_upgrade = isset($accordions_plugin_info['accordions_upgrade']) ? $accordions_plugin_info['accordions_upgrade'] : '';


        $actionurl = admin_url() . 'edit.php?post_type=accordions&page=upgrade_status';
        $actionurl = wp_nonce_url($actionurl,  'accordions_upgrade');

        $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';

        if (wp_verify_nonce($nonce, 'accordions_upgrade')) {
            $accordions_plugin_info['accordions_upgrade'] = 'processing';
            update_option('accordions_plugin_info', $accordions_plugin_info);
            wp_schedule_event(time(), '1minute', 'accordions_cron_upgrade_settings');

            return;
        }


        if (empty($accordions_upgrade)) {

        ?>
            <div class="update-nag">
                <?php
                echo sprintf(__('Data migration required for <b>Accordions by PickPlugins</b> plugin, please <a class="button button-primary" href="%s">click to start</a> migration. Watch this <a target="_blank" href="https://www.youtube.com/watch?v=4ZGMA6hOoxs">video</a>  first', 'accordions'), esc_url_raw($actionurl));
                ?>
            </div>
<?php


        }
    }
}

new class_accordions_notices();
