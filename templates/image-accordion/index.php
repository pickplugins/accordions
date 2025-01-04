<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('accordions_builder_imageAccordion', 'accordions_builder_imageAccordion', 5, 2);

function accordions_builder_imageAccordion($post_id, $accordionData)
{



    $globalOptions = isset($accordionData["globalOptions"]) ? $accordionData["globalOptions"] : [];
    $lazyLoad = isset($globalOptions["lazyLoad"]) ? $globalOptions["lazyLoad"] : false;
    $stats = isset($globalOptions["stats"]) ? $globalOptions["stats"] : false;
    $schema = isset($globalOptions["schema"]) ? $globalOptions["schema"] : true;
    $autoPlay = isset($globalOptions["autoPlay"]) ? $globalOptions["autoPlay"] : false;
    $autoPlayTimeout = isset($globalOptions["autoPlayTimeout"]) ? $globalOptions["autoPlayTimeout"] : 2000;
    $autoPlayDelay = isset($globalOptions["autoPlayDelay"]) ? $globalOptions["autoPlayDelay"] : 2000;
    $autoPlayOrder = isset($globalOptions["autoPlayOrder"]) ? $globalOptions["autoPlayOrder"] : "topToBottom";
    $itemSource = isset($globalOptions["itemSource"]) ? $globalOptions["itemSource"] : "topToBottom";



    $keepExpandOther = isset($globalOptions["keepExpandOther"]) ? $globalOptions["keepExpandOther"] : false;
    $activeEvent = isset($globalOptions["activeEvent"]) ? $globalOptions["activeEvent"] : "";
    $urlHash = isset($globalOptions["urlHash"]) ? $globalOptions["urlHash"] : "";
    $clickToScrollTop = isset($globalOptions["clickToScrollTop"]) ? $globalOptions["clickToScrollTop"] : "";
    $clickToScrollTopOffset = isset($globalOptions["clickToScrollTopOffset"]) ? $globalOptions["clickToScrollTopOffset"] : "";



    $items = isset($accordionData["items"]) ? $accordionData["items"] : [];
    $itemQueryArgs = isset($accordionData["itemQueryArgs"]) ? $accordionData["itemQueryArgs"] : [];

    if ($itemSource == "posts") {
        $items = accordions_post_query_items($itemQueryArgs);
    }
    if ($itemSource == "terms") {
        $items = accordions_terms_query_item($itemQueryArgs);
    }
    if ($itemSource == "easyAccordion") {
        $items = accordions_easy_accordion_query_item($itemQueryArgs);
    }



    //var_dump($items);





    $reponsiveCss = isset($accordionData["reponsiveCss"]) ? $accordionData["reponsiveCss"] : "";


    $wrapper = isset($accordionData["wrapper"]) ? $accordionData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";





    $blockId = "accordions-" . $post_id;

    $navsIndex = [];
    if (!empty($items))
        foreach ($items as $i => $tab) {
            $navsIndex[$i] = $i;
        }

    $activeTab = 0;
    $navActiveIndex = 0;

    $accordionDataAttr = [
        "id" => $blockId,
        "navActiveIndex" => $navActiveIndex,
        "activeTab" => "pg" . $activeTab,
        "activeEvent" => $activeEvent,
        "autoPlay" => $autoPlay,
        "autoPlayTimeout" => $autoPlayTimeout,
        "autoPlayDelay" => $autoPlayDelay,
        "autoPlayOrder" => $autoPlayOrder,
        "stats" => $stats,
        "urlHash" => $urlHash,
        "clickToScrollTop" => $clickToScrollTop,
        "clickToScrollTopOffset" => $clickToScrollTopOffset,

        "lazyLoad" => $lazyLoad,
        "navsIndex" => $navsIndex,

    ];


    $activeTab = 999;
    $labelCounterEnable = false;
?>
    <div id="<?php echo esc_attr($blockId); ?>" class="image-accordion-wrapper <?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> " data-pgTabs="<?php echo esc_attr(json_encode($accordionDataAttr)); ?>" style="<?php echo ($lazyLoad) ? "display: none;" : ""; ?>">



        <?php
        foreach ($items as $index => $item) {
            $link = isset($item["link"]) ? $item["link"] : "";
            $title = isset($item["title"]) ? $item["title"] : "";
            $content = isset($item["content"]) ? $item["content"] : "";
            $image = isset($item["image"]) ? $item["image"] : "";
            $imageId = isset($image["id"]) ? $image["id"] : "";
            $imageUrl = isset($image["url"]) ? $image["url"] : "";
            $imageAltText = isset($image["altText"]) ? $image["altText"] : "";


            // if ($panelWrapAutoembed) {
            //     $WP_Embed = new WP_Embed();
            //     $contentText = $WP_Embed->autoembed($contentText);
            // }

            // if ($panelWrapShortcodes) {
            //     //$contentText = apply_filters('the_content', $contentText);
            //     //$contentText = do_blocks($contentText);
            // }

            // if ($panelWrapShortcodes) {
            //     $contentText = do_shortcode($contentText);
            // }


            // if ($panelWrapWpautop) {
            //     //$contentText = wpautop($contentText);
            // }





        ?>

            <div class="image-accordion-item <?php echo ($index == $activeTab) ? 'image-accordion-item-active' : '' ?>" aria-labelledby="<?php echo esc_attr($index); ?>">
                <img src="<?php echo $imageUrl; ?>" class="image-accordion-image image-accordion-image" />
                <div class=" image-accordion-content-wrap">
                    <div class=" image-accordion-title"><?php echo $title; ?></div>
                    <div class="accordion-content image-accordion-content"><?php echo $content; ?></div>
                </div>
            </div>
        <?php
        }

        ?>





    </div>

    <style>
        <?php
        echo $reponsiveCss;
        ?>
    </style>

<?php
}
