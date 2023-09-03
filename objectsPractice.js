alert("JS Loaded")

function Human(name,height){
    let ppp = {}
    ppp.name  = name
    ppp.height = height
    ppp.getName = function (){return "My Name Is " + this.name}
    ppp.setName = function (x){this.name = x}
    return ppp
}

function constructorDemo(){
    let Will = new Human("William", "190")
    alert("test name: " + Will.name)
    alert("Name1: " + Will.getName())
    Will.setName("God")
    alert("Name2: " + Will.getName())
}



const startBtn = document.getElementById("start-btn")
startBtn.addEventListener("click", function(){
    constructorDemo()
})