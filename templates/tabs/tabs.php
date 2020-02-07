<?php
if ( ! defined('ABSPATH')) exit;  // if direct access 


$accordions_fontawesome_ver = get_option('accordions_fontawesome_ver','version-5');

include accordions_plugin_dir.'/templates/tabs/variables.php';
include accordions_plugin_dir.'/templates/tabs/tabs-scripts.php';
include accordions_plugin_dir.'/templates/tabs/tabs-custom-css.php';
include accordions_plugin_dir.'/templates/tabs/tabs-lazy.php';


?>
    <div id="accordions-tabs-<?php echo $post_id;?>" class="accordions-tabs-themes accordions-tabs <?php echo $accordions_tabs_themes;?> accordions-tabs-<?php echo $post_id;?>">
        <ul>
            <?php




            if(!empty($accordions_content_title))
                foreach ($accordions_content_title as $index => $accordions_title){

                    if(empty($accordions_hide[$index])){

                        include accordions_plugin_dir.'/templates/tabs/tabs-header.php';


                    }
                }

            ?>
        </ul>
        <?php


        if(!empty($accordions_content_title))
            foreach ($accordions_content_title as $index => $accordions_title){

                if(empty($accordions_hide[$index])){
                    ?>
                    <div class="tabs-content" id="tabs-<?php echo $index;?>">
                        <?php

                        include accordions_plugin_dir.'/templates/tabs/tabs-content.php';
                        ?>
                    </div>
                    <?php
                }
            }


        ?>
    </div>
    <link rel="stylesheet" type="text/css" media="all" href="<?php echo accordions_plugin_url; ?>assets/frontend/css/jquery-ui.css"/>
    <link rel="stylesheet" type="text/css" media="all" href="<?php echo accordions_plugin_url; ?>assets/global/css/themesTabs.style.css"/>

<?php

if($accordions_fontawesome_ver =='none'){

}elseif($accordions_fontawesome_ver =='version-4'){
    wp_enqueue_style('fontawesome-4');
}else{
    wp_enqueue_style('fontawesome-5');
}

?>