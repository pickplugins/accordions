<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


$accordions_active_accordion = isset($_GET['id']) ? (int)sanitize_text_field($_GET['id']) : 0;


	?>
    <script>
        jQuery(document).ready(function($)
        {

            <?php

            if($accordions_tabs_vertical=='yes'){

                ?>
            $(function() {
                $( "#accordions-tabs-<?php echo $post_id; ?>" ).tabs().addClass( "ui-tabs-vertical " +
                    "ui-helper-clearfix" );
                $( "#accordions-tabs-<?php echo $post_id; ?> li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
            });

            $("#accordions-tabs-<?php echo $post_id; ?>" ).tabs({
                collapsible: <?php echo $accordions_tabs_collapsible; ?>,
                event: "<?php echo $accordions_tabs_active_event; ?>",
                active: "<?php echo $accordions_active_accordion; ?>",

            });
                <?php

            }
            else{

                ?>
            $( "#accordions-tabs-<?php echo $post_id; ?>" ).tabs({
                collapsible: <?php echo $accordions_tabs_collapsible; ?>,
                event: "<?php echo $accordions_tabs_active_event; ?>",
                active: "<?php echo $accordions_active_accordion; ?>",
            });
                <?php


            }

            ?>
        })

    </script>