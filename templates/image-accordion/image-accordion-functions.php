<?php
if (!defined('ABSPATH')) exit;  // if direct access

function accordions_post_query_items($args) {}
function accordions_terms_query_item($args) {}
function accordions_easy_accordion_query_item($args)
{
  $items = [];

  $postId = isset($args['postId']) ? (int) $args['postId']['value'] : '';

  $post_data = get_post($postId);
  $sp_eap_upload_options = get_post_meta($postId, "sp_eap_upload_options", true);

  $accordion_content_source = isset($sp_eap_upload_options["accordion_content_source"]) ? $sp_eap_upload_options["accordion_content_source"] : [];

  foreach ($accordion_content_source as $index => $source) {

    $accordion_content_title = isset($source["accordion_content_title"]) ? $source["accordion_content_title"] : "";
    $accordion_content_description = isset($source["accordion_content_description"]) ? $source["accordion_content_description"] : "";

    $headerLabelText = $accordion_content_title;
    $headerLabelToggledText = strtolower(str_replace(' ', '-', $accordion_content_title));;
    $headerLabelSlug = isset($item["headerLabelSlug"]) ? $item["headerLabelSlug"] : "";
    $contentText = $accordion_content_description;


    $items[$index] = [
      "active" => 0,
      "headerLabelText" => $headerLabelText,
      "headerLabelToggledText" => $headerLabelToggledText,
      "headerLabelSlug" => $headerLabelSlug,
      "contentText" => $contentText,
    ];
  }


  return $items;
}
