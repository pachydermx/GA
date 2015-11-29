var god;
var plot_sum = [];
var plot_avg = [];
var plot_max = [];
var counter = 0;
var w;

$("#go_button").click(function() {
	// check value
	if ($("#p_input").val().length == 0) {
		$("#p_input").val(10);
	}
	if ($("#b_input").val().length == 0) {
		$("#b_input").val(8);
	}
	if ($("#g_input").val().length == 0) {
		$("#g_input").val(50);
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
	//manager.go();
	plot.go();
	
	/*
	w = new Worker("worker.js");
	w.onmessage = function(event) {
		console.log(event.data);
	}
	*/
	
})


$("#reset_button").click(function() {
	plot.reset();
	$("#intro").fadeIn();
	$("#display").fadeOut();
})