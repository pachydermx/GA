var god = new God();
god.gen(10, 8);
god.print();
for (var i = 0; i < 1; i++){
	god.select();
	god.print();
	god.crossover();
	god.print();
	god.mutation();
	god.print();
}
