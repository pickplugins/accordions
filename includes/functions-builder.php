<?php
if (!defined('ABSPATH')) exit;  // if direct access


add_action('wp_footer', 'accordions_global_json_ld', 80);



function accordions_global_json_ld()
{
    global $accordionsSchema;

    var_dump($accordionsSchema);


    if (!empty($accordionsSchema)) {
        foreach ($accordionsSchema as $json) {
            if (!empty($json)):
?>
                <script type="application/ld+json">
                    <?php echo wp_unslash(json_encode($json)); ?>
                </script>
<?php
            endif;
        }
    }
}
