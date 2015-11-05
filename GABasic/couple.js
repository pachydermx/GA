function Couple(node_a, node_b) {
	this.nodes = [node_a, node_b];
	this.length = node_a.length;
}

Couple.prototype.crossover = function() {
	var kids = [new Node(this.length), new Node(this.length)];
	var divider = rw.select(this.nodes[0].length - 1) + 1;
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
		kids[0].changed[i] = true;
		kids[1].changed[i] = true;
	}
	this.nodes[0].dna = kids[0].dna;
	this.nodes[1].dna = kids[1].dna;
	this.nodes[0].changed = kids[0].changed;
	this.nodes[1].changed = kids[1].changed;
};

