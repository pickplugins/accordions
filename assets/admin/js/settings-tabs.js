jQuery(document).ready(function($){



	$(document).on('click','.settings-tabs .tab-nav',function(){

		$(this).parent().parent().children('.tab-navs').children('.tab-nav').removeClass('active');

        $(this).addClass('active');

        id = $(this).attr('data-id');

		//console.log('Hello click');
        console.log(id);

        $(this).parent().parent().children('.tab-content').removeClass('active');

        $(this).parent().parent().children('.tab-content#'+id).addClass('active');


	})

	
 		

});