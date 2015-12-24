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
	{"name": "Simple Function", "func": "10 - Math.abs(x-5)", "rs": -100, "re": 100},
	{"name": "Sin", "func": "Math.sin(x)", "rs": -3, "re": 3},
	{"name": "Complex", "func": "Math.sin(x) * x", "rs": 0, "re": 24},
	{"name": "Target", func: "- Math.cos( x - 1 ) * Math.cos( 2 * x )", "rs": -4, "re": 4},
	{"name": "Basic 2D", "func": "x+y", "rs": -100, "re": 100},
	{"name": "Another 2D", "func": "Math.sin(x) + Math.sin(y)", "rs": 0, "re":3.14},
	{"name": "Langermann's function", "func": "1 * Math.exp( -((x - 3)^2/Math.PI) - ((y - 5) * (y - 5)/Math.PI) ) * Math.cos( Math.PI * (x - 3) * (x - 3) + Math.PI * (y - 5) * (y - 5)) + 2 * Math.exp( -((x - 5) * (x - 5)/Math.PI) - ((y - 2)* (y - 2)/Math.PI) ) * Math.cos( Math.PI * (x - 5) * (x - 5) + Math.PI * (y - 2) * (y - 2)) + 5 * Math.exp( -((x - 2) * (x - 2)/Math.PI) - ((y - 1) * (y - 1)/Math.PI) ) * Math.cos( Math.PI * (x - 2) * (x - 2) + Math.PI * (y - 1) * (y - 1)) +2 * Math.exp( -((x - 1) * (x - 1)/Math.PI) - ((y - 4) * (y - 4)/Math.PI) ) * Math.cos( Math.PI * (x - 1) * (x - 1) + Math.PI * (y - 4) * (y - 4)) + 3 * Math.exp( -((x - 7) * (x - 7)/Math.PI) - ((y - 9) * (y - 9)/Math.PI) ) * Math.cos( Math.PI * (x - 7) * (x - 7) + Math.PI * (y - 9) * (y - 9))", "rs": 3, "re": 5}, 
	{"name": "Schwefel’s function", "func": "(x*x + y*y)/4000 - Math.cos(x) * Math.cos(y/Math.sqrt(2)) + 1", "rs": -100, "re": 500},
	{"name": "Chessboard", "func": "Math.sin(x) * Math.sin(y)", "rs": 0, "re": 3.14*3}
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
		$("#p_input").val(100);
	}
	if ($("#b_input").val().length == 0) {
		$("#b_input").val(192);
	}
	if ($("#g_input").val().length == 0) {
		$("#g_input").val(100);
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
