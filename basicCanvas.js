//setting up the canvas. let c be the canvas's context
const canvas = document.getElementById("basicCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

//declare random functions
function randomFloat (bottom, top) {
    return (Math.random()*(top-bottom))+bottom;
}
function randomPosNegFloat(number) {
    return (Math.random() - 0.5)*2* number;
}
function randomIntInlc(bottom,top) {
    return (Math.floor(Math.random()*(top-bottom+1)))+bottom;
}
function randomIntExlc(bottom,top){
    return (Math.floor(Math.random()*(top-bottom)))+bottom;
}

//declare colours
c.strokeStyle = "rgb(0,0,0,0.0)";
let colourArr = [
    "#0D3B66",
    "#FAF0CA",
    "#F4D35E",
    "#EE964B",
    "#F95738",
];
//decalre mouse object
let mouse = {
    x: null,
    y: null
};

//declare mousemove lister
window.addEventListener("mousemove",function(event){
    //console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
});

//declare window resize
window.addEventListener("resize", function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

//declare circle parameters
const maxRadius = 40;

//declare circle object constructor
function Circle(x, y, dx, dy, r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minR = r;
    this.colourFill = colourArr[randomIntExlc(0,colourArr.length)];

    this.draw = function(){
        c.strokeStyle = "rgb(0,0,0,0.0)";
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,2*Math.PI,false);
        c.stroke();
        c.fillStyle = this.colourFill;
        c.fill();
    }

    this.update = function(){
        //bouncing off walls
        if (this.x+this.r > innerWidth || this.x-this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y+this.r > innerHeight || this.y-this.r < 0){
            this.dy = -this.dy;
        }
    
        //next frame position
        this.x += this.dx;
        this.y += this.dy;

        //mouse interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.r < maxRadius){
                this.r += 1;
            }
        } else if (this.r > this.minR) {
            this.r -= 1;
        }

        this.draw();
    }
}


//generate circles
let x,y,dx,dy,r;
let circleArr = [];
const baseSpeed = 1.5;



function init(){
    circleArr = [];
    for (let i=0; i < 700; i++){
        r = randomIntInlc(2,5);
        x = randomFloat(r,innerWidth-r);
        y = randomFloat(r,innerHeight-r);
        dx = randomPosNegFloat(baseSpeed);
        dy = randomPosNegFloat(baseSpeed);
        circleArr.push(new Circle(x,y,dx,dy,r));
    }
}


//declare the animation function
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    
    for (let i=0; i<circleArr.length; i++){
        circleArr[i].update();
    }


}

//call init() for the first time
init();

//call the animate() for the first time
animate();