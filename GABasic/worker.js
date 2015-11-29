importScripts("couple.js", "ga.js", "god.js", "node.js", "manager.js");

var god;

this.onmessage = function(event){
	var data = event.data;
	
	var counter = 0;
	var population = data["p"];
	var bits = data["b"];
	var length = bits;
	var gens = data["g"];
	var detail = data["d"];

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
