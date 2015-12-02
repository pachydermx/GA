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
	var sum = 0;
	for (var i in this.dna) {
		if (this.dna[i]) {
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
	return value;
};

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
	buf += '">' + this.block() + " - " + this.fit() + '</li>';
	return buf;
}
