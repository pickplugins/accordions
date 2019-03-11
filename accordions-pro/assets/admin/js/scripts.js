jQuery(document).ready(function($)
	{



        $(document).on('click','.accordions-import-json',function(){

            json_file = $('.json_file').val();

            if(json_file){
                $.ajax(
                    {
                        type: 'POST',
                        context: this,
                        url:accordions_ajax.accordions_ajaxurl,
                        data: {
                            "action" 	: "accordions_ajax_import_json",
                            "json_file" : json_file,

                        },
                        success: function( response ) {

                            var data = JSON.parse( response );
                            json_file = data['json_file'];
                            //console.log(data);

                            $(this).html('Import done');
                            $('.json_file').val('');

                        } });

			}
			else{
            	alert('Please put file url');
			}





        })


		$(document).on('change', '#accordions_metabox #accordions_header_bg_opacity_hndl', function()
			{

				var val = $(this).val();
				
				$('#accordions_header_bg_opacity').val(val);
				
				
				
			})



		$(document).on('change', '#accordions_metabox #accordions_items_content_bg_opacity_hndl', function()
			{

				var val = $(this).val();
				
				$('#accordions_items_content_bg_opacity').val(val);
				
				
				
			})

        $(document).on('click', '#accordions_metabox .expand-collapse', function() {


        	if($(this).attr('expand')){
                $(this).removeAttr('expand');
                $(this).text('Expand all');

                $('#accordions-content .item').removeClass('active');
                $(this).attr('collapse','yes');


			}else{
                $(this).removeAttr('collapse');
                $(this).text('Collapse all');

        		$(this).attr('expand','yes');
                $('#accordions-content .item').addClass('active');
			}



        })


		$(document).on('click', '#accordions_metabox .reset-active', function()
			{

				$('input[name="accordions_active_accordion"]').prop('checked', false);
				
			})

		$(document).on('click', '#accordions_metabox .hide-unhide span', function(){

			if($(this).parent().hasClass('active')){
				$(this).parent().removeClass('active');
			}else{
				$(this).parent().addClass('active');
			}



		})




		$(document).on('keyup', '#accordions_metabox .section-panel .accordions_content_title', function()
			{
				var text = $(this).val();
				
				if(text == '')
					{
						$(this).parent().parent().children('.section-header').children('.accordions-title-preview').html('start typing');
					}
				else
					{
						$(this).parent().parent().children('.section-header').children('.accordions-title-preview').html(text);
					}
				
				
			
			})






		// $(document).on('click', '#accordions_metabox .section-header .expand-compress', function()
		// 	{
		// 		if($(this).parent().parent().hasClass('active'))
		// 			{
		// 			$(this).parent().parent().removeClass('active');
		// 			}
		// 		else
		// 			{
		// 				$(this).parent().parent().addClass('active');
		// 			}
		//
		//
		// 	})



        $(document).on('keyup', '.accordions_icons_custom_plus_input', function()
        {

            icon_id = $(this).val();

            $('.accordions_icons_custom_plus i').removeAttr('class');
            $('.accordions_icons_custom_plus i').addClass('fa '+icon_id);
            console.log(icon_id);


        })





        $(document).on('keyup', '.accordions_icons_custom_minus_input', function()
        {

            icon_id = $(this).val();

            $('.accordions_icons_custom_minus i').removeAttr('class');
            $('.accordions_icons_custom_minus i').addClass('fa '+icon_id);
            console.log(icon_id);


        })


	
 		

	});