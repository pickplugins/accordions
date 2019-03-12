<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access


class class_accordions_functions  {
	
	
    public function __construct(){

   		}
	

		
	public function accordions_themes($themes = array()){

		$themes = array(
			'flat'=>array(
				'name'=>__('Flat', 'accordions'),
				'thumb'=> accordions_plugin_url.'assets/admin/images/flat.png',
				'css_url'=>'',
			),
			'rounded'=>array(
				'name'=>__('Rounded', 'accordions'),
				'thumb'=>accordions_plugin_url.'assets/admin/images/rounded.png',
				'css_url'=>'',
			),
			'semi-rounded'=>array(
				'name'=>__('Semi Rounded', 'accordions'),
				'thumb'=>accordions_plugin_url.'assets/admin/images/semi-rounded.png',
				'css_url'=>'',
			),
			'rounded-top'=>array(
				'name'=>__('Rounded Top', 'accordions'),
				'thumb'=>accordions_plugin_url.'assets/admin/images/rounded-top.png',
				'css_url'=>'',
			),
			'shadow'=>array(
				'name'=>__('Shadow', 'accordions'),
				'thumb'=>accordions_plugin_url.'assets/admin/images/shadow.png',
				'css_url'=>'',
			),
		);
			
			foreach(apply_filters( 'accordions_themes', $themes ) as $theme_key=> $theme_name){

					$theme_list[$theme_key] = $theme_name;
				}

			
			return $theme_list;

		}
	


	}