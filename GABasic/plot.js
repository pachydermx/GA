function Plot() {
	this.plots = [];
	this.fplot = [];
	this.draw_circle = 100;
	this.splot = undefined;
	this.dimension = 0;
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
	plotFunc = new Function("x", "y", func);
	
	if (func === "return Count"){
		this.dimension = 0;
	} else if (func.indexOf('y') > 0){
		this.dimension = 2;
	} else {
		this.dimension = 1;
	}
	
	var rs = parseFloat($("#range_begin_input").val());
	var re = parseFloat($("#range_end_input").val());
	
	// calc base func graph
	if (funcData !== "Count"){
		this.fplot = [];
		var int = (re - rs) / this.draw_circle;
		for (var i = 0; i < this.draw_circle; i++){
			this.fplot.push([rs + i * int, plotFunc(rs + i * int)]);
		}
	}
	
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
					if (that.dimension < 2){
						that.updateFPlot(event.data.coordinate);
					} else {
						that.update2DPlot(event.data.coordinate);
					}
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
	
	if (this.dimension == 2){
		this.splot = new TwoDimensionalPlot($("#2dplot"), [rs, re, rs, re]);
		this.splot.func = plotFunc;
		this.splot.getBackgroundData();
		this.splot.draw();
		
	}
}

Plot.prototype.updateFPlot = function(data){
	$.plot("#fplot", [{
		"data": data,
		"points": {"show": true}
	}, {
		"data": this.fplot,
		"lines": {"show": true}
	}]);
}

Plot.prototype.update2DPlot = function(data){
	this.splot.draw();
	for (var i in data){
		this.splot.drawDotAtCoordinate(data[i][0], data[i][1]);
	}
}

Plot.prototype.addData = function(avg, max){
	plot_avg.push([counter, avg]);
	plot_max.push([counter, max]);
	$.plot("#plot", this.plots);
	counter++;
}

Plot.prototype.setProgress = function(progress){
	$("#progress-bar").css("width", progress + "%");
}


var plot = new Plot();
var plotFunc;