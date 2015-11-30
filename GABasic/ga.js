function RandWorker() {
	this.workingSum;
	this.workingTable;
}

RandWorker.prototype.coin = function(ratio){
	if (Math.random() < ratio) {
		return true;
	} else {
		return false;
	}
}

/*
RandWorker.prototype.roulette = function(ratio) {
	// generate disk
	var disk = [];
	for (var section in ratio) {
		for (var i = 0; i < ratio[section]; i++){
			disk.push(parseInt(section));
		}
	}
	// select
	var pointer = Math.floor( Math.random() * disk.length );
	return disk[pointer];
}
*/

RandWorker.prototype.rouletteGen = function(ratio) {
	// calc sum
	var sum = 0;
	for (var i in ratio) {
		sum += ratio[i];
	}
	// assign probablity
	var prob = [];
	for (var i in ratio) {
		prob.push(ratio[i] / sum);
	}
	// assign
	this.workingSum = sum;
	this.workingTable = prob;
};

RandWorker.prototype.roulette = function() {
	var pointer = Math.random();
	var rangeStart = 0;
	for (var i in this.workingTable) {
		if (pointer >= rangeStart && pointer < rangeStart + this.workingTable[i]){
			return i;
		} else {
			rangeStart += this.workingTable[i];
		}
	}
	return 0;
}


RandWorker.prototype.select = function(total) {
	return Math.floor( Math.random() * total );
};

var rw = new RandWorker();