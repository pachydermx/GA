function God() {
	this.population = [];
	this.length;
}

// generation
God.prototype.gen = function (population, length){
	this.length = length;
	for(var i = 0; i < population; i++){
		this.population.push(new Node(length));
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
}

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
}

// print
God.prototype.print = function () {
	for (var i in this.population) {
		console.log(i + ". " +this.population[i].string() + " - " + this.population[i].fit());
	}
	console.log("");
}