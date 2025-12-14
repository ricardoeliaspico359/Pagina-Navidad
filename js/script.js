// Mensaje navideño al cargar la página
window.onload = function () {
    console.log("🎄 Feliz Navidad te desea Ricardo Pico 🎄");
};


// ❄️ EFECTO DE NIEVE EN PANTALLA COMPLETA

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const copos = [];
const cantidad = 120;

for (let i = 0; i < cantidad; i++) {
    copos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() * cantidad
    });
}

let angulo = 0;

function dibujarNieve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    for (let i = 0; i < cantidad; i++) {
        const c = copos[i];
        ctx.moveTo(c.x, c.y);
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true);
    }

    ctx.fill();
    actualizarNieve();
}

function actualizarNieve() {
    angulo += 0.01;

    for (let i = 0; i < cantidad; i++) {
        const c = copos[i];

        c.y += Math.cos(angulo + c.d) + 1 + c.r / 2;
        c.x += Math.sin(angulo) * 0.5;

        if (c.y > canvas.height) {
            copos[i] = {
                x: Math.random() * canvas.width,
                y: 0,
                r: c.r,
                d: c.d
            };
        }
    }
}

setInterval(dibujarNieve, 33);

// 🎄 CONTADOR PARA NAVIDAD

const fechaNavidad = new Date(new Date().getFullYear(), 11, 25, 0, 0, 0);

function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaNavidad - ahora;

    if (diferencia <= 0) {
        document.querySelector(".contador h2").textContent =
            "🎄 ¡Feliz Navidad! 🎄";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarContador, 1000);
actualizarContador();
