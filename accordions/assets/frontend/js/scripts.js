jQuery(document).ready(function($) {

	$(".expand-collapse").click(function() {
		
		if( $(this).hasClass("active") ) $(this).removeClass("active");
		else $(this).addClass("active");

		accordion_id = $(this).attr("accordion-id");
        $("#accordions-"+accordion_id+" .ui-accordion-header:not(.ui-state-active)").next().slideToggle();
		console.log(accordion_id);
	});

	$(".accordions-head").click(function () {


		toogle_text = $(this).attr('toogle-text');
		main_text = $(this).attr('main-text');	



		if(accordions_header_toggle=='yes'){

            if( $(this).hasClass('ui-state-active') ){

                if( main_text != null  && main_text != ''){

                    $(this).children('.accordions-head-title').html(main_text);
                }
            } else {

                if( toogle_text != null && toogle_text != ''){

                    $(this).children('.accordions-head-title').html(toogle_text);
                }
            }

            id = $(this).attr( 'id' );
        }


        if(accordions_click_track=='yes'){

            header_id = $(this).attr('header_id');
            post_id = $(this).attr('post_id');

            console.log(post_id);


            $.ajax(
                {
                    type: 'POST',
                    context: this,
                    url:accordions_ajax.accordions_ajaxurl,
                    data: {
                        "action" 	: "accordions_ajax_track_header",
                        "header_id" : header_id,
                        "post_id" : post_id,

                    },
                    success: function( data ) {


                        //console.log(data);


                    } });

        }


	});











});	




