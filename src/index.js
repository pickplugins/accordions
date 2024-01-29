import apiFetch from "@wordpress/api-fetch";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { subscribe, select } from "@wordpress/data";

//const { Configuration, OpenAIApi } = require("openai");
// test
// const configuration = new Configuration({
//     apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

window.PostGridPluginData = {
  freeUrl: "https://wordpress.org/plugins/post-grid/",
  proUrl: "https://pickplugins.com/accordions/",
  websiteUrl: "https://pickplugins.com/",
  demoUrl: "http://getpostgrid.com/",
  wpReviewUrl:
    "https://wordpress.org/plugins/accordions/reviews/#new-post",
  reviewUrl: "http://getpostgrid.com/submit-review",

  renewLicense: "https://pickplugins.com/renew-license/?licenseKey=",
  hasSubscribed: false,

  utm: {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    utm_id: "",
  },
};

window.postGridBlockEditor = null;

apiFetch({
  path: "/post-grid/v2/get_plugin_data",
  method: "POST",
  data: {},
}).then((res) => {
  window.PostGridPluginData = res;
});

apiFetch({
  path: "/post-grid/v2/get_options",
  method: "POST",
  data: { option: "post_grid_block_editor" },
}).then((res) => {
  window.postGridBlockEditor = res;
});

wp.domReady(function () {
  postGridDisabledBlocks.forEach(function (blockName) {
    if (blockName && wp.blocks.getBlockType(blockName) !== undefined) {
      wp.blocks.unregisterBlockType(blockName);
    }
  });
});

//var generalSidebarName = wp.data.select('core/edit-post').getActiveGeneralSidebarName();
//const isSidebarOpened = wp.data.select('post-grid-sidebar').isPluginSidebarOpened();

// if (!isSidebarOpened) {
//     wp.data.dispatch('post-grid-sidebar').openGeneralSidebar();
// }

// subscribe(() => {
//     if (select('core/edit-post').isPluginSidebarOpened()) {
//         // Is open..
//         console.log(generalSidebarName);

//     } else {
//         // Is closed..
//         console.log(generalSidebarName);

//     }
// });

import "./store";
// import "./templates";
// import "./sidebars";



import "./blocks/accordion-nested";
import "./blocks/accordion-nested-item";

import "./blocks/tabs-nested";
import "./blocks/tabs-nested-item";




// const addBlockEditAttributes = createHigherOrderComponent((BlockEdit) => {
//     return (props) => {
//         const { attributes, setAttributes, clientId } = props;

//         const {
//             blockId,
//         } = attributes;

//         console.log(props);
//         //props.attributes.blockId = 'pg' + clientId.split('-').pop();

//         return <BlockEdit {...props} />;
//     };
// }, 'addBlockEditAttributes');

// addFilter(
//     'editor.BlockEdit',
//     'post-grid/text',
//     addBlockEditAttributes
// );
// addFilter(
//     'editor.BlockEdit',
//     'post-grid/layers',
//     addBlockEditAttributes
// );
