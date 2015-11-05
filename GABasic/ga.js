function RandWorker() {
}

RandWorker.prototype.coin = function(ratio){
	if (Math.random() < ratio) {
		return true;
	} else {
		return false;
	}
}

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

RandWorker.prototype.select = function(total) {
	return Math.floor( Math.random() * total );
};

var rw = new RandWorker();