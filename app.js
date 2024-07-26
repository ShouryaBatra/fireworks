let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let canvasWidth;
let canvasHeight;
var shells = [];
var pass = [];

var colors = ['ff5252', '#ff4081', '#e040fb', '#7c4dff', '#53dff', '#40cdff', '#18ffff', '#64ffda','#69f0ae','#b2fff59']

window.onresize = function() {
    reset();
}
reset();

function reset() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function newShell() {
    let left = (Math.random() > 0.5);
    let shell = {};
    shell.x = (1*left);
    shell.y = 1;
}