<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access

if( ! class_exists( 'settings_tabs_field' ) ) {
class settings_tabs_field{


    function generate_field($option){

        $id 		= isset( $option['id'] ) ? $option['id'] : "";
        $type 		= isset( $option['type'] ) ? $option['type'] : "";
        $details 	= isset( $option['details'] ) ? $option['details'] : "";






        if( empty( $id ) ) return;

        if( isset($option['type']) && $option['type'] === 'select' ) 		    $this->field_select( $option );
        elseif( isset($option['type']) && $option['type'] === 'select2')	    $this->field_select2( $option );
        elseif( isset($option['type']) && $option['type'] === 'checkbox')	    $this->field_checkbox( $option );
        elseif( isset($option['type']) && $option['type'] === 'radio')		    $this->field_radio( $option );
        elseif( isset($option['type']) && $option['type'] === 'radio_image')	$this->field_radio_image( $option );
        elseif( isset($option['type']) && $option['type'] === 'textarea')	    $this->field_textarea( $option );
        elseif( isset($option['type']) && $option['type'] === 'scripts_js')	    $this->field_scripts_js( $option );
        elseif( isset($option['type']) && $option['type'] === 'scripts_css')	$this->field_scripts_css( $option );
        elseif( isset($option['type']) && $option['type'] === 'number' ) 	    $this->field_number( $option );
        elseif( isset($option['type']) && $option['type'] === 'text' ) 		    $this->field_text( $option );
        elseif( isset($option['type']) && $option['type'] === 'text_icon' )     $this->field_text_icon( $option );
        elseif( isset($option['type']) && $option['type'] === 'text_multi' ) 	$this->field_text_multi( $option );
        elseif( isset($option['type']) && $option['type'] === 'range' ) 		$this->field_range( $option );
        elseif( isset($option['type']) && $option['type'] === 'colorpicker')    $this->field_colorpicker( $option );
        elseif( isset($option['type']) && $option['type'] === 'datepicker')	    $this->field_datepicker( $option );
        elseif( isset($option['type']) && $option['type'] === 'repeater')	    $this->field_repeater( $option );
        elseif( isset($option['type']) && $option['type'] === 'faq')	        $this->field_faq( $option );
        elseif( isset($option['type']) && $option['type'] === 'addons_grid')	$this->field_addons_grid( $option );
        elseif( isset($option['type']) && $option['type'] === 'custom_html')	$this->field_custom_html( $option );




        elseif( isset($option['type']) && $option['type'] === $type ) 	do_action( "settings_tabs_field_$type", $option );


        //if( !empty( $details ) ) echo "<p class='description'>$details</p>";





    }


    public function field_select( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $args 	= isset( $option['args'] ) ? $option['args'] : array();
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $multiple 	= isset( $option['multiple'] ) ? $option['multiple'] : false;





        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        if($multiple){
            $value 	= isset( $option['value'] ) ? $option['value'] : array();
            $field_name = !empty($parent) ? $parent.'['.$id.'][]' : $id.'[]';
            $default 	= isset( $option['default'] ) ? $option['default'] : array();
        }else{
            $value 	= isset( $option['value'] ) ? $option['value'] : '';
            $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;
            $default 	= isset( $option['default'] ) ? $option['default'] : '';
        }


        $value = !empty($value) ? $value : $default;



        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <select <?php if($multiple) echo 'multiple'; ?> name='<?php echo $field_name; ?>' id='<?php echo $id; ?>'>
                    <?php
                    foreach( $args as $key => $name ):
                        if($multiple){
                            $selected = in_array($key, $value) ? "selected" : "";
                        }else{
                            $selected = $value == $key ? "selected" : "";
                        }


                    ?>
                        <option <?php echo $selected; ?> value='<?php echo $key; ?>'><?php echo $name; ?></option>
                    <?php
                    endforeach;
                    ?>
                </select>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }

    public function field_select2( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $args 	= isset( $option['args'] ) ? $option['args'] : array();
        $multiple 	= isset( $option['multiple'] ) ? $option['multiple'] : "";

        if($multiple){
            $value 	= isset( $option['value'] ) ? $option['value'] : array();
            $field_name = !empty($parent) ? $parent.'['.$id.'][]' : $id.'[]';
            $default 	= isset( $option['default'] ) ? $option['default'] : array();
        }else{
            $value 	= isset( $option['value'] ) ? $option['value'] : '';
            $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;
            $default 	= isset( $option['default'] ) ? $option['default'] : '';
        }

        $value = !empty($value) ? $value : $default;

        //$value	= get_post_meta( $post_id, $id, true );
        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";
        ?>

<!--        <pre>-->
<!--        --><?php
//        //echo var_export($value, true);
//        ?>
<!--        </pre>-->
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <select class="select2" <?php if($multiple) echo 'multiple'; ?>  name='<?php echo $field_name; ?>' id='<?php echo $id; ?>'>
                    <?php
                    foreach( $args as $key => $name ):
                        $selected = in_array($key, $value) ? "selected" : "";
                        ?>
                        <option <?php echo $selected; ?> value='<?php echo $key; ?>'><?php echo $name; ?></option>
                    <?php
                    endforeach;
                    ?>
                </select>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }










    public function field_text( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';

        $value = !empty($value) ? $value : $default;

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;
        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <input type='text' class='' name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value='<?php echo $value; ?>' />

                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }




    public function field_text_icon( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";


        $option_value = empty($value) ? $default : $value;

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <div class="text-icon">
                    <span class="icon"><i class="<?php echo $option_value; ?>"></i></span><input type='text' class='' name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value='<?php echo $option_value; ?>' />
                </div>


                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <script>

            jQuery(document).ready(function($){
                $(document).on('keyup', '.text-icon input', function () {

                    val = $(this).val();

                    if(val){
                        $(this).parent().children('.icon').html('<i class="'+val+'"></i>');
                    }



                })

            })

        </script>


        <style type="text/css">
            .text-icon{}
            .text-icon .icon{
                /* width: 30px; */
                background: #ddd;
                /* height: 28px; */
                display: inline-block;
                vertical-align: top;
                text-align: center;
                font-size: 14px;
                padding: 5px 10px;
                line-height: normal;
            }


        </style>

        <?php
    }



    public function field_range( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";

        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $value = !empty($value) ? $value : $default;

        $args 	= isset( $option['args'] ) ? $option['args'] : "";

        $min = isset($args['min']) ? $args['min'] : '';
        $max = isset($args['max']) ? $args['max'] : '';
        $step = isset($args['step']) ? $args['step'] : '';

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;


        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <div class="range-input">
                    <span class="range-value"><?php echo $value; ?></span><input type="range" min="<?php if($min) echo $min; ?>" max="<?php if($max) echo $max; ?>" step="<?php if($step) echo $step; ?>" class='' name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' value='<?php echo $value; ?>' />

                </div>


                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <style type="text/css">
            .range-input{}
            .range-input .range-value{
                display: inline-block;
                vertical-align: top;
                margin: 0 0;
                padding: 4px 10px;
                background: #eee;
            }
        </style>

        <script>

            jQuery(document).ready(function($){


                $(document).on('change', '#<?php echo $id; ?>', function () {

                    val = $(this).val();

                    if(val){
                        $(this).parent().children('.range-value').html(val);
                    }



                })

            })

        </script>






        <?php
    }



    public function field_textarea( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $value = !empty($value) ? $value : $default;

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;
        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php echo $value; ?></textarea>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }



    public function field_scripts_js( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $value = !empty($value) ? $value : $default;


        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;


        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php echo $value; ?></textarea>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>



        <script>


            var editor = CodeMirror.fromTextArea(document.getElementById("<?php echo $id; ?>"), {
                lineNumbers: true,
                //value: "function myScript(){return 100;}\n",

               // mode:  "javascript",
                //scrollbarStyle: "simple"
            });

            // var editor = CodeMirror.fromTextArea(document.getElementById("custom_css"), {
            //     lineNumbers: true,
            //     scrollbarStyle: "simple"
            // });

        </script>

        <?php
    }


    public function field_scripts_css( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $value = !empty($value) ? $value : $default;

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 		= isset( $option['details'] ) ? $option['details'] : "";



        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;
        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php echo $value; ?></textarea>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>



        <script>

             var editor = CodeMirror.fromTextArea(document.getElementById("<?php echo $id; ?>"), {
                 lineNumbers: true,
                 value: "",
                 //scrollbarStyle: "simple"
             });

        </script>

        <?php
    }







    public function field_radio( $option ){

        $id				= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 		= isset( $option['details'] ) ? $option['details'] : "";
        $for 		= isset( $option['for'] ) ? $option['for'] : "";
        $args			= isset( $option['args'] ) ? $option['args'] : array();

        $option_value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $option_value = !empty($option_value) ? $option_value : $default;

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;




        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
            <?php



            if(!empty($args))
            foreach( $args as $key => $value ):

                $checked = ( $key == $option_value ) ? "checked" : "";

                $for = !empty($for) ? $for.'-'.$id."-".$key : $id."-".$key;


               ?>
                <label for='<?php echo $for;?>'><input name='<?php echo $field_name; ?>' type='radio' id='<?php echo $for; ?>' value='<?php echo $key;?>'  <?php echo $checked;?>><span><?php echo $value;?></span></label>
                <?php


            endforeach;

            ?>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>
        <?php


    }



    public function field_radio_image( $option ){

        $id				= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $args			= isset( $option['args'] ) ? $option['args'] : array();
        //$args			= is_array( $args ) ? $args : $this->generate_args_from_string( $args );
        $option_value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;

        //var_dump($option_value);

        $option_value = empty($option_value) ? $default : $option_value;


        ?>

        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

               <div class="radio-img">
                   <?php
                   foreach( $args as $key => $value ):

                       $name = $value['name'];
                       $thumb = $value['thumb'];


                       $checked = ($key == $option_value) ? "checked" : "";

                       //var_dump($checked);

                       ?>
                       <label title="<?php echo $name; ?>" class="<?php if($checked =='checked') echo 'active';?>">
                           <input name='<?php echo $field_name; ?>' type='radio' id='<?php echo $id; ?>-<?php echo $key; ?>' value='<?php echo $key; ?>'  <?php echo $checked; ?>>
                           <?php // echo $name; ?>
                           <img src="<?php echo $thumb; ?>">
                       </label>
                   <?php

                   endforeach;
                   ?>
               </div>


                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <style type="text/css">
            .radio-img{}
            .radio-img label{
                display: inline-block;
                vertical-align: top;
                margin: 0 0;
                padding: 2px;
                background: #eee;
            }

            .radio-img label.active{
                background: #fd730d;
            }

            .radio-img input[type=radio]{
                display: none;
            }
            .radio-img img{
                width: 150px;
                vertical-align: top;
            }

        </style>

        <script>
            jQuery(document).ready(function($){


                $(document).on('click', '.radio-img label', function () {

                    $(this).parent().children('label').removeClass('active');

                    $(this).addClass('active');

                })

            })
        </script>
        <?php




    }





    public function field_colorpicker( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";

        $value 	= isset( $option['value'] ) ? $option['value'] : '';
        $default 	= isset( $option['default'] ) ? $option['default'] : '';
        $value = !empty($value) ? $value : $default;

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        $field_name = !empty($parent) ? $parent.'['.$id.']' : $id;

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <input name='<?php echo $field_name; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value="<?php echo $value; ?>" />
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>
        <?php


       // echo "<input type='text' class='' name='$id' id='$id' placeholder='$placeholder' value='$value' />";

        echo "<script>jQuery(document).ready(function($) { $('#$id').wpColorPicker();});</script>";
    }



    public function field_custom_html( $option ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $parent 			= isset( $option['parent'] ) ? $option['parent'] : "";
        $html 	= isset( $option['html'] ) ? $option['html'] : "";


        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <?php echo $html; ?>

                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }



}}