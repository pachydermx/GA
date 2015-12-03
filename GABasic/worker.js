importScripts("couple.js", "ga.js", "god.js", "node.js", "manager.js");

var god;
var plotFunc;
var rs, re, interval;

this.onmessage = function(event){
	var data = event.data;
	
	var counter = 0;
	var population = data["p"];
	var bits = data["b"];
	var length = bits;
	var gens = data["g"];
	var detail = data["d"];
	
	var plotFuncData = data["f"];
	rs = data["rs"];
	re = data["re"];
	interval = (re - rs) / Math.pow(2, bits);
	postMessage(re - rs);
	
	plotFunc = new Function("x", plotFuncData);
	

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
		});
		if (i % 10){
			postMessage({
				"type": "progress",
				"progress": i / gens
			});
		}
	}

}
