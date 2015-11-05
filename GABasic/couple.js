function Couple(node_a, node_b) {
	this.nodes = [node_a, node_b];
	this.length = node_a.length;
}

Couple.prototype.crossover = function() {
	console.log("before")
	this.print();
	var kids = [new Node(this.length), new Node(this.length)];
	var divider = rw.select(this.nodes[0].length - 2) + 1;
	console.log("divider: " + divider);
	var i = 0;
	// copy
	for (; i < divider; i++) {
		kids[0].dna[i] = this.nodes[0].dna[i];
		kids[1].dna[i] = this.nodes[1].dna[i];
	}
	// cross
	for (; i < this.length; i++) {
		kids[0].dna[i] = this.nodes[1].dna[i];
		kids[1].dna[i] = this.nodes[0].dna[i];
	}
	this.nodes[0].substitute(kids[0].dna);
	this.nodes[1].substitute(kids[1].dna);
	this.print();
};

// utility
Couple.prototype.print = function() {
	console.log(this.nodes[0].string(), this.nodes[0].fit());
	console.log(this.nodes[1].string(), this.nodes[1].fit());
	console.log(" ");
};