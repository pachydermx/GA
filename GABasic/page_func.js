var god = new God();
god.gen(10, 10);
god.code();
for (var i = 0; i < 50; i++){
	god.select();
	god.code();
	//god.print();
	god.crossover();
	god.code();
	//god.print();
	god.mutation();
	//god.print();
	god.code();
}
god.code();
