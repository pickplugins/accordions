<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


if(isset($_GET['id'])){

    $accordions_active_accordion = (int)sanitize_text_field($_GET['id']);
}else{
    if(empty($accordions_active_accordion)){
        $accordions_active_accordion = 99999;
    }
}




if(isset($_GET['c_id'])){

    $accordions_active_child_accordion = (int)sanitize_text_field($_GET['c_id']);
    }
else{
    $accordions_active_child_accordion = 'true';
    }



if($accordions_child=='yes'){
        $accordions_class = 'child-accordion';
    }
else{
    $accordions_class = 'accordions';


    //var_dump($accordions_active_accordion);

    ?>
    <script>
        jQuery(document).ready(function($){
            wizard_accordion  = $("#accordions-<?php echo $post_id; ?>.accordions .items").accordion({
                event: "<?php echo $accordions_active_event;?>",
                collapsible:<?php echo $accordions_collapsible; ?>,
                heightStyle: "<?php echo $accordions_heightStyle; ?>",
                animate: ("<?php echo $accordions_animate_style; ?>", <?php echo $accordions_animate_delay; ?>),
                navigation: true,
                active: <?php echo $accordions_active_accordion; ?>,
                <?php
                if($accordions_expaned_other == 'yes'){
                ?>
                beforeActivate: function(event, ui) {
                    if (ui.newHeader[0]) {
                        var currHeader  = ui.newHeader;
                        var currContent = currHeader.next(".ui-accordion-content");
                    } else {
                        var currHeader  = ui.oldHeader;
                        var currContent = currHeader.next(".ui-accordion-content");
                    }
                    var isPanelSelected = currHeader.attr("aria-selected") == "true";
                    currHeader.toggleClass("ui-corner-all",isPanelSelected).toggleClass("accordion-header-active ui-state-active ui-corner-top",!isPanelSelected).attr("aria-selected",((!isPanelSelected).toString()));
                    currHeader.children(".ui-icon").toggleClass("ui-icon-triangle-1-e",isPanelSelected).toggleClass("ui-icon-triangle-1-s",!isPanelSelected);
                    currContent.toggleClass("accordion-content-active",!isPanelSelected)
                    if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
                    return false;
                    },
                <?php
                }

                ?>
            });
        })</script>
    <?php
    }



    if(!empty($accordions_custom_js)):
        ?>
    <script>
        jQuery(document).ready(function($){
            <?php echo $accordions_custom_js; ?>
        })
    </script>
        <?php
    endif;