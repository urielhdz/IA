var Simulated = function(temp,population,distances) {
	var self = this;
	self.temp = temp;
	self.population = population;

	self.distances = distances;
	self.generateRandom = function(){
		var arr = self.population;
		var new_arr = [];
		while(arr.length > 0){
			
			var random = self.getRandomInt(0,arr.length-1);
			var el = arr.splice(random,1)[0];
			new_arr.push(el);
		}
		
		return new_arr;
	}
	self.execute = function(){
		var s_old = self.generateRandom(self.population);
		var p;
		var s_best = s_old;
		while(self.temp > 0.01){
			var i = 0;
			while(i<100){
				var s_new = self.disturb(s_old);
				if(self.cost(s_new) < self.cost(s_best)) s_best = s_new;
				if(self.cost(s_new) < self.cost(s_old))
					s_old = s_new;
				else{
					p = self.probability(s_new,s_old);
					if(p > self.pr){
						s_old = s_new;
					}
				}
				i++;
			}
			console.log(p);
			self.temp = self.temp * 0.99;
		}
		return s_best;
	}
	self.probability = function(s_new,s_old){
		return Math.exp((self.cost(s_old) - self.cost(s_new)) / self.temp);
	}
	self.cost = function(arr){
		var distance = 0;
		for(var i = 0;i<arr.length;i++){
			if(i<arr.length - 1){
				var point1 = self.distances[arr[i]];
				var point2 = self.distances[arr[i+1]];
				var my_distance = self.calculate_distance_between_points(point1,point2);
				distance += my_distance;
			}
		}
		return distance;
	}
	self.calculate_distance_between_points = function(point1,point2){
		var xs = 0;
		var ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt( xs + ys )
	}
	self.disturb = function(arr_old){
		var second_part = arr_old.slice(0);
		var random = self.getRandomInt(0,arr_old.length-2);
		var first_part = second_part.splice(0,random);
		var arr = first_part.concat(second_part.reverse());
		return arr;
	}
	self.getRandomInt = function(min, max){
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	self.pr = self.getRandomInt(0,1);
	console.log(self.pr);
}