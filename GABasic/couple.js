function Couple(node_a, node_b) {
	this.nodes = [node_a, node_b];
}

Couple.crossover = function() {
	
};

// utility
Couple.prototype.print = function() {
	console.log("(" + this.nodes[0].string() + ", " + this.nodes[1].string() + ")");
};