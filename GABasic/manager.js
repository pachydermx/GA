function Manager() {
	this.sum_plot = [];
}

Manager.prototype.setActive = function (counter, item) {
	return $("#list_" + counter + " .item_" + item).addClass("active");
}

Manager.prototype.setLastColumn = function (item) {
	this.setActive(god.counter, item);
}

var manager = new Manager();