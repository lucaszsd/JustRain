//lzsd

var canvas, ctx;
var HEIGHT, WIDTH;

HEIGHT = document.body.getElementsByClassName("simulation")[0].clientHeight;
WIDTH = document.body.getElementsByClassName("simulation")[0].clientWidth;

canvas = document.createElement("canvas"); 
canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx = canvas.getContext("2d");

document.body.getElementsByClassName("simulation")[0].appendChild(canvas);
 
//-------------------------------

var gravity = 5;
var qtde = 600;
var drops = {};
var drop_color = null;
var sky_color = null;

//-------------------------------


//Objeto gota
function drop(){
	
	//O "z" serve para o efeito parallax
	this.x = Math.floor(Math.random() * WIDTH + 1);
	this.y = -Math.floor(Math.random() * HEIGHT + 1);
	this.z = Math.floor(Math.random() * 4 + 1);
	this.lengh = this.z * 20;

	this.update = function(){		
		this.y = this.y + gravity *  this.z * 2;
		if(this.y > HEIGHT){
			this.y = -100;
			this.x = Math.floor(Math.random() * WIDTH + 1);
		}	
	}

	this.draw = function(){
		//Gradiente da particula
		drop_color = ctx.createLinearGradient(this.x, this.y, this.x+this.z/2, this.y + this.lengh);
		drop_color.addColorStop(0.3, "rgba(255 , 255, 255, 0.1)");
		drop_color.addColorStop(1,  "rgba(255 , 255, 255, 1)");
		//Desenha cada particula
		ctx.beginPath();	
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, this.y + this.lengh);
		ctx.lineWidth = this.z/2;
		ctx.strokeStyle = drop_color;
		ctx.stroke();
		ctx.closePath();
	}
}

//Inicia as "gotas"
for(var i = 0 ; i < qtde; ++i){
	drops[i] = null;
	drops[i] = new drop();
}

//Atualiza a posição das particulas
update = function(){
	for(var i = 0; i < qtde; ++i){
		drops[i].update();
	}
}


//Desenha no canvas
draw = function(){
	//Cor do ceu
	sky_color = ctx.createLinearGradient(WIDTH/2, 0, WIDTH/2, HEIGHT);
	sky_color.addColorStop(0, "rgb(9 ,5 ,20)");
	sky_color.addColorStop(0.4, "rgb(27 ,12 ,43)");
	sky_color.addColorStop(0.7,  "rgb(129 ,64 ,130)");
	sky_color.addColorStop(1, "rgb(255 ,180 ,163)");
	ctx.beginPath();
	ctx.fillStyle = sky_color;
	ctx.fillRect(0 ,0,WIDTH, HEIGHT);
	ctx.closePath();
	//Desenha cada particula
	for(var i = 0; i < qtde; ++i){
		drops[i].draw();
	}	
}

//Mantem loop
loop = function(){
	HEIGHT = document.body.getElementsByClassName("simulation")[0].clientHeight;
	WIDTH = document.body.getElementsByClassName("simulation")[0].clientWidth;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	window.requestAnimationFrame(loop);
	update();
	draw();	
}

loop();