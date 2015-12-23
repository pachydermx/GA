var god;
var plot_sum = [];
var plot_avg = [];
var plot_max = [];
var counter = 0;
var w;

var ga_parameters_default = {
	"Small Sample": [6, 8, 5, 0.6, 0.001],
	"Middle Sample": [50, 50, 100, 0.6, 0.001],
	"Big Sample": [100, 192, 300, 0.6, 0.001]
};

var function_default = [
	{"name": "MAXONE", "func": "Count", "rs": 0, "re": 0},
	{"name": "Simple Function", "func": "x", "rs": -100, "re": 100},
	{"name": "Sin", "func": "Math.sin(x)", "rs": -3, "re": 3},
	{"name": "Complex", "func": "Math.sin(x) * x", "rs": 0, "re": 24},
	{"name": "Target", func: "- Math.cos( x - 1 ) * Math.cos( 2 * x )", "rs": -4, "re": 4},
	{"name": "Basic 2D", "func": "x+y", "rs": -100, "re": 100},
	{"name": "Another 2D", "func": "Math.sin(x) + Math.sin(y)", "rs": 0, "re":3.14}
];

$(document).ready(function(){
	// print function menu
	for (var i in function_default){
		$("#function_item_insert_point").after("<li><a id='function_item_" + i + "' class='function_item' href='#'>" + function_default[i].name + "</a></li>")
	}
	
	$(".function_item").click(function(event){
		var asset = function_default[$(this).attr("id").split("_")[2]];
		$("#func_input").val(asset.func);
		$("#range_begin_input").val(asset.rs);
		$("#range_end_input").val(asset.re);
		// prevent menu from closing
		event.stopPropagation();	
	});

})

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

$("#go_button").click(function() {
	var ga_parameters = ga_parameters_default[$("#ga_parameter_groups").val()];
	// check value
	if ($("#p_input").val().length == 0) {
		$("#p_input").val(10);
	}
	if ($("#b_input").val().length == 0) {
		$("#b_input").val(32);
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

var splot;
$("#test_button").click(function() {
});