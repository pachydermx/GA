function God(cp, mp) {
	this.population = [];
	this.mark = [];
	this.length;
	this.crossover_probability = cp;
	this.mutation_probability = mp;
	this.last_job = "";
	this.gen = 0;
	this.counter = -1;
	this.type = "default"
	this.sumFit = 0;
	this.avgFit = 0;
	this.maxFit = 0;
	
}

// generation
God.prototype.init = function (population, length){
	delete this.population;
	this.population = [];
	this.length = length;
	for(var i = 0; i < population; i++){
		var new_node = new Node(length);
		new_node.gen(length);
		this.population.push(new_node);
	}
	this.last_job = "Generation"
	this.type = "primary"
	this.counter++;
	return this.population;
};

God.prototype.select = function () {
	// get ratio disk
	var ratio = [];
	for (var i in this.population) {
		var ratio_item = Math.floor(this.population[i].fit() - this.avgFit + 0.5);
		//ratio_item *= ratio_item;
		if (ratio_item > 0){
			ratio.push(ratio_item + 0);
		} else {
			ratio.push(0);
		}
	}
	// select
	var buf = [];
	rw.rouletteGen(ratio);
	for (var i = 0; i < this.population.length; i++){
		// select item using roulette
		var pointer = rw.roulette();
		buf.push(new Node(this.population[pointer].dna));
		// mark
		//manager.setLastColumn(pointer);
		this.population[pointer].flag = true;
	}
	this.population = buf;
	// log
	this.last_job = "Select";
	this.type = "default";
	this.counter++;
	this.gen++;
};

God.prototype._crossover = function () {
	var groups = Math.floor( this.population.length / 2 ) ;
	var mates = [];
	// bind mates
	for (var i = 0; i < groups; i++) {
		if ( rw.coin( this.crossover_probability )) {
			mates.push(new Couple(this.population[ i * 2 ], this.population[ i * 2 + 1]));
			// mark
			this.population[i * 2].flag = true;
			this.population[i * 2 + 1].flag = true;
			//manager.setLastColumn( i * 2 );
			//manager.setLastColumn( i * 2 + 1 );
		}
	}
	// crossover
	for ( var i in mates ) {
		mates[i].crossover();
	}
	// log
	this.last_job = "Crossover";
	this.type = "default";
	this.counter++;
};

// crossover single point
God.prototype.crossover = function () {
	// scan half population
	for (var i = 0; i < Math.floor( this.population.length / 2 ); i++){
		// decide if mate
		if (rw.coin( this.crossover_probability )){
			// decide swap point
			var swap_point = rw.select( this.length - 1 ) + 1;
			// get new dna
			var kid1_dna = [];
			var kid2_dna = [];
			var marks = [];
			// copy
			for (var j = 0; j < swap_point; j++){
				kid1_dna[j] = this.population[i].dna[j];
				kid2_dna[j] = this.population[this.population.length - i - 1].dna[j];
			}
			// combine
			for (; j < this.length; j++){
				kid2_dna[j] = this.population[i].dna[j];
				kid1_dna[j] = this.population[this.population.length - i - 1].dna[j];
				marks.push(j);
			}
			// create new population
			this.population[i] = new Node(kid1_dna);
			this.population[this.population.length - i - 1] = new Node(kid2_dna);
			// mark changes
			for (var j in marks){
				this.population[i].changed[marks[j]] = true;
				this.population[this.population.length - i - 1].changed[marks[j]] = true;
			}
		}
	}
	// log
	this.last_job = "Crossover";
	this.type = "default";
	this.counter++;
};

// crossover uniform
God.prototype._crossover = function () {
	// scan half population
	for (var i = 0; i < Math.floor( this.population.length / 2 ); i++){
		for (var j in this.population[i].dna) {
			if (rw.coin( this.crossover_probability )){
				var tmp = this.population[i].dna[j];
				this.population[i].dna[j] = this.population[this.population.length - i - 1].dna[j];
				this.population[this.population.length - i - 1].dna[j] = tmp;
				
				this.population[i].changed[j] = true;
				this.population[this.population.length - i - 1].changed[j] = true;
			}
		}
	}
	// log
	this.last_job = "Crossover";
	this.type = "default";
	this.counter++;
}

God.prototype._mutation = function () {
	for (var i in this.population) {
		if (rw.coin(this.mutation_probability)){
			this.population[i].mutation();
			// mark
			//manager.setLastColumn(i);
			this.population[i].flag = true;
		}
	}
	// log
	this.last_job = "Mutation";
	this.type = "info";
	this.counter++;
}


God.prototype.mutation = function () {
	for (var i in this.population) {
		for (var j in this.population[i].dna) {
			if (rw.coin(this.mutation_probability)){
				this.population[i].dna[j] = !this.population[i].dna[j];
				this.population[i].changed[j] = true;
			}
		}
	}
	// log
	this.last_job = "Mutation";
	this.type = "info";
	this.counter++;
}

// calculation
God.prototype.stat = function () {
	this.sumFit = 0;
	this.maxFit = 0;
	// get sum fit & max fit
	for (var i in this.population) {
		var theFit = this.population[i].fit();
		this.sumFit += theFit;
		// check max fit
		if (theFit > this.maxFit){
			this.maxFit = theFit;
		}
	}
	// get avg fit
	this.avgFit = this.sumFit / this.population.length;
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
};

// output
God.prototype.print = function () {
	console.log(this.last_job);
	for (var i in this.population) {
		console.log(i + ". " +this.population[i].string() + " - " + this.population[i].fit());
	}
	console.log("Avg: " + this.avgFit + " Sum: " + this.sumFit)
	console.log("");
}

God.prototype.code = function() {
	this.stat();
	
	var buf = '<div id="list_' + this.counter + '" class="col-sm-2"><div class="panel panel-' + this.type + '"><div class="panel-heading"><h3 class="panel-title">';
	buf += this.last_job + " Gen:" + this.gen;
	buf += '</h3></div><div class="panel-body"><div><ul class="list-group">';

	for (var i in this.population) {
		buf += this.population[i].code(i, this.mark[i]);
	}

	buf += "<p>" + "Avg: " + Math.floor(this.avgFit * 100) / 100 + "</p><p>Max: " + this.maxFit + "</p>";

	buf += '</ul></div></div></div></div>';

	//$("#insert_point").append(buf);

	this.counter++;
	return buf;
		
	
	
}