<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

//var_dump($accordions_expand_collapse_display);

?>
<div class="top-navs">
<?php

if($accordions_expand_collapse_display=='yes'){

    ?>
    <div id="expand-collapse-<?php echo $post_id; ?>" class="expand-collapse" accordion-id="<?php echo $post_id; ?>">
        <span class="expand"><i class="fas fa-expand"></i> <?php echo __("Expand all", 'accordions'); ?></span>
        <span class="collapse"><i class="fas fa-compress"></i> <?php echo __("Collapse all", 'accordions');?></span>
    </div>
    <?php
}

?>
</div>
