function TwoDimensionalPlot(selector){
	this.dimension = {};
	this.canvas = selector[0].getContext("2d");
}

TwoDimensionalPlot.prototype.init = function(selector) {
	
};

TwoDimensionalPlot.prototype.draw = function () {
	
};

TwoDimensionalPlot.prototype.drawPoint = function (x, y, color){
	this.canvas.fillStyle = color;
	this.canvas.fillRect(x, y, 1, 1);
}

TwoDimensionalPlot.prototype.getColorByPercentage = function (z){
	var rgb = [0, 0, 0];
	// blue 255 -> 255 -> 0
	if (z <= 0.5) {
		rgb[2] = 255;
	} else {
		rgb[2] = 255 - (z - 0.5) * 255 * 2;
	}
	// red 0 -> 255 -> 255
	if (z >= 0.5) {
		rgb[0] = 255;
	} else {
		rgb[0] = z * 255 * 2;
	}
	// floor
	rgb[0] = Math.floor(rgb[0]);
	rgb[1] = Math.floor(rgb[1]);
	rgb[2] = Math.floor(rgb[2]);
	// return
	var code = "#" + this.getHexCode(rgb[0]) + this.getHexCode(rgb[1]) + this.getHexCode(rgb[2]);
	return code;
}

TwoDimensionalPlot.prototype.getHexCode = function(value){
	var code = value.toString(16);
	if (code.length < 2){
		code = "0" + code;
	}
	return code;
}

TwoDimensionalPlot.prototype.test = function() {
	for (var j = 0; j <= 200; j++){
		for (var i = 0; i <= 200; i++){
			this.drawPoint(i, j, this.getColorByPercentage(i/200));
		}
	}
};