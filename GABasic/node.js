function Node(input) {
	this.changed = [];
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
	var index = rw.select(this.length - 1);
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

Node.prototype.code = function (id, mark) {
	return '<li class="list-group-item item_' + id + ' ' + mark + '">' + this.string() + " - " + this.fit() + '</li>';
}
