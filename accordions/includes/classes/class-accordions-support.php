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

            return apply_filters('wcps_our_plugins', $our_plugins);


        }


        public function video_tutorials()
        {

            $tutorials = array(
//                array(
//                    'title' => __('How to install', 'woocommerce-products-slider'),
//                    'video_url' => 'https://www.youtube.com/watch?v=q0-OseJrD5I&list=PL2GPPfgLrfWxKBdh3-HNMNm3CmtmCPLQe',
//                ),



            );

            return apply_filters('wcps_video_tutorials', $tutorials);


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


            return apply_filters('wcps_faq', $faq);


        }


    }
}
