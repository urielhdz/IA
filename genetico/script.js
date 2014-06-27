var points = [];
var canvas,context;
var plane = false;
var mapa;
window.addEventListener('load',init);
var avion;
var N,G;
function init(){
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.addEventListener('click',drawPoint);
	
	document.querySelector('#calculate').addEventListener('click',calculate)
	requestAnimationFrame(dibujar);
	var my_map = new Image();
	my_map.onload = function(){
		mapa = this;
	};
	my_map.src = "mapa.png";
	var img = new Image();
	img.onload = function(){
		avion = {
			x: 0,
			y: 0,
			img: this,
			target_x: 10,
			target_y: 20,
			target_point: -1,
			chromosome: [],
			draw: function(){
				if(plane){
					if(this.x>this.target_x) this.x--;
					if(this.x<this.target_x)this.x++;
					if(this.y>this.target_y) this.y--;
					if(this.y<this.target_y) this.y++;
					context.save();
					if(this.x == this.target_x && this.y == this.target_y){
						if(this.target_point>=0) points[this.target_point].color = 'blue';
						if(this.chromosome.length < 1){
							plane = false;
						}
						else{
							this.target_point = this.chromosome.shift();
							var new_target = points[this.target_point];
							this.target_x = new_target.x;
							this.target_y = new_target.y;	
						}
						

					}
					
				}
				context.drawImage(this.img,this.x-15,this.y-7);
				context.restore();
			}
		};	
	}
	img.src = "avion.png";
	
}
function drawPoint(evento){
	var rectangulo = this.getBoundingClientRect();
	var coordenadas = {
		x: evento.clientX - rectangulo.left,
		y: evento.clientY - rectangulo.top
	};
	points.push({x: coordenadas.x, y: coordenadas.y, radio: 5,color:'rgb(200,50,50)'});
}
function dibujar(){
	context.clearRect(0,0,800,400);
	context.save();
	if(typeof mapa != "undefined") context.drawImage(mapa,0,0);
	if(typeof avion != "undefined") avion.draw();
	for(i in points){
		var circulo = points[i];
		context.save();
		context.fillStyle = circulo.color;
		context.beginPath();
		context.arc(circulo.x - circulo.radio ,circulo.y - circulo.radio ,circulo.radio,0,7);
		context.fill();
		context.closePath();
		context.restore();
		context.save();
		context.fillStyle = "black";
		context.fillText((i),circulo.x-10,circulo.y-10);
		context.restore();
	}
	requestAnimationFrame(dibujar);
}
function calculate(){
	N = document.querySelector('#N').value;
	G = document.querySelector('#generaciones').value;
	
	var population = [];
	var my_points = [];
	var best_chromosome;
	for(var k = 0;k<=parseInt(N);k++){
		population.push(generateChromosome());
	}
	for(var i in points){
		
		my_points.push(i);
	}
	
	var selected_option = document.getElementById('algorithm_box').value;
	if(selected_option == "1"){
		var ga = new GeneticAlgorithm(N,G,population,points);
		if(!(document.getElementById("N").checkValidity() && document.getElementById("generaciones").checkValidity())) return;
		best_chromosome = best_chromosome_genetic(population,ga);
	} 
	if(selected_option == "2"){
		var det = new Permutation(my_points,points);
		best_chromosome = best_chromosome_deterministic(population,det);	
	} 
	if (selected_option == "3"){
		var sim = new Simulated (10000,my_points,points);
		best_chromosome = sim.execute();
		console.log(best_chromosome);
	} 
	movePlane(best_chromosome);
}
function generateChromosome(){
	var options = [];
	for(i in points){
		options.push(i);
	}
	var new_chromosome  = [];
	while(options.length > 0){
		new_chromosome.push(parseInt(options.pop(getRandomInt(0,options.length-1))));
	}
	return new_chromosome;
}
function best_chromosome_deterministic(population,det){
	var det = det;
	return det.execute();
}
function best_chromosome_genetic(population,ga){
	var best_chromosomes = [];
	var gA = ga;
	var population = population;
	for(var j = 0;j<G;j++){
		var winners = gA.select_chromosomes(population);
		var crossed_chromosomes = gA.cross(winners);
		var muteted_chromosomes = gA.mutate(crossed_chromosomes);
		population = muteted_chromosomes;
		best_chromosomes.push(gA.get_best_chromosome(muteted_chromosomes))
	}
	for(i in best_chromosomes){
		var chromosome = best_chromosomes[i];
		console.log(chromosome+" has a distance of: "+ gA.calculate_distances(chromosome));
	}
	return gA.get_best_chromosome(best_chromosomes);
}
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function movePlane(chromosome){
	avion.chromosome = chromosome;
	var first_appointment = points[chromosome[0]];
	avion.x = first_appointment.x;
	avion.target_x = first_appointment.x;
	avion.target_y = first_appointment.y;
	avion.y = first_appointment.y;
	avion.target_point = chromosome[0];
	plane = true;
}