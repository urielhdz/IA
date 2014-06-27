window.addEventListener('load',function(){
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.addEventListener('click',drawPoint);
});