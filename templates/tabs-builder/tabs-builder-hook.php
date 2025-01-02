<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('accordions_builder_tabs', 'accordions_builder_tabs', 5, 2);

function accordions_builder_tabs($post_id, $accordionData)
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







    $icon = isset($accordionData["icon"]) ? $accordionData["icon"] : [];
    $iconOptions = isset($icon["options"]) ? $icon["options"] : [];
    $iconText = isset($iconOptions["text"]) ? $iconOptions["text"] : "";


    $reponsiveCss = isset($accordionData["reponsiveCss"]) ? $accordionData["reponsiveCss"] : "";


    $wrapper = isset($accordionData["wrapper"]) ? $accordionData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";

    $panelWrap = isset($accordionData["panelWrap"]) ? $accordionData["panelWrap"] : [];
    $panelWrapOptions = isset($panelWrap["options"]) ? $panelWrap["options"] : [];
    $panelWrapTag = !empty($panelWrapOptions["tag"]) ? $panelWrapOptions["tag"] : "div";
    $panelWrapClass = isset($panelWrapOptions["class"]) ? $panelWrapOptions["class"] : "";

    $panelWrapInAnimation = isset($panelWrapOptions["inAnimation"]) ? $panelWrapOptions["inAnimation"] : "";
    $panelWrapOutAnimation = isset($panelWrapOptions["outAnimation"]) ? $panelWrapOptions["outAnimation"] : "";
    $panelWrapAnimationDuration = isset($panelWrapOptions["animationDuration"]) ? $panelWrapOptions["animationDuration"] : 0;

    $panelWrapAutoembed = isset($panelWrapOptions["autoembed"]) ? $panelWrapOptions["autoembed"] : true;
    $panelWrapShortcodes = isset($panelWrapOptions["shortcodes"]) ? $panelWrapOptions["shortcodes"] : true;
    $panelWrapWpautop = isset($panelWrapOptions["wpautop"]) ? $panelWrapOptions["wpautop"] : true;



    $header = isset($accordionData["header"]) ? $accordionData["header"] : [];
    $headerOptions = isset($header["options"]) ? $header["options"] : [];
    $headerTag = isset($headerOptions["tag"]) ? $headerOptions["tag"] : "div";
    $headerClass = isset($headerOptions["class"]) ? $headerOptions["class"] : "";

    $headerLabel = isset($accordionData["headerLabel"]) ? $accordionData["headerLabel"] : [];
    $headerLabelOptions = isset($headerLabel["options"]) ? $headerLabel["options"] : [];
    $headerLabelTag = !empty($headerLabelOptions["tag"]) ? $headerLabelOptions["tag"] : "div";
    $headerLabelClass = isset($headerLabelOptions["class"]) ? $headerLabelOptions["class"] : "";

    $labelCounter = isset($accordionData["labelCounter"]) ? $accordionData["labelCounter"] : [];
    $labelCounterOptions = isset($labelCounter["options"]) ? $labelCounter["options"] : [];
    $labelCounterTag = !empty($labelCounterOptions["tag"]) ? $labelCounterOptions["tag"] : "div";
    $labelCounterClass = isset($labelCounterOptions["class"]) ? $labelCounterOptions["class"] : "";
    $labelCounterPosition = isset($labelCounterOptions["position"]) ? $labelCounterOptions["position"] : "left";

    $labelIcon = isset($accordionData["labelIcon"]) ? $accordionData["labelIcon"] : [];
    $labelIconOptions = isset($labelIcon["options"]) ? $labelIcon["options"] : [];
    $labelIconTag = !empty($labelIconOptions["tag"]) ? $labelIconOptions["tag"] : "div";
    $labelIconPosition = isset($labelIconOptions["position"]) ? $labelIconOptions["position"] : "left";
    $labelIconLibrary = isset($labelIconOptions['library']) ? $labelIconOptions['library'] : "fontAwesome";
    $labelIconSrcType = !empty($labelIconOptions['srcType']) ? $labelIconOptions['srcType'] : "";
    $labelIconSrc = !empty($labelIconOptions['iconSrc']) ? $labelIconOptions['iconSrc'] : "";
    $labelIconClass = !empty($labelIconOptions['class']) ? $labelIconOptions['class'] : "";
    $labelIconHtml = !empty($labelIconSrc) ? '<span class="accordion-label-icon ' . $labelIconClass . ' ' . $labelIconSrc . '"></span>' : '';



    $icon = isset($accordionData["icon"]) ? $accordionData["icon"] : [];
    $iconOptions = isset($icon["options"]) ? $icon["options"] : [];
    $iconTag = !empty($iconOptions["tag"]) ? $iconOptions["tag"] : "span";
    $iconClass = isset($iconOptions["class"]) ? $iconOptions["class"] : "";
    $iconPosition = isset($iconOptions["position"]) ? $iconOptions["position"] : "left";
    $iconInAnimation = isset($iconOptions["inAnimation"]) ? $iconOptions["inAnimation"] : "";
    $iconOutAnimation = isset($iconOptions["outAnimation"]) ? $iconOptions["outAnimation"] : "";
    $iconAnimationDuration = isset($iconOptions["animationDuration"]) ? $iconOptions["animationDuration"] : 0;


    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : "fontAwesome";
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : "";
    $iconSrc = !empty($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : "";
    $iconIdleHtml = !empty($iconSrc) ? '<span class="nav-icon-idle ' . $iconSrc . '"></span>' : '';



    $iconToggle = isset($accordionData["iconToggle"]) ? $accordionData["iconToggle"] : [];
    $iconToggleOptions = isset($iconToggle["options"]) ? $iconToggle["options"] : [];
    $iconToggleTag = !empty($iconToggleOptions["tag"]) ? $iconToggleOptions["tag"] : "span";
    $iconToggleClass = isset($iconToggleOptions["class"]) ? $iconToggleOptions["class"] : "";

    $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : "fontAwesome";
    $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : "";
    $iconToggleSrc = !empty($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : "";
    $iconToggleHtml = !empty($iconToggleSrc) ? '<span  class="nav-icon-toggle ' . $iconToggleSrc . '"></span>' : '';


    if ($iconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
    }
    if ($iconToggleLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
    } else if ($iconToggleLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
    } else if ($iconToggleLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
    }

    if ($labelIconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
    } else if ($labelIconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
    } else if ($labelIconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
    }




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
        "iconInAnimation" => $iconInAnimation,
        "iconOutAnimation" => $iconOutAnimation,
        "iconAnimationDuration" => $iconAnimationDuration,
        "panelWrapInAnimation" => $panelWrapInAnimation,
        "panelWrapOutAnimation" => $panelWrapOutAnimation,
        "panelWrapAnimationDuration" => $panelWrapAnimationDuration,
        "lazyLoad" => $lazyLoad,
        "navsIndex" => $navsIndex,

    ];


    $activeTab = 999;
    $labelCounterEnable = false;
?>
    <div id="<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> " data-pgTabs="<?php echo esc_attr(json_encode($accordionDataAttr)); ?>" style="<?php echo ($lazyLoad) ? "display: none;" : ""; ?>">
        <div class="navs-wrapper" role="tablist">
            <?php
            foreach ($items as $index => $item) {
                //$tablink = strtolower($tab['title']);
                //$tablink = str_replace(" ", "-", $tablink);


                $headerLabelText = isset($item["headerLabelText"]) ? $item["headerLabelText"] : "";
                $headerLabelToggledText = isset($item["headerLabelToggledText"]) ? $item["headerLabelToggledText"] : "";
                $headerLabelSlug = isset($item["headerLabelSlug"]) ? $item["headerLabelSlug"] : "";

                $headerLabelSlug = !empty($headerLabelSlug) ? ($headerLabelSlug) : strtolower($headerLabelText);
                $headerLabelSlug = str_replace(" ", "-", $headerLabelSlug);

                $itemLabelIcon = isset($item["labelIcon"]) ? $item["labelIcon"] : [];
                $itemLabelIconOptions = isset($itemLabelIcon["options"]) ? $itemLabelIcon["options"] : [];
                $itemLabelIconSrc = isset($itemLabelIconOptions["iconSrc"]) ? $itemLabelIconOptions["iconSrc"] : "";


            ?>
                <div id="pg<?php echo esc_attr($index); ?>" data-tab-id="pg<?php echo esc_attr($index); ?>" class="<?php echo ($index == $activeTab) ? ' nav-item  ' : 'nav-item ' ?>" role="tab" tabIndex="<?php echo ($index == $activeTab) ? '0' : '-1' ?>" aria-controls="tabs-<?php echo esc_attr($index); ?>" aria-selected="false" aria-expanded="false" index="<?php echo esc_attr($index); ?>">


                    <?php if ($iconPosition == 'before') : ?>
                        <span class="nav-icon">
                            <?php echo wp_kses_post($iconIdleHtml); ?>
                            <?php echo wp_kses_post($iconToggleHtml); ?>
                        </span>

                    <?php endif; ?>


                    <?php if ($labelIconPosition == 'beforeLabel') : ?>


                        <?php if (empty($itemLabelIconSrc)): ?>
                            <?php echo wp_kses_post($labelIconHtml); ?>
                        <?php else: ?>
                            <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                        <?php endif; ?>


                    <?php endif; ?>





                    <a href="#<?php echo  esc_attr($headerLabelSlug) ?>" class="nav-label" index="<?php echo esc_attr($index); ?>">
                        <?php if ($labelCounterEnable): ?>
                            <span class="label-counter"><?php echo esc_html($index + 1); ?></span>
                        <?php endif; ?>

                        <?php if ($labelIconPosition == 'beforeLabelText') : ?>
                            <?php if (empty($itemLabelIconSrc)): ?>
                                <?php echo wp_kses_post($labelIconHtml); ?>
                            <?php else: ?>
                                <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                            <?php endif; ?>
                        <?php endif; ?>

                        <?php echo wp_kses_post($headerLabelText); ?>

                        <?php if ($labelIconPosition == 'afterLabelText') : ?>
                            <?php if (empty($itemLabelIconSrc)): ?>
                                <?php echo wp_kses_post($labelIconHtml); ?>
                            <?php else: ?>
                                <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                            <?php endif; ?>
                        <?php endif; ?>
                    </a>
                    <?php if ($labelIconPosition == 'afterLabel') : ?>
                        <?php if (empty($itemLabelIconSrc)): ?>
                            <?php echo wp_kses_post($labelIconHtml); ?>
                        <?php else: ?>
                            <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                        <?php endif; ?>
                    <?php endif; ?>
                    <?php if ($iconPosition == 'after') : ?>
                        <span class="nav-icon">
                            <?php echo wp_kses_post($iconIdleHtml); ?>
                            <?php echo wp_kses_post($iconToggleHtml); ?>
                        </span>
                    <?php endif; ?>
                </div>
            <?php
            }
            ?>
        </div>
        <div class='panels-wrap'>

            <?php
            foreach ($items as $index => $item) {
                $contentText = isset($item["contentText"]) ? $item["contentText"] : "";


                if ($panelWrapAutoembed) {
                    $WP_Embed = new WP_Embed();
                    $contentText = $WP_Embed->autoembed($contentText);
                }

                if ($panelWrapShortcodes) {
                    //$contentText = apply_filters('the_content', $contentText);
                    //$contentText = do_blocks($contentText);
                }

                if ($panelWrapShortcodes) {
                    $contentText = do_shortcode($contentText);
                }


                if ($panelWrapWpautop) {
                    //$contentText = wpautop($contentText);
                }





            ?>

                <div class="tabs-panel <?php echo ($index == $activeTab) ? 'tabs-panel-active' : '' ?>" data-tab-id="pg<?php echo esc_attr($index); ?>" hidden="true" aria-hidden="true" role="tabpanel" aria-labelledby="<?php echo esc_attr($index); ?>">
                    <?php echo ($contentText); ?>
                </div>
            <?php
            }

            ?>



        </div>

    </div>

    <style>
        <?php
        echo $reponsiveCss;
        ?>
    </style>

<?php
}
