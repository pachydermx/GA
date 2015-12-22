importScripts("couple.js", "ga.js", "god.js", "node.js", "manager.js");

var god;
var plotFunc, parameter_length;
var rs, re, interval;

this.onmessage = function(event){
	var data = event.data;
	
	var counter = 0;
	var population = data["p"];
	var bits = data["b"];
	var length = bits;
	var gens = data["g"];
	var detail = data["d"];
	
	// function
	var plotFuncData = data["f"];
	if (plotFuncData === "return Count"){
		parameter_length = 0;
		plotFuncData = "return 0";
	} else if (plotFuncData.indexOf('y') > 0){
		parameter_length = 2;
	} else {
		parameter_length = 1;
	}
	//range
	rs = data["rs"];
	re = data["re"];
	if (parameter_length < 2){
		interval = (re - rs) / Math.pow(2, bits);
	} else {
		interval = (re - rs) / Math.pow(2, bits / 2);
	}
	postMessage(re - rs);
	
	plotFunc = new Function("x", "y", plotFuncData);

	god = new God(data["cp"], data["mp"]);
	god.init(population, bits);
	
	if (detail > 0){
		postMessage({
			"type": "code",
			"code": god.code()
		});
	}
	
	for (var i = 0; i < gens; i++){
		god.select();
		if (detail < 0){
			postMessage({
				"type": "monitor",
				"code": god.getBestCode()
			})
		}
		if (detail > 0){
			postMessage({
				"type": "code",
				"code": god.code()
			});
		}
		god.crossover();
		if (detail > 1){
			postMessage({
				"type": "code",
				"code": god.code()
			});
		}
		god.mutation();
		if (detail > 2){
			postMessage({
				"type": "code",
				"code": god.code()
			});
		}
		god.stat();
		postMessage({
			"type": "stat",
			"avg": god.avgFit,
			"max": god.maxFit,
			"coordinate": god.reportCoordinates()
		});
		if (i % 10){
			postMessage({
				"type": "progress",
				"progress": i / gens
			});
		}
	}

}
