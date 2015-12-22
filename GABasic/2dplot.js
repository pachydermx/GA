function TwoDimensionalPlot(selector, dimension){
	this.origin = [dimension[0], dimension[2]];
	this.length = [dimension[1] - dimension[0], dimension[3] - dimension[2]];
	this.interval = 400;
	this.canvas = selector[0].getContext("2d");
	this.background = [];
	this.min = 0;
	this.max = 0;
	
	this.func = function(x, y){
		return x+y;
	}
}

TwoDimensionalPlot.prototype.getBackgroundData = function () {
	var i = 0;
	for(var y = this.origin[1]; y < this.origin[1] + this.length[1]; y += this.length[1] / this.interval){
		var j = 0;
		this.background[i] = [];
		for(var x = this.origin[0]; x < this.origin[0] + this.length[0]; x += this.length[0] / this.interval){
			var value = this.func(x, y);
			this.background[i][j] = value;
			if (value > this.max){
				this.max = value;
			}
			if (value < this.min){
				this.min = value;
			}
			j++;
		}
		i++;
	}
}

// Draw
TwoDimensionalPlot.prototype.draw = function () {
	for (var i = 0; i < this.interval; i++){
		for (var j = 0; j < this.interval; j++){
			var color = this.getColorByPercentage((this.background[i][j] - this.min) / (this.max - this.min));
			this.drawPoint(i, j, color);
		}
	}
};

TwoDimensionalPlot.prototype.drawPoint = function (x, y, color){
	this.canvas.fillStyle = color;
	this.canvas.fillRect(x, this.interval - y, 1, 1);
}

TwoDimensionalPlot.prototype.drawDot = function(x, y){
	this.canvas.fillStyle = "#000000";
	this.canvas.beginPath();
	this.canvas.arc(x - 2, this.interval - y + 2, 4, 0, 2 * Math.PI);
	this.canvas.stroke();
}

TwoDimensionalPlot.prototype.drawDotAtCoordinate = function(x, y){
	var rx = Math.floor( this.interval * (x - this.origin[0]) / this.length[0] );
	var ry = Math.floor( this.interval * (y - this.origin[1]) / this.length[1] );
	console.log(rx, ry);
	this.drawDot(rx, ry);
};

// Utility
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
	this.draw();
	this.drawDotAtCoordinate(0, 0);
	this.drawDotAtCoordinate(1, 2);
};