var god = new God();
god.gen(10, 10);
god.print();
for (var i = 0; i <5; i++){
	god.select();
	god.print();
	god.crossover();
	god.print();
	god.mutation();
	god.print();
}
