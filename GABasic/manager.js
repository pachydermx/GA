function Manager() {
	this.plots = [];
}

Manager.prototype.setActive = function (counter, item) {
	return $("#list_" + counter + " .item_" + item).addClass("active");
}

Manager.prototype.setLastColumn = function (item) {
	this.setActive(god.counter, item);
}

Manager.prototype.reset = function () {
	// clear
	this.plots = [];
	$("#insert_point").html("");
	plot_sum = [];
	plot_avg = [];
	plot_max = [];
	counter = 0;
}

Manager.prototype.go = function () {
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
	var mp = parseFloat($("#fp_input").val());
	// init 
	god = new God(cp, mp);
	god.init(population, bits);
	god.code();
	for (var i = 0; i < gens; i++){
		god.select();
		god.code();
		god.crossover();
		god.code();
		god.mutation();
		god.code();
	}

	//this.plots.push(plot_sum);
	this.plots.push(plot_avg);
	this.plots.push(plot_max);
	$.plot("#placeholder", this.plots);
}

var manager = new Manager();