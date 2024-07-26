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
    shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1: -1);
    shell.yoff = 0.01 + Math.random() * 6 + 3;
    shell.size = Math.random() * 6 + 3;
    shell.color = colors[Math.floor(Math.random() * colors.length )];

    shells.push(shell);
}

function newPass(shell) {
    let pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

    for (i=0; i<pasCount; i++) {

        let pas = {};
        pas.x = shell.x * canvasWidth;
        pas.y = shell.y * canvasHeight;

        let a = Math.random() * 4;
        let s = Math.random() * 10;

        pas.xoff = s * Math.sin((5-a) * (Math.PI / 2))
        pas.yoff = s * Math.sin(a * (Math.PI / 2));

        pas.color = shell.color;
        pas.size = Math.sqrt(shell.size);

        if (pass.length < 1000) {
            pass.push(pas);
        }

    }
}

let lastRun = 0;
Run();
function Run() {
    let dt = 1;
    if (lastRun != 0) {
        dt = Math.min(50, (performance.now() - lastRun));
    }
    lastRun = performance.now();

    ctx.fillStyle = "rgba(0, 0, 0, 0, 25)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if ((shells.length < 10) && (Math.random() > 0.96)) {
        newShell();
    }

    for (let ix in shells) {
        let shell = shells[ix];

        ctx.beginPath();
        ctx.arc(shell.x * canvasWidth, shell.y * canvasHeight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= (shell.xoff * dt * 0.001);
        shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

        if (shell.yoff < -0.005) {
            newPass(shell);
            shells.splice(ix, 1);
        }
    }

    for (let ix in pass) {
        let pass = pass[ix];

    }
}