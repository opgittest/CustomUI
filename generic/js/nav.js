// JavaScript Document
function changePage(id){
	setTimeout(function(){
		$('[data-role="page"]').removeClass('selected');
		$(id).addClass('selected');
		loader();
	}, 500);
}

function loader(){
	if(!$("#loader").is(":visible")){
		$("#loader").show();
	} else {
		$("#loader").hide();
	}
}