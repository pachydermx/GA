function Node(length) {
	this.dna = [];
	this.lengh = length;
}

Node.prototype.gen = function(length) {
	this.dna = [];
	this.length = length;
	for (var i = 0; i < length; i++) {
		this.dna[i] = rw.coin(0.5);
	}
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
		if (this.dna[i]) {
			buf += "1";
		} else {
			buf += "0";
		}
	}
	return buf;
}