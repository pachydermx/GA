function God() {
	this.population = [];
	this.length;
	this.crossover_probability = 0.6;
	this.mutation_probability = 0.05;
	this.last_job = "";
}

// generation
God.prototype.gen = function (population, length){
	delete this.population;
	this.population = [];
	this.length = length;
	for(var i = 0; i < population; i++){
		var new_node = new Node(length);
		new_node.gen(length);
		this.population.push(new_node);
	}
	this.last_job = "Generation"
	return this.population;
};

God.prototype.select = function () {
	// get ratio disk
	var ratio = [];
	for (var i in this.population) {
		ratio.push( this.population[i].fit() );
	}
	// select
	var buf = [];
	for (var i = 0; i < this.population.length; i++){
		var pointer = rw.roulette(ratio);
		//buf.push(this.population[pointer]);
		buf.push(new Node(this.population[pointer].dna));
	}
	this.population = buf;
	this.last_job = "Select";
};

God.prototype.crossover = function () {
	var groups = Math.floor( this.population.length / 2 ) ;
	var mates = [];
	// bind mates
	for (var i = 0; i < groups; i++) {
		mates.push(new Couple(this.population[ i * 2 ], this.population[ i * 2 + 1]));
	}
	// crossover
	for ( var i in mates ) {
		if ( rw.coin( this.crossover_probability )) {
			mates[i].crossover();
		}
	}
	this.last_job = "Crossover";
};

God.prototype.mutation = function () {
	for (var i in this.population) {
		if (rw.coin(this.mutation_probability)){
			this.population[i].mutation();
		}
	}
	this.last_job = "Mutation";
}

// utility
// calc
God.prototype.avgFit = function () {
	return this.sumFit() / this.length;
};

God.prototype.sumFit = function () {
	var sum = 0;
	for (var i in this.population) {
		sum += this.population[i].fit();
	}
	return sum;
};

God.prototype.pick = function (exception) {
	var index;
	while ( true ) {
		index = Math.floor( Math.random() * this.population.length )
		var available = true;
		if (typeof exception !== "undefined") {
			for ( var i in exception ) {
				if (exception[i] == index) {
					available = false;
				}
			}
		}
		if (available) {
			break;
		}
	}
	return index;	
};

// output
God.prototype.print = function () {
	console.log(this.last_job);
	for (var i in this.population) {
		console.log(i + ". " +this.population[i].string() + " - " + this.population[i].fit());
	}
	console.log("Avg: " + this.avgFit() + " Sum: " + this.sumFit())
	console.log("");
}

God.prototype.code = function() {
	var buf = '<div class="col-sm-4"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">';
	buf += this.last_job;
	buf += '</h3></div><div class="panel-body"><div class="row"><div><ul class="list-group">';
	
	for (var i in this.population) {
		buf += this.population[i].code();
	}
	
	buf += "<p>" + "Avg: " + this.avgFit() + " Sum: " + this.sumFit() + "</p>";
	
	buf += '</ul></div></div></div></div></div><!-- /.col-sm-4 -->';
	$("#insert_point").append(buf);
	
	
	plot_sum.push([counter, this.sumFit()]);
	plot_avg.push([counter, this.avgFit()]);
	counter++;
}