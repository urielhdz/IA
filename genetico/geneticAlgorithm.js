var GeneticAlgorithm = function(N,G,population,distances){
	self = this;
	self.N = N;
	self.G = G;
	self.chromosomes = population;
	self.distances = distances;
	console.log(population);
	self.get_best_chromosome = function(chromosomes){
		var best_distance = self.calculate_distances(chromosomes[0]);
		var best_chromosome = chromosomes[0];
		for(i in chromosomes){
			var chromosome = self.calculate_distances(chromosomes[i]);
			if(chromosome < best_distance){
				best_distance = chromosome;
				best_chromosome = chromosomes[i];
			}
		}
		return best_chromosome;
	};
	self.calculate_distances = function(chromosome){
		var distance = 0;
		for(var i = 0;i<chromosome.length;i++){
			if(i<chromosome.length - 1){
				var point1 = self.distances[chromosome[i]];
				var point2 = self.distances[chromosome[i+1]];
				var my_distance = self.calculate_distance_between_points(point1,point2);
				
				distance += my_distance;
			}
		}
		return distance;
	};
	self.calculate_distance_between_points = function(point1,point2){
		var xs = 0;
		  var ys = 0;
		 
		  xs = point2.x - point1.x;
		  xs = xs * xs;
		 
		  ys = point2.y - point1.y;
		  ys = ys * ys;
		 
		  return Math.sqrt( xs + ys )
	}
	self.select_chromosomes = function(chromosomes){
		var winners = [];
		for(i in chromosomes){
			x = chromosomes[self.getRandomInt(0,chromosomes.length -1)];
			y = chromosomes[self.getRandomInt(0,chromosomes.length -1)];
			
			if(self.calculate_distances(x) < self.calculate_distances(y)){
				winners.push(x);
			}
			else winners.push(y);
		}
		return winners;
	}
	self.cross = function(chromosomes){
		var crossed_chromosomes = [];
		for(var i = 0;i<chromosomes.length;i++){
			x = chromosomes[i];
			if(self.getRandomInt(0,100) < 70){
				var new_chromosome = self.cross_chromosomes(x);
				crossed_chromosomes.push(new_chromosome);
			}
			else crossed_chromosomes.push(x);
		}
		return crossed_chromosomes;
	}
	self.cross_chromosomes = function(k){
		var crosspoint = self.getRandomInt(0,x.length-1);
		var new_chromosome = [];
		var helper = k[crosspoint];
		var before = 0;
		for(var i = 0;i<k.length;i++){
			if(i>=crosspoint && i < k.length -1){
				new_chromosome[i] = x[i+1];
				
			}
			else new_chromosome[i] = x[i];
		}
		new_chromosome[x.length - 1 ] = helper;
		
		return new_chromosome;
	}
	self.mutate = function(chromosomes){
		var mutated_chromosomes = [];
		for(var i = 0;i<chromosomes.length;i++){
			x = chromosomes[i];
			if(self.getRandomInt(0,100) < 10){
				var new_chromosome = self.mutate_chromosome(x);
				mutated_chromosomes.push(new_chromosome);
			}
			else mutated_chromosomes.push(x);
		}
		return mutated_chromosomes;
	}
	self.mutate_chromosome = function(x){
		var options = [];
		for(i in distances){
			options.push(i);
		}
		var new_chromosome  = [];
		while(options.length > 0){
			new_chromosome.push(parseInt(options.pop(self.getRandomInt(0,options.length-1))));
		}
		return new_chromosome;
	}
	self.getRandomInt = function(min, max){
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}