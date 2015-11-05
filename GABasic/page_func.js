var god = new God();
var plot_sum = [];
var plot_avg = [];
var counter = 0;

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

$.plot("#placeholder", [plot_sum, plot_avg]);
