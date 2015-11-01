function God() {
	this.population = [];
	this.length;
	this.crossover_probability = 0.6;
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
		buf.push(this.population[pointer]);
	}
	this.population = buf;
};

God.prototype.crossover = function () {
	var groups = Math.floor( this.population.length / 2 );
	var mates = [];
	// bind mates
	for (var i = 0; i < groups; i++) {
		mates.push(new Couple(this.population[ i * 2 ], this.population[ i * 2]));
		mates[mates.length - 1].print();
	}
	// crossover
	
};

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
	for (var i in this.population) {
		console.log(i + ". " +this.population[i].string() + " - " + this.population[i].fit());
	}
	console.log("");
}