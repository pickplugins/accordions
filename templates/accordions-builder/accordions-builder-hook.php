<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('accordions_builder_accordion', 'accordions_builder_accordion', 5, 2);

function accordions_builder_accordion($post_id, $accordionData)
{

    global $accordionsSchema;


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


    //var_dump(wp_json_encode($items));

    $expandCollapseAll = isset($accordionData["expandCollapseAll"]) ? $accordionData["expandCollapseAll"] : [];
    $expandCollapseAllOptions = isset($expandCollapseAll["options"]) ? $expandCollapseAll["options"] : [];



    $expandCollapseAllEnable = isset($expandCollapseAllOptions["enable"]) ? $expandCollapseAllOptions["enable"] : false;

    $expandAllText = isset($expandCollapseAllOptions["expandAllText"]) ? $expandCollapseAllOptions["expandAllText"] : "";
    $collapseAllText = isset($expandCollapseAllOptions["collapseAllText"]) ? $expandCollapseAllOptions["collapseAllText"] : "";
    $expandCollapseAllDelay = isset($expandCollapseAllOptions["delay"]) ? $expandCollapseAllOptions["delay"] : 0;

    $expandAllIcon = isset($expandCollapseAllOptions["expandAllIcon"]) ? $expandCollapseAllOptions["expandAllIcon"] : [];
    $expandAllIconLibrary = isset($expandAllIcon["library"]) ? $expandAllIcon["library"] : "";
    $expandAllIconSrcType = isset($expandAllIcon["srcType"]) ? $expandAllIcon["srcType"] : "";
    $expandAllIconSrc = isset($expandAllIcon["iconSrc"]) ? $expandAllIcon["iconSrc"] : "";

    $expandAllIconHtml = !empty($expandAllIconSrc) ? '<span class="' . $expandAllIconSrc . '"></span>' : '';



    $collapseAllIcon = isset($expandCollapseAllOptions["collapseAllIcon"]) ? $expandCollapseAllOptions["collapseAllIcon"] : [];
    $collapseAllIconLibrary = isset($collapseAllIcon["library"]) ? $collapseAllIcon["library"] : "";
    $collapseAllIconSrcType = isset($collapseAllIcon["srcType"]) ? $collapseAllIcon["srcType"] : "";
    $collapseAllIconSrc = isset($collapseAllIcon["iconSrc"]) ? $collapseAllIcon["iconSrc"] : "";

    $collapseAllIconHtml = !empty($collapseAllIconSrc) ? '<span class="' . $collapseAllIconSrc . '"></span>' : '';





    $icon = isset($accordionData["icon"]) ? $accordionData["icon"] : [];
    $iconOptions = isset($icon["options"]) ? $icon["options"] : [];
    $iconText = isset($iconOptions["text"]) ? $iconOptions["text"] : "";


    $reponsiveCss = isset($accordionData["reponsiveCss"]) ? $accordionData["reponsiveCss"] : "";




    $searchInput = isset($accordionData["searchInput"]) ? $accordionData["searchInput"] : [];
    $searchInputOptions = isset($searchInput["options"]) ? $searchInput["options"] : [];
    $searchInputEnable = !empty($searchInputOptions["enable"]) ? $searchInputOptions["enable"] : false;
    $searchInputPlaceholder = !empty($searchInputOptions["placeholder"]) ? $searchInputOptions["placeholder"] : "";


    $wrapper = isset($accordionData["wrapper"]) ? $accordionData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";

    $content = isset($accordionData["content"]) ? $accordionData["content"] : [];
    $contentOptions = isset($content["options"]) ? $content["options"] : [];
    $contentTag = !empty($contentOptions["tag"]) ? $contentOptions["tag"] : "div";
    $contentClass = isset($contentOptions["class"]) ? $contentOptions["class"] : "";

    $contentInAnimation = isset($contentOptions["inAnimation"]) ? $contentOptions["inAnimation"] : "";
    $contentOutAnimation = isset($contentOptions["outAnimation"]) ? $contentOptions["outAnimation"] : "";
    $contentAnimationDuration = isset($contentOptions["animationDuration"]) ? $contentOptions["animationDuration"] : 0;

    $contentAutoembed = isset($contentOptions["autoembed"]) ? $contentOptions["autoembed"] : true;
    $contentShortcodes = isset($contentOptions["shortcodes"]) ? $contentOptions["shortcodes"] : true;
    $contentWpautop = isset($contentOptions["wpautop"]) ? $contentOptions["wpautop"] : true;



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
    $labelIconClass = isset($labelIconOptions["class"]) ? $labelIconOptions["class"] : "";
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
    $iconIdleHtml = !empty($iconSrc) ? '<span class="accordion-icon-idle ' . $iconSrc . '"></span>' : '';



    $iconToggle = isset($accordionData["iconToggle"]) ? $accordionData["iconToggle"] : [];
    $iconToggleOptions = isset($iconToggle["options"]) ? $iconToggle["options"] : [];
    $iconToggleTag = !empty($iconToggleOptions["tag"]) ? $iconToggleOptions["tag"] : "span";
    $iconToggleClass = isset($iconToggleOptions["class"]) ? $iconToggleOptions["class"] : "";

    $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : "fontAwesome";
    $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : "";
    $iconToggleSrc = !empty($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : "";
    $iconToggleHtml = !empty($iconToggleSrc) ? '<span class="accordion-icon-toggle ' . $iconToggleSrc . '"></span>' : '';


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

    if ($expandAllIconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
    } else if ($expandAllIconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
    } else if ($expandAllIconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
    }
    if ($collapseAllIconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
    } else if ($collapseAllIconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
    } else if ($collapseAllIconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
    }

    $activeIndex = [];
    foreach ($items as $index => $item) {
        $itemActive = isset($item["active"]) ? (bool) $item["active"] : false;

        if ($itemActive) {
            $activeIndex[] = $index;
        }
    }

    $activeIndex[] = 9999;

    $blockId = "accordions-" . $post_id;




    $accordionDataAttr = [
        "id" => $blockId,
        "activeIndex" => $activeIndex,
        "activeEvent" => $activeEvent,
        "keepExpandOther" => $keepExpandOther,
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
        "contentInAnimation" => $contentInAnimation,
        "contentOutAnimation" => $contentOutAnimation,
        "contentAnimationDuration" => $contentAnimationDuration,
        "lazyLoad" => $lazyLoad,
        "expandCollapseAllDelay" => $expandCollapseAllDelay,
    ];




?>
    <div id="<?php echo esc_attr($blockId); ?>" class="pg-accordion-nested  " data-pgaccordion="<?php echo esc_attr(json_encode($accordionDataAttr)) ?>" role="tablist" style="<?php echo ($lazyLoad) ? "display: none;" : ""; ?>">

        <div class="top-wrap">

            <?php if ($searchInputEnable): ?>


                <form class="search-form" action="">
                    <input type="text" class="search-input" placeholder="<?php echo esc_attr($searchInputPlaceholder); ?>" />
                </form>


            <?php endif; ?>
            <?php if ($expandCollapseAllEnable): ?>
                <div class="expand-collapse-all" data-expandAllText="<?php echo esc_attr($expandAllText); ?>" data-collapseAllText="<?php echo esc_attr($collapseAllText); ?>" data-expandAllIconHtml="<?php echo esc_attr($expandAllIconHtml); ?>" data-collapseAllIconHtml="<?php echo esc_attr($collapseAllIconHtml); ?>">
                    <?php echo $expandAllIconHtml; ?>
                    <span><?php echo $expandAllText; ?></span>

                </div>
            <?php endif; ?>

        </div>


        <?php
        $count = 0;
        foreach ($items as $item) {

            $itemActive = isset($item["active"]) ? (bool) $item["active"] : false;

            $headerLabel = isset($item["headerLabel"]) ? $item["headerLabel"] : [];
            $headerLabelOptions = isset($headerLabel["options"]) ? $headerLabel["options"] : [];

            $headerLabelText = isset($item["headerLabelText"]) ? $item["headerLabelText"] : "";
            $headerLabelToggledText = isset($item["headerLabelToggledText"]) ? $item["headerLabelToggledText"] : "";
            $headerLabelSlug = isset($item["headerLabelSlug"]) ? $item["headerLabelSlug"] : "";


            $contentText = isset($item["contentText"]) ? $item["contentText"] : "";

            $content = isset($item["content"]) ? $item["content"] : [];
            $contentOptions = isset($content["options"]) ? $content["options"] : [];




            if ($contentAutoembed) {
                $WP_Embed = new WP_Embed();
                $contentText = $WP_Embed->autoembed($contentText);
            }

            if ($contentShortcodes) {
                //$contentText = apply_filters('the_content', $contentText);
                //$contentText = do_blocks($contentText);
            }

            if ($contentShortcodes) {
                $contentText = do_shortcode($contentText);
            }


            if ($contentWpautop) {
                //$contentText = wpautop($contentText);
            }

            $itemLabelIcon = isset($item["labelIcon"]) ? $item["labelIcon"] : [];
            $itemLabelIconOptions = isset($itemLabelIcon["options"]) ? $itemLabelIcon["options"] : [];
            $itemLabelIconSrc = isset($itemLabelIconOptions["iconSrc"]) ? $itemLabelIconOptions["iconSrc"] : "";



        ?>
            <<?php echo tag_escape($headerTag); ?> id="ui-id-<?php echo esc_attr((int)$count + 1); ?>" class="<?php echo esc_attr($blockId); ?>-accordion-header  <?php echo esc_attr($blockId); ?> <?php echo esc_attr($headerClass); ?>" role="tab" aria-controls="ui-id-<?php echo esc_attr((int)$count + 2); ?>" aria-selected="false" aria-expanded="false" tabindex="-1" toggledText="<?php echo esc_attr($headerLabelToggledText); ?>">
                <?php if ($iconPosition == 'left') : ?>
                    <span class="accordion-icon <?php echo esc_attr($iconClass); ?>">
                        <?php echo wp_kses_post($iconIdleHtml); ?><?php echo wp_kses_post($iconToggleHtml); ?>
                    </span>
                <?php endif; ?>
                <?php if ($labelCounterPosition == 'left') : ?>
                    <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                        <?php echo wp_kses_post($count); ?>
                    </span>
                <?php endif; ?>
                <?php if ($labelIconPosition == 'beforeLabel') : ?>


                    <?php if (empty($itemLabelIconSrc)): ?>
                        <?php echo wp_kses_post($labelIconHtml); ?>
                    <?php else: ?>
                        <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                    <?php endif; ?>


                <?php endif; ?>
                <<?php echo tag_escape($headerLabelTag); ?> index=""
                    <?php if ($headerLabelTag == 'a') :

                        if (empty($headerLabelSlug)) {
                            $link = strtolower($headerLabelText);
                            $link = str_replace(" ", "-", $link);
                        } else {
                            $link = $headerLabelSlug;
                        }





                    ?> href="#<?php echo esc_attr($link); ?>" <?php endif; ?> class="<?php echo esc_attr($blockId); ?>-accordion-header-label accordion-header-label" <?php if ($headerLabelTag == 'a') : ?> href="#<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?> <?php if ($headerLabelTag == 'a') : ?> id="<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?>>
                    <?php if ($labelCounterPosition == 'beforeLabelText') : ?>
                        <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                            <?php echo wp_kses_post($count); ?>
                        </span>
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
                    <?php if ($labelCounterPosition == 'afterLabelText') : ?>
                        <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                            <?php echo wp_kses_post($count);
                            ?>
                        </span>
                    <?php endif; ?>
                </<?php echo tag_escape($headerLabelTag); ?>>
                <?php if ($labelIconPosition == 'afterLabel') : ?>
                    <?php if (empty($itemLabelIconSrc)): ?>
                        <?php echo wp_kses_post($labelIconHtml); ?>
                    <?php else: ?>
                        <span class="accordion-label-icon <?php echo "$labelIconClass $itemLabelIconSrc"; ?>"></span>
                    <?php endif; ?>
                <?php endif; ?>
                <?php if ($iconPosition == 'right') : ?>
                    <span class="accordion-icon <?php echo esc_attr($iconClass); ?>">
                        <?php echo wp_kses_post($iconIdleHtml); ?>
                        <?php echo wp_kses_post($iconToggleHtml); ?>
                    </span>
                <?php endif; ?>
            </<?php echo tag_escape($headerTag); ?>>
            <<?php echo tag_escape($contentTag); ?> class="<?php echo esc_attr($contentClass); ?>" id="ui-id-<?php echo esc_attr((int)$count + 2); ?>" aria-labelledby="ui-id-<?php echo esc_attr((int)$count + 1); ?>" role="tabpanel" aria-hidden="false" <?php echo ($itemActive) ? 'style="height: auto; overflow: hidden; display: block;"' : ""; ?>>
                <?php //echo wp_kses_post($contentText); 
                ?>
                <?php echo wp_unslash(wp_specialchars_decode($contentText, ENT_QUOTES)) ?>
                <?php //echo ($contentText); 
                ?>
            </<?php echo tag_escape($contentTag); ?>>

        <?php
            $count++;
        }



        if ($schema) {

            $json = [];
            $i = 0;
            $json['@context'] = "https://schema.org";
            $json['@type'] = "FAQPage";
            foreach ($items as $item) {

                $hideOnSchema = isset($item["hideOnSchema"]) ? (bool) $item["hideOnSchema"] : false;

                if ($hideOnSchema) continue;

                $headerLabel = isset($item["headerLabel"]) ? $item["headerLabel"] : [];
                $headerLabelOptions = isset($headerLabel["options"]) ? $headerLabel["options"] : [];
                $headerLabelText = isset($headerLabelOptions["text"]) ? $headerLabelOptions["text"] : "";


                $content = isset($item["content"]) ? $item["content"] : [];
                $contentOptions = isset($content["options"]) ? $content["options"] : [];
                $contentText = isset($contentOptions["text"]) ? $contentOptions["text"] : "";

                $json['mainEntity'][$i]['@type'] = "Question";
                $json['mainEntity'][$i]['@id'] = isset($item['attrs']['blockId']) ? "#" . $item['attrs']['blockId'] : '';
                $json['mainEntity'][$i]['name'] = isset($item['attrs']['headerLabel']['options']['text']) ? _wp_specialchars($headerLabelText, ENT_QUOTES)  : '';
                $json['mainEntity'][$i]['acceptedAnswer']['@type'] = "Answer";
                $json['mainEntity'][$i]['acceptedAnswer']['text'] = _wp_specialchars($contentText, ENT_QUOTES);
                $i++;
            }
            $accordionsSchema[$blockId] = $json;
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
