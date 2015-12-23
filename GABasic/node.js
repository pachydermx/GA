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
			var vector = this.vector(2);
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
	var set_length = this.length / 2;
	// get x
	var buf = 0;
	for (var i = 0; i < set_length; i++){
		if (this.dna[i]){
			buf += 1;
		}
		buf *= 2;
	}
	buf /= 2;
	result[0] = rs + buf * interval;
	buf = 0;
	for (var i = set_length; i < this.length; i++){
		if (this.dna[i]){
			buf += 1;
		}
		buf *= 2;
	}
	buf /= 2;
	result[1] = rs + buf * interval;
	return result;
	//return [this.value(), this.value()];
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
	if (parameter_length == 1){
		buf += '">' + this.block() + " - (" + Math.floor(this.value() * 1000) / 1000 + ", " + Math.floor(this.fit()*1000)/ 1000 + ')</li>';
	} else if(parameter_length == 2){
		buf += '">' + this.block() + " - (" + Math.floor(this.vector(2)[0] * 1000) / 1000 + ", " + Math.floor(this.vector(2)[1] * 1000) / 1000 + ", " + Math.floor(this.fit()*1000)/ 1000 + ')</li>';
	} else {
		buf += '">' + this.block() + " - " + this.fit() + '</li>';
	}
	return buf;
}

Node.prototype.coordinate = function () {
	if (parameter_length < 2){
		return [this.value(), this.fit()];
	} else {
		return [this.vector()[0], this.vector()[1]];
	}
}
