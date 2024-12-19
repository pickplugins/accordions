<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_action('accordions_builder_accordion', 'accordions_builder_accordion', 5, 2);

function accordions_builder_accordion($post_id, $accordionData)
{

    global $accordionsSchema;


    $globalOptions = isset($accordionData["globalOptions"]) ? $accordionData["globalOptions"] : [];
    $search = isset($globalOptions["search"]) ? $globalOptions["search"] : true;
    $lazyLoad = isset($globalOptions["lazyLoad"]) ? $globalOptions["lazyLoad"] : true;
    $stats = isset($globalOptions["stats"]) ? $globalOptions["stats"] : true;
    $schema = isset($globalOptions["schema"]) ? $globalOptions["schema"] : true;
    $autoembed = isset($globalOptions["autoembed"]) ? $globalOptions["autoembed"] : true;
    $shortcodes = isset($globalOptions["shortcodes"]) ? $globalOptions["shortcodes"] : true;
    $wpautop = isset($globalOptions["wpautop"]) ? $globalOptions["wpautop"] : true;
    $expandCollapseAll = isset($globalOptions["expandCollapseAll"]) ? $globalOptions["expandCollapseAll"] : "";
    $expandAllText = isset($globalOptions["expandAllText"]) ? $globalOptions["expandAllText"] : "";
    $collapseAllText = isset($globalOptions["collapseAllText"]) ? $globalOptions["collapseAllText"] : "";
    $activeEvent = isset($globalOptions["activeEvent"]) ? $globalOptions["activeEvent"] : "";
    $urlHash = isset($globalOptions["urlHash"]) ? $globalOptions["urlHash"] : "";
    $clickToScrollTop = isset($globalOptions["clickToScrollTop"]) ? $globalOptions["clickToScrollTop"] : "";
    $clickToScrollTopOffset = isset($globalOptions["clickToScrollTopOffset"]) ? $globalOptions["clickToScrollTopOffset"] : "";
    $animationName = isset($globalOptions["animationName"]) ? $globalOptions["animationName"] : "";
    $animationDelay = isset($globalOptions["animationDelay"]) ? $globalOptions["animationDelay"] : "";


    //var_dump($globalOptions);



    $items = isset($accordionData["items"]) ? $accordionData["items"] : [];



    $icon = isset($accordionData["icon"]) ? $accordionData["icon"] : [];
    $iconOptions = isset($icon["options"]) ? $icon["options"] : [];
    $iconText = isset($iconOptions["text"]) ? $iconOptions["text"] : "";


    $reponsiveCss = isset($accordionData["reponsiveCss"]) ? $accordionData["reponsiveCss"] : "";



    $wrapper = isset($accordionData["wrapper"]) ? $accordionData["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperTag = !empty($wrapperOptions["tag"]) ? $wrapperOptions["tag"] : "div";
    $wrapperClass = isset($wrapperOptions["class"]) ? $wrapperOptions["class"] : "";

    $content = isset($accordionData["content"]) ? $accordionData["content"] : [];
    $contentOptions = isset($content["options"]) ? $content["options"] : [];
    $contentTag = !empty($contentOptions["tag"]) ? $contentOptions["tag"] : "div";
    $contentClass = isset($contentOptions["class"]) ? $contentOptions["class"] : "";

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


    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : "fontAwesome";
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : "";
    $iconSrc = !empty($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : "";
    $iconHtml = !empty($iconSrc) ? '<span class="accordion-label-icon ' . $iconClass . ' ' . $iconSrc . '"></span>' : '';



    $iconToggle = isset($accordionData["iconToggle"]) ? $accordionData["iconToggle"] : [];
    $iconToggleOptions = isset($iconToggle["options"]) ? $iconToggle["options"] : [];
    $iconToggleTag = !empty($iconToggleOptions["tag"]) ? $iconToggleOptions["tag"] : "span";
    $iconToggleClass = isset($iconToggleOptions["class"]) ? $iconToggleOptions["class"] : "";

    $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : "fontAwesome";
    $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : "";
    $iconToggleSrc = !empty($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : "";
    $iconToggleHtml = !empty($iconSrc) ? '<span class="accordion-label-icon ' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>' : '';


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

    $accordionDataAttr = [
        "id" => $blockId,
        "activeIndex" => 999,
    ];


?>
    <div id="<?php echo esc_attr($blockId); ?>" class="pg-accordion-nested  " data-pgaccordion="<?php echo esc_attr(json_encode($accordionDataAttr)) ?>" role="tablist">

        <div>

            <?php if ($search): ?>

                <input type="text" placeholder="" placeholder="<?php esc_attr($expandAllText); ?>" />

            <?php endif; ?>
            <?php if ($expandCollapseAll): ?>
                <div class="expandCollapseAll" expandAllText="<?php esc_attr($expandAllText); ?>" collapseAllText="<?php esc_attr($collapseAllText); ?>">
                    <?php echo $expandAllText; ?>
                </div>
            <?php endif; ?>

        </div>

        <div>

        </div>






        <?php
        $count = 0;
        foreach ($items as $item) {

            $headerLabel = isset($item["headerLabel"]) ? $item["headerLabel"] : [];
            $headerLabelOptions = isset($headerLabel["options"]) ? $headerLabel["options"] : [];
            $headerLabelText = isset($headerLabelOptions["text"]) ? $headerLabelOptions["text"] : "";
            $headerLabelToggledText = isset($headerLabelOptions["toggledText"]) ? $headerLabelOptions["toggledText"] : "";
            $headerLabelSlug = isset($headerLabelOptions["slug"]) ? $headerLabelOptions["slug"] : "";


            $content = isset($item["content"]) ? $item["content"] : [];
            $contentOptions = isset($content["options"]) ? $content["options"] : [];
            $contentText = isset($contentOptions["text"]) ? $contentOptions["text"] : "";


            if ($autoembed) {
                $WP_Embed = new WP_Embed();
                $contentText = $WP_Embed->autoembed($contentText);
            }

            if ($wpautop) {
                $contentText = wpautop($contentText);
            }

            if ($shortcodes) {
                $contentText = do_shortcode($contentText);
            }



        ?>
            <<?php echo tag_escape($headerTag); ?> id="ui-id-<?php echo esc_attr((int)$count + 1); ?>" class="<?php echo esc_attr($blockId); ?>-accordion-header <?php echo esc_attr($blockId); ?> <?php echo esc_attr($headerClass); ?>" role="tab" aria-controls="ui-id-<?php echo esc_attr((int)$count + 2); ?>" aria-selected="false" aria-expanded="false" tabindex="-1" toggledText="<?php echo esc_attr($headerLabelToggledText); ?>">
                <?php if ($iconPosition == 'left') : ?>
                    <span class="accordion-icon <?php echo esc_attr($iconClass); ?>">
                        <?php echo wp_kses_post($iconHtml); ?><?php echo wp_kses_post($iconToggleHtml); ?>
                    </span>
                <?php endif; ?>
                <?php if ($labelCounterPosition == 'left') : ?>
                    <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                        <?php echo wp_kses_post($count); ?>
                    </span>
                <?php endif; ?>
                <?php if ($labelIconPosition == 'beforeLabel') : ?>
                    <?php echo wp_kses_post($labelIconHtml); ?>
                <?php endif; ?>
                <<?php echo tag_escape($headerLabelTag); ?> index=""
                    <?php if ($headerLabelTag == 'a') :
                        $link = strtolower($headerLabelText);
                        $link = str_replace(" ", "-", $link);
                    ?> href="#<?php echo esc_attr($link); ?>" <?php endif; ?> class="<?php echo esc_attr($blockId); ?>-accordion-header-label accordion-header-label" <?php if ($headerLabelTag == 'a') : ?> href="#<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?> <?php if ($headerLabelTag == 'a') : ?> id="<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?>>
                    <?php if ($labelCounterPosition == 'beforeLabelText') : ?>
                        <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                            <?php echo wp_kses_post($count); ?>
                        </span>
                    <?php endif; ?>
                    <?php if ($labelIconPosition == 'beforeLabelText') : ?>
                        <?php echo wp_kses_post($labelIconHtml); ?>
                    <?php endif; ?>
                    <?php echo wp_kses_post($headerLabelText); ?>
                    <?php if ($labelIconPosition == 'afterLabelText') : ?>
                        <?php echo wp_kses_post($labelIconHtml); ?>
                    <?php endif; ?>
                    <?php if ($labelCounterPosition == 'afterLabelText') : ?>
                        <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
                            <?php echo wp_kses_post($count);
                            ?>
                        </span>
                    <?php endif; ?>
                </<?php echo tag_escape($headerLabelTag); ?>>
                <?php if ($labelIconPosition == 'afterLabel') : ?>
                    <?php echo wp_kses_post($labelIconHtml); ?>
                <?php endif; ?>
                <?php if ($iconPosition == 'right') : ?>
                    <span class="accordion-icon <?php echo esc_attr($iconClass); ?>">
                        <?php echo wp_kses_post($iconHtml); ?>
                        <?php echo wp_kses_post($iconToggleHtml); ?>
                    </span>
                <?php endif; ?>
            </<?php echo tag_escape($headerTag); ?>>
            <<?php echo tag_escape($contentTag); ?> class="<?php echo esc_attr($contentClass); ?>" id="ui-id-<?php echo esc_attr((int)$count + 2); ?>" aria-labelledby="ui-id-<?php echo esc_attr((int)$count + 1); ?>" role="tabpanel" aria-hidden="false">
                <?php echo wp_kses_post($contentText); ?>
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
