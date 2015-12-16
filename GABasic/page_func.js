var god;
var plot_sum = [];
var plot_avg = [];
var plot_max = [];
var counter = 0;
var w;

var ga_parameters_default = {
	"Small Sample": [6, 8, 5, 0.6, 0.001], 
	"Big Sample": [100, 192, 300, 0.6, 0.001]
};

var function_default = {
	"Count": "Count",
	"Simple Function": "x"
}

$(".ga_parameter_item").click(function(event){
	var asset = ga_parameters_default[this.text];
	$("#p_input").val(asset[0]);
	$("#b_input").val(asset[1]);
	$("#g_input").val(asset[2]);
	$("#cp_input").val(asset[3]);
	$("#mp_input").val(asset[4]);
	// prevent menu from closing
	event.stopPropagation();
});

$(".function_item").click(function(event){
	var asset = function_default[this.text];
	$("#func_input").val(asset);
	// prevent menu from closing
	event.stopPropagation();	
});

$("#go_button").click(function() {
	var ga_parameters = ga_parameters_default[$("#ga_parameter_groups").val()];
	// check value
	if ($("#p_input").val().length == 0) {
		$("#p_input").val(6);
	}
	if ($("#b_input").val().length == 0) {
		$("#b_input").val(8);
	}
	if ($("#g_input").val().length == 0) {
		$("#g_input").val(5);
	}
	if ($("#cp_input").val().length == 0) {
		$("#cp_input").val(0.6);
	}
	if ($("#mp_input").val().length == 0) {
		$("#mp_input").val(0.001);
	}
	$("#intro").fadeOut();
	$("#display").fadeIn();
	
	if ($("#func_input").val().length == 0){
		$("#func_input").val("x");
	}
	if ($("#range_begin_input").val().length == 0){
		$("#range_begin_input").val(-100);
	}
	if ($("#range_end_input").val().length == 0){
		$("#range_end_input").val(100);
	}
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
	$("#progress-bar").css("width", "0%");
})