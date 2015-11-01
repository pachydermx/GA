function Couple(node_a, node_b) {
	this.nodes = [node_a, node_b];
}

Couple.crossover = function() {
	var kids = [];
	var divider = rw.select(this.nodes[0].lengh);
	var i = 0;
	// copy
	// cross
};

// utility
Couple.prototype.print = function() {
	console.log("(" + this.nodes[0].string() + ", " + this.nodes[1].string() + ")");
};