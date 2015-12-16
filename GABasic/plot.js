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
	
	var funcData = $("#func_input").val();
	
	var func = "return " + funcData;
	plotFunc = new Function("x", func);
	
	var rs = parseFloat($("#range_begin_input").val());
	var re = parseFloat($("#range_end_input").val());
	
	var dl = parseFloat($("#detail_level").val());
	// init 
	
	w = new Worker("worker.js");
	w.postMessage({
		"p": population,
		"b": bits,
		"g": gens,
		"cp": cp,
		"mp": mp,
		"d": dl,
		"f": func,
		"rs": rs,
		"re": re 
	});
	
	var that = this;
	w.onmessage = function(event) {
		var data = event.data;
		if (typeof event.data !== "undefined"){
			switch (event.data.type){
				case "stat":
					that.addData(event.data.avg, event.data.max);
					break;
				case "progress":
					that.setProgress(event.data.progress * 100);
					break;
				case "code":
					$("#insert_point").append(event.data.code);
					break;
				case "monitor":
					$("#insert_point").html("");
					$("#insert_point").append(event.data.code);
					break;
				default:
					console.log(event.data);
			}
		} else {
			console.log(event.data);
		}
	}
	
	//this.plots.push(plot_sum);
	this.plots.push(plot_avg);
	this.plots.push(plot_max);
	//$.plot("#placeholder", this.plots);
}

Plot.prototype.addData = function(avg, max){
	plot_avg.push([counter, avg]);
	plot_max.push([counter, max]);
	$.plot("#placeholder", this.plots);
	counter++;
}

Plot.prototype.setProgress = function(progress){
	$("#progress-bar").css("width", progress + "%");
}

var plot = new Plot();
var plotFunc;