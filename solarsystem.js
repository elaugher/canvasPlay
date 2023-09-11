"use strict";  

function animateSS(){
    const canvas = document.getElementById("solar-system-canvas");
    canvas.width = 450;
    canvas.height = 400;
    const c = canvas.getContext("2d");

    //clear canvas and draw background
    c.clearRect(0,0,450,400);
    c.fillStyle = "darkblue";
    c.fillRect(0,0,450,400);
    c.save();

    //draw the sun
    c.translate(220,200);
    c.fillStyle = "yellow";
    c.beginPath();
    c.arc(0,0,15,0,Math.PI*2,true);
    c.fill();

    //scaling the solar system
    //c.scale(1.1,1);

    ///draw earth orbit
    c.strokeStyle = "black";
    c.beginPath();
    c.arc(0,0,150,0,Math.PI*2,true );
    c.stroke();
    

    //comput current time in seconds, including milliseconds
    let now = new Date();
    let seconds = ((now.getSeconds() * 1000) + now.getMilliseconds()) / 1000;

    //calculating the earth's location
    //draw by rotating the context once very 60 seconds
    let anglePerSecond = ((Math.PI *2) /60);
    c.rotate(anglePerSecond * seconds); //this rotates the whole canvas
    c.translate(150,0); //this pushes the origin to x=150 where the orbit line was drawn
    
    //draw the earth
    c.fillStyle = "green";
    c.beginPath();
    c.arc(0,0,10,0, Math.PI*2,true);
    c.fill();

    //calculating the moon location
    //calculating the moon rotation
    anglePerSecond = ((Math.PI *2) /60)*12;
    c.rotate(anglePerSecond * seconds);
    c.translate(0,35);

    //draw the moon
    c.fillStyle = "white";
    c.beginPath();
    c.arc(0,0,5,0,Math.PI *2, true);
    c.fill();

    c.resetTransform();
    c.translate(220,200);
    //marcury
    anglePerSecond = ((Math.PI *2) /60)*4;
    c.rotate(-anglePerSecond*seconds);
    c.translate(-90,0);
    c.fillStyle = "orange";
    c.beginPath();
    c.arc(0,0,9,0,Math.PI*2,true);
    c.fill();


    c.restore();

}

setInterval(animateSS,100); //call every 100 milliseconds


