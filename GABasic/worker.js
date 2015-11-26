importScripts("couple.js", "ga.js", "god.js", "node.js", "manager.js");


this.onmessage = function(event){
	var data = event.data;
	
	var god;
	var counter = 0;
	var population = data["p"];
	var bits = data["b"];
	var length = bits;
	var gens = data["g"];

	god = new God(data["cp"], data["mp"]);
	god.init(population, bits);
	//god.code();
	for (var i = 0; i < gens; i++){
		god.select();
		//god.code();
		god.crossover();
		//god.code();
		god.mutation();
		//god.code();
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
