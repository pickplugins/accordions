<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


if(isset($_GET['id'])){

    $accordions_active_accordion = (int)sanitize_text_field($_GET['id']);
}else{
    if(!isset($accordions_active_accordion)){
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
        accordions_header_toggle = "<?php echo $accordions_header_toggle;?>";
        accordions_click_track = "<?php echo $accordions_click_track;?>";

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

                if($accordions_click_scroll_top == 'yes'){
                    ?>
                    activate: function( event, ui ) {
                        if(!$.isEmptyObject(ui.newHeader.offset())) {
                            $("html:not(:animated), body:not(:animated)").animate({ scrollTop: ui.newHeader.offset().top + <?php echo $accordions_click_scroll_top_offset;?> }, "slow");
		                }
	                },
                <?php
                }
                ?>
                changestart: function(event, ui) {
                    child.accordion("activate", false);
                }
                });

                var child = $(".child-accordion .items").accordion({
                    active:<?php echo $accordions_active_child_accordion; ?>,
                    <?php if($accordions_expaned_other == 'yes'){ ?>
                    beforeActivate: function(event, ui) {
                        // The accordion believes a panel is being opened
                        if (ui.newHeader[0]) {
                            var currHeader  = ui.newHeader;
                            var currContent = currHeader.next(".ui-accordion-content");
                            // The accordion believes a panel is being closed
                        } else {
                            var currHeader  = ui.oldHeader;
                            var currContent = currHeader.next(".ui-accordion-content");
                        }
                        // Since weve changed the default behavior, this detects the actual status
                        var isPanelSelected = currHeader.attr("aria-selected") == "true";
                        // Toggle the panels header
                        currHeader.toggleClass("ui-corner-all",isPanelSelected).toggleClass("accordion-header-active ui-state-active ui-corner-top",!isPanelSelected).attr("aria-selected",((!isPanelSelected).toString()));
                        // Toggle the panels icon
                        currHeader.children(".ui-icon").toggleClass("ui-icon-triangle-1-e",isPanelSelected).toggleClass("ui-icon-triangle-1-s",!isPanelSelected);
                        // Toggle the panels content
                        currContent.toggleClass("accordion-content-active",!isPanelSelected)
                        if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

                        return false; // Cancels the default action
                        },
                    <?php
                    }

                    if($accordions_click_scroll_top == 'yes'){ ?>
                        activate: function( event, ui ) {
								if(!$.isEmptyObject(ui.newHeader.offset())) {
									$("html:not(:animated), body:not(:animated)").animate({ scrollTop: ui.newHeader.offset().top + <?php echo $accordions_click_scroll_top_offset; ?> }, "slow");
		                        }
	                    },
                    <?php
                    }
                    ?>
                    heightStyle: "content",
                    collapsible: true,
                    animated: "swing",
                });

                    $(".previous, .next").click(function () {

                        var index = 0;
                        console.log("gCurrentIndex:"+gCurrentIndex);
                        console.log("index:"+index);

                        if ($(this).hasClass("next")) {
                            index = gCurrentIndex + 1;
                            if (index > ACCORDION_PANEL_COUNT ) {
                                index = ACCORDION_PANEL_COUNT;
                            }
                        }
                        else {
                            index = gCurrentIndex - 1;
                            if (index < 0) {
                                index = 0;
                            }
                        }

                        wizard_accordion.accordion("option", "active", index);


                    });
                })
    </script>
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