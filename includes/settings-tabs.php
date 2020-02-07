<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access


class settings_tabs_field{


    function generate_field($option, $post_id){

        $id 		= isset( $option['id'] ) ? $option['id'] : "";
        $type 		= isset( $option['type'] ) ? $option['type'] : "";
        $details 	= isset( $option['details'] ) ? $option['details'] : "";


        if( empty( $id ) ) return;

        if( isset($option['type']) && $option['type'] === 'select' ) 		    $this->field_select( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'select_multi')	$this->field_select_multi( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'select2')	    $this->field_select2( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'checkbox')	    $this->field_checkbox( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'radio')		    $this->field_radio( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'radio_image')	$this->field_radio_image( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'textarea')	    $this->field_textarea( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'scripts_js')	    $this->field_scripts_js( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'scripts_css')	$this->field_scripts_css( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'number' ) 	    $this->field_number( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'text' ) 		    $this->field_text( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'text_icon' )     $this->field_text_icon( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'text_multi' ) 	$this->field_text_multi( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'range' ) 		$this->field_range( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'colorpicker')    $this->field_colorpicker( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'datepicker')	    $this->field_datepicker( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'repeater')	    $this->field_repeater( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'faq')	        $this->field_faq( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'addons_grid')	$this->field_addons_grid( $option, $post_id );
        elseif( isset($option['type']) && $option['type'] === 'custom_html')	$this->field_custom_html( $option, $post_id );




        elseif( isset($option['type']) && $option['type'] === $type ) 	do_action( "settings_tabs_field_$type", $option, $post_id );


        //if( !empty( $details ) ) echo "<p class='description'>$details</p>";





    }


    public function field_select( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $args 	= isset( $option['args'] ) ? $option['args'] : array();
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value	= get_post_meta( $post_id, $id, true );

        //var_dump($value);

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <select name='<?php echo $id; ?>' id='<?php echo $id; ?>'>
                    <?php
                    foreach( $args as $key => $name ):
                        $selected = $value == $key ? "selected" : "";
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


    public function field_text( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <input type='text' class='regular-text' name='<?php echo $id; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value='<?php echo $value; ?>' />

                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }




    public function field_text_icon( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $default_value	= isset( $option['default_value'] ) ? $option['default_value'] : "";

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";


        $option_value = empty($value) ? $default_value : $value;


        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <div class="text-icon">
                    <span class="icon"><i class="<?php echo $option_value; ?>"></i></span><input type='text' class='regular-text' name='<?php echo $id; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value='<?php echo $option_value; ?>' />
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



    public function field_range( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );
        $args 	= isset( $option['args'] ) ? $option['args'] : "";

        $min = isset($args['min']) ? $args['min'] : '';
        $max = isset($args['max']) ? $args['max'] : '';
        $step = isset($args['step']) ? $args['step'] : '';

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";



        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">

                <div class="range-input">
                    <span class="range-value"><?php echo $value; ?></span><input type="range" min="<?php if($min) echo $min; ?>" max="<?php if($max) echo $max; ?>" step="<?php if($step) echo $step; ?>" class='regular-text' name='<?php echo $id; ?>' id='<?php echo $id; ?>' value='<?php echo $value; ?>' />

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



    public function field_textarea( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";

        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $id; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php echo $value; ?></textarea>
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>

        <?php
    }



    public function field_scripts_js( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $default_value	= isset( $option['default_value'] ) ? $option['default_value'] : "";


        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";



        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $id; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php if(!empty($value)){ echo $value; } else {echo $default_value;} ?></textarea>
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


    public function field_scripts_css( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 		= isset( $option['details'] ) ? $option['details'] : "";

        $default_value	= isset( $option['default_value'] ) ? $option['default_value'] : "";


        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <textarea name='<?php echo $id; ?>' id='<?php echo $id; ?>' cols='40' rows='5' placeholder='<?php echo $placeholder; ?>'><?php echo $value; ?></textarea>
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







    public function field_radio( $option, $post_id ){

        $id				= isset( $option['id'] ) ? $option['id'] : "";
        $args			= isset( $option['args'] ) ? $option['args'] : array();
        $args			= is_array( $args ) ? $args : $this->generate_args_from_string( $args );
        $option_value	= get_post_meta( $post_id, $id, true );




        foreach( $args as $key => $value ):

            $checked = is_array( $option_value ) && in_array( $key, $option_value ) ? "checked" : "";
           ?>
            <label for='<?php echo $id."-".$key;?>'><input name='<?php echo $id; ?>' type='radio' id='<?php echo $id."-".$key;?>' value='<?php echo $key;?>'  <?php echo $checked;?>><?php echo $value;?></label><br>
            <?php

        endforeach;

    }



    public function field_radio_image( $option, $post_id ){

        $id				= isset( $option['id'] ) ? $option['id'] : "";
        $args			= isset( $option['args'] ) ? $option['args'] : array();
        $args			= is_array( $args ) ? $args : $this->generate_args_from_string( $args );
        $option_value	= get_post_meta( $post_id, $id, true );

        $default_value	= isset( $option['default_value'] ) ? $option['default_value'] : "";

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";


        //var_dump($option_value);

        $option_value = empty($option_value) ? $default_value : $option_value;

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
                           <input name='<?php echo $id; ?>' type='radio' id='<?php echo $id; ?>-<?php echo $key; ?>' value='<?php echo $key; ?>'  <?php echo $checked; ?>>
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





    public function field_colorpicker( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
        $placeholder 	= isset( $option['placeholder'] ) ? $option['placeholder'] : "";
        $value 	 		= get_post_meta( $post_id, $id, true );

        $title			= isset( $option['title'] ) ? $option['title'] : "";
        $details 			= isset( $option['details'] ) ? $option['details'] : "";


        ?>
        <div class="setting-field">
            <div class="field-lable"><?php if(!empty($title)) echo $title;  ?></div>
            <div class="field-input">
                <input name='<?php echo $id; ?>' id='<?php echo $id; ?>' placeholder='<?php echo $placeholder; ?>' value="<?php echo $value; ?>" />
                <p class="description"><?php if(!empty($details)) echo $details;  ?></p>
            </div>
        </div>
        <?php


       // echo "<input type='text' class='regular-text' name='$id' id='$id' placeholder='$placeholder' value='$value' />";

        echo "<script>jQuery(document).ready(function($) { $('#$id').wpColorPicker();});</script>";
    }



    public function field_custom_html( $option, $post_id ){

        $id 			= isset( $option['id'] ) ? $option['id'] : "";
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



}