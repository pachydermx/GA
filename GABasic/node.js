function Node(input) {
	this.changed = [];
	this.flag = false;
	if (Array.isArray(input)){
		this.dna = input;
		this.length = this.dna.length;
	} else {
		this.dna = [];
		this.length = input;
	}
}

Node.prototype.gen = function(length) {
	this.dna = [];
	this.length = length;
	for (var i = 0; i < length; i++) {
		this.dna[i] = rw.coin(0.5);
	}
}


Node.prototype.mutation = function() {
	var index = rw.select(this.length - 0);
	this.dna[index] = !this.dna[index];
	this.changed[index] = true;
}

Node.prototype.fit = function() {
	switch (parameter_length){
		case 0:
			return this.count(true);
			break;
		case 1:
			return plotFunc(this.value());
			break;
		case 2:
			var vector = this.vector();
			return plotFunc(vector[0], vector[1]);
		default:	
			break;
	}
}

Node.prototype.count = function(value) {
	var sum = 0;
	for (var i in this.dna) {
		if (this.dna[i] == value) {
			sum++;
		}
	}
	return sum;
};

Node.prototype.value = function () {
	var value = 0;
	for (var i in this.dna){
		if (this.dna[i]){
			value += 1;
		}
		value *= 2;
	}
	value /= 2;
	return rs + value * interval;
};

Node.prototype.vector = function (length) {
	var result = [];
	var delta = Math.floor(this.length / length);
	for (var i = 0; i < length; i++){
		var buf = 0;
		for (var j = i * delta; j < (i + 1) * delta; j++){
			if (this.dna[j]){
				buf += 1;
			}
			buf *= 2;
		}
		result.push(result);
	}
	return result;
}

// utiltiy
Node.prototype.string = function () {
	var buf = "";
	for (var i in this.dna) {
		buf += "<span class='";
		if (this.changed[i]){
			buf += "changed"
		}
		buf += "'>"
		if (this.dna[i]) {
			buf += "1";
		} else {
			buf += "0";
		}
		buf += "</span>"
	}
	this.changed = [];
	return buf;
}

Node.prototype.block = function () {
	var buf = "";
	for (var i in this.dna) {
		buf += "<span class='block "
		if (this.dna[i]) {
			buf += "dnaT";
		} else {
			buf += "dnaF";
		}
		if (this.changed[i]) {
			buf += " dnaChanged"
		}
		buf += "'></span>";
	}
	this.changed = [];
	return buf;
}

Node.prototype.code = function (id, mark) {
	var buf = '<li class="list-group-item item_' + id + ' ' + mark;
	/*
	if (this.flag){
		buf += " active";
	}
	*/
	buf += '">' + this.block() + " - (" + Math.floor(this.value() * 10) / 10 + ", " + Math.floor(this.fit()*10)/ 10 + ')</li>';
	return buf;
}
