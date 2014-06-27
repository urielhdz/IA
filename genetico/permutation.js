var Permutation = function(population,distances){
	my = this;
	my.population = population;
	my.distances = distances;
	my.execute = function(){
		var combinations = my.permutator(my.population);
		console.log(combinations);
		var best_distance = my.calculate_distances(combinations[0]);
		var best_chromosome = combinations[0];
		for(i in combinations){
			var chromosome = my.calculate_distances(combinations[i]);
			if(chromosome < best_distance){
				best_distance = chromosome;
				best_chromosome = combinations[i];
			}
		}
		return best_chromosome;	
	}
	my.permute = function(input) {
	    var i, ch;
	    var permArr = [], usedChars = [];
	    for (i = 0; i < input.length; i++) {
	        ch = input.splice(i, 1)[0];
	        usedChars.push(ch);
	        if (input.length == 0) {
	            permArr.push(usedChars.slice());
	        }
	        my.permute(input);
	        input.splice(i, 0, ch);
	        usedChars.pop();
	    }
	    return permArr;
	};
	my.permutator = function (input) {
		var set =[];
		function permute (arr, data) {
			var cur, memo = data || [];
			for (var i = 0; i < arr.length; i++) {
				cur = arr.splice(i, 1)[0];
				if (arr.length === 0) set.push(memo.concat([cur]));
				permute(arr.slice(), memo.concat([cur]));
				arr.splice(i, 0, cur);
			}
			return set;
		}
		return permute(input);
	}
	my.calculate_distances = function(chromosome){
		var distance = 0;
		for(var i = 0;i<chromosome.length;i++){
			if(i<chromosome.length - 1){
				var point1 = my.distances[chromosome[i]];
				var point2 = my.distances[chromosome[i+1]];
				var my_distance = my.calculate_distance_between_points(point1,point2);
				
				distance += my_distance;
			}
		}
		return distance;
	};
	my.calculate_distance_between_points = function(point1,point2){
		var xs = 0;
		  var ys = 0;
		 
		  xs = point2.x - point1.x;
		  xs = xs * xs;
		 
		  ys = point2.y - point1.y;
		  ys = ys * ys;
		 
		  return Math.sqrt( xs + ys )
	}
}