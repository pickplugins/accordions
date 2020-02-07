<?php
/*
Plugin Name: License Manager - Clients
Plugin URI: http://pickplugins.com
Description: Awesome Question and Answer.
Version: 2.0.1
Text Domain: question-answer
Author: pickplugins
Author URI: http://pickplugins.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 


if( ! class_exists( 'class_accordions_support' ) ) {
    class class_accordions_support
    {

        public function __construct()
        {


            //add_action( 'init', array( $this, 'check_plugin_update' ), 12 );

        }

        public function our_plugins()
        {

            $our_plugins = array(
                array(
                    'title' => 'Post Grid',
                    'link' => 'http://www.pickplugins.com/item/post-grid-create-awesome-grid-from-any-post-type-for-wordpress/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2015/12/3814-post-grid-thumb-500x262.jpg',
                ),

                array(
                    'title' => 'Woocommerce Products Slider',
                    'link' => 'http://www.pickplugins.com/item/woocommerce-products-slider-for-wordpress/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2016/03/4357-woocommerce-products-slider-thumb-500x250.jpg',
                ),

                array(
                    'title' => 'Team Showcase',
                    'link' => 'http://www.pickplugins.com/item/team-responsive-meet-the-team-grid-for-wordpress/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2016/06/5145-team-thumb-500x250.jpg',
                ),

                array(
                    'title' => 'Job Board Manager',
                    'link' => 'https://wordpress.org/plugins/job-board-manager/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2015/08/3466-job-board-manager-thumb-500x250.png',
                ),

                array(
                    'title' => 'Wishlist for WooCommerce',
                    'link' => 'https://www.pickplugins.com/item/woocommerce-wishlist/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2017/10/12047-woocommerce-wishlist.png',
                ),

                array(
                    'title' => 'Breadcrumb',
                    'link' => 'https://www.pickplugins.com/item/breadcrumb-awesome-breadcrumbs-style-navigation-for-wordpress/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2016/03/4242-breadcrumb-500x252.png',
                ),

                array(
                    'title' => 'Pricing Table',
                    'link' => 'https://www.pickplugins.com/item/pricing-table/',
                    'thumb' => 'https://www.pickplugins.com/wp-content/uploads/2016/10/7042-pricing-table-thumbnail-500x250.png',
                ),

            );

            return apply_filters('accordions_our_plugins', $our_plugins);


        }


        public function video_tutorials()
        {

            $tutorials = array(
                array(
                    'title' => __('Customize content', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=cRjaVwlih6Q&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),
                array(
                    'title' => __('Enable search', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=oLJw6kBHau0&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Click header to scroll top', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=CIcRBoQ5CO4&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),
                array(
                    'title' => __('Enable lazy load', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=aKVK5gW1BKA&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),


                array(
                    'title' => __('Hide edit link', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=OvVolGXpnn0&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Create nested or multi-level accordion', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=Z_iKPNDMEBs&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Customize header', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=skU3J0JpcBU&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Customize icons', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=-ATeH0j6-t4&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Open/active via url', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=PaxUawdnmfA&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),
                array(
                    'title' => __('Open/active on page load', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=Dqd2zSpCQlo&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('How to create accordion', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=9PS63kqe20M&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),
                array(
                    'title' => __('How to install accordions', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=ecYxS3Udjz4&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('WooCommerce product faq tab', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=1yeIpc52p2Y&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),
                array(
                    'title' => __('Expand/collapse all button', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=Ah10F3co83o&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),

                array(
                    'title' => __('Accordions click track', 'woocommerce-products-slider'),
                    'video_url' => 'https://www.youtube.com/watch?v=qbCsynoaT_Q&list=PL2GPPfgLrfWzOWsRCgV5Qytg6aImGPbCE',
                ),


            );

            return apply_filters('accordions_video_tutorials', $tutorials);


        }


        public function faq(){

            $faq = array(


                array(
                    'title'=>'Create accordion',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-create-accordion/?ref=dashboard',
                ),
                array(
                    'title'=>'Upgrade to premium?',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/upgrade-to-premium/?ref=dashboard',
                ),


                array(
                    'title'=>'Create nested accordion',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-create-nested-accordion/?ref=dashboard',

                ),
                array(
                    'title'=>'Accordion open/closed on load',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/accordion-openclosed-on-load/?ref=dashboard',

                ),

                array(
                    'title'=>'Filter accordion header',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_title/?ref=dashboard',
                ),

                array(
                    'title'=>'Filter accordion content',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/filter-hooks/filter-hook-accordions_filter_content/?ref=dashboard',
                ),
                array(
                    'title'=>'Open/activate via URL parameter',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/how-to-openactivate-via-url-parameter/?ref=dashboard',
                ),

                array(
                    'title'=>'Custom header background image',
                    'url'=>'https://www.pickplugins.com/documentation/accordions/faq/custom-header-background-image/?ref=dashboard',
                ),






                );


            return apply_filters('accordions_faq', $faq);


        }


    }
}
