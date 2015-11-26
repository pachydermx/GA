function Plot() {
	this.plots = [];
}

Plot.prototype.setActive = function (counter, item) {
	return $("#list_" + counter + " .item_" + item).addClass("active");
}

Plot.prototype.setLastColumn = function (item) {
	this.setActive(god.counter, item);
}

Plot.prototype.reset = function () {
	// clear
	this.plots = [];
	$("#insert_point").html("");
	plot_sum = [];
	plot_avg = [];
	plot_max = [];
	counter = 0;
}

Plot.prototype.go = function () {
	// clear
	$("#insert_point").html("");
	plot_sum = [];
	plot_avg = [];
	plot_max = [];
	counter = 0;
	// load values
	var population = parseInt($("#p_input").val());
	var bits = parseInt($("#b_input").val());
	var gens = parseInt($("#g_input").val());
	var cp = parseFloat($("#cp_input").val());
	var mp = parseFloat($("#mp_input").val());
	// init 
	
	w = new Worker("worker.js");
	w.postMessage({
		"p": population,
		"b": bits,
		"g": gens,
		"cp": cp,
		"mp": mp
	});
	
	w.onmessage = function(event) {
		console.log(event.data);
	}
	
	//this.plots.push(plot_sum);
	this.plots.push(plot_avg);
	this.plots.push(plot_max);
	$.plot("#placeholder", this.plots);
}

var plot = new Plot();