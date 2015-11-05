var god;
var plot_sum = [];
var plot_avg = [];
var counter = 0;

$("#go_button").click(function() {
	// check value
	if ($("#p_input").val().length == 0) {
		$("#p_input").val(10);
	}
	if ($("#b_input").val().length == 0) {
		$("#b_input").val(6);
	}
	if ($("#g_input").val().length == 0) {
		$("#g_input").val(8);
	}
	if ($("#cp_input").val().length == 0) {
		$("#cp_input").val(0.6);
	}
	if ($("#mp_input").val().length == 0) {
		$("#mp_input").val(0.05);
	}
	$("#intro").fadeOut();
	$("#display").fadeIn();
	
	// run
	manager.go();
	
})