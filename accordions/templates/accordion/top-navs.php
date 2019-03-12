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

    if($enable_search=='yes'){
    ?>
    <div id="search-input-<?php echo $post_id; ?>" class="search-input-wrap" >
        <input class="search-input" placeholder="<?php echo __('Search here...','accordions'); ?>" value="">
    </div>
        <?php
    }

    ?>

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

<script>
    jQuery(document).ready(function($){
        jQuery(document).on('keyup', '#search-input-<?php echo $post_id; ?> input.search-input', function(){
            keyword = jQuery(this).val().toLowerCase();

            content_head = [];
            content_body = [];
            //console.log(content_full);


            //console.log(keyword);
            $('#accordions-<?php echo $post_id; ?> .items  .accordions-head-title').each(function( index ) {
                //console.log( index + ": " + $( this ).text() );


                //console.log(index);
                content = $( this ).text().toLowerCase();

                content_head[index] = content;


                // n = content.indexOf(keyword);
                // if(n<0){
                //     $( this ).parent().hide();
                // }else{
                //     $( this ).parent().show();
                // }
            });




            $('#accordions-<?php echo $post_id; ?> .items  .accordion-content').each(function( index ) {
                //console.log( index + ": " + $( this ).text() );

                content = $( this ).text().toLowerCase();
                content_body[index] = content + ' ' + content_head[index];
                //$( this ).focus();
                //console.log(content_head[index]);


                n = content_body[index].indexOf(keyword);

                if(n<0){
                    $( this ).prev().hide();
                }else{
                    $( this ).prev().show();
                }


            });

            //console.log(content_head);
            //console.log(content_body);



        })

    })
</script>