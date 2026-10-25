
/* ========================================
   INVITACIÓN Y BOTONES INICIALES
======================================== */

const invitacion = document.getElementById("invitacion");
const portada = document.getElementById("portada");
const botonSi = document.getElementById("botonSi");
const botonNo = document.getElementById("botonNo");
const nota = document.getElementById("nota");
const cancion = document.getElementById("cancion");

const mensajes = [
    "¿Segurísimo?",
    "Mmm... yo no confiaría en ese botón",
    "¡Uy, casi! JAJAJA",
    "El destino dice que sí",
    "Ese botón te tiene miedo"
];

let intentos = 0;

if (botonSi && invitacion && portada) {
    botonSi.addEventListener("click", () => {
        invitacion.classList.add("oculto");
        portada.classList.remove("oculto");

        if (cancion) {
            cancion.play().catch(() => {
                // La página sigue funcionando si no se puede reproducir.
            });
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

if (botonNo) {
    botonNo.addEventListener("pointerenter", (evento) => {
        if (evento.pointerType === "touch") return;
        escaparBoton();
    });

    botonNo.addEventListener("click", (evento) => {
        evento.preventDefault();
        escaparBoton();
    });
}

function escaparBoton() {
    if (!botonNo || !nota) return;

    nota.textContent = mensajes[intentos % mensajes.length];
    intentos++;

    const tarjeta = botonNo.closest(".invitacion");
    if (!tarjeta) return;

    tarjeta.style.position = "relative";

    const margen = 18;
    const anchoDisponible = tarjeta.clientWidth;
    const altoDisponible = tarjeta.clientHeight;
    const botonAncho = botonNo.offsetWidth;
    const botonAlto = botonNo.offsetHeight;

    const maxX = Math.max(
        margen,
        anchoDisponible - botonAncho - margen
    );

    const maxY = Math.max(
        margen,
        altoDisponible - botonAlto - margen
    );

    botonNo.style.position = "absolute";
    botonNo.style.left =
        `${margen + Math.random() * Math.max(0, maxX - margen)}px`;
    botonNo.style.top =
        `${margen + Math.random() * Math.max(0, maxY - margen)}px`;
    botonNo.style.zIndex = "10";
}

/* ========================================
   CAPÍTULOS Y FOTOGRAFÍAS
======================================== */

const recuerdos = [
    {
        titulo: "El comienzo",
        texto: "Me encanta poder haber sido tu amiga antes de que sucediera todo, pasar tiempo juntos y sentir como cada día teníamos un nuevo avance, aunque fuera pequeño.",
        imagen: "img/rio/foto-rio.jpg"
    },
    {
        titulo: "Nuestros momentos",
        texto: "Me encanta como es ahora mi vida a tu lado, despertarme y saber que te tengo. Cada conversación, cada salida, cada palabra, cada beso, cada ataque de risa, cada caricia y cada momento que te tenga junto a mí, me motiva a ver la vida desde una perspectiva más linda, más suave, más tierna, más agradecida...",
        imagen: "img/momentos/foto-momentos.jpg"
    },
    {
        titulo: "Nuestros tres meses",
        texto: "Hoy celebramos tres meses de noviazgo, pero celebremos también todas esas experiencias preciosas que hemos vivido desde el día uno. Deseo tenerte hasta el fin de mis días y, si me lo permites, amarte bien porque te mereces todo el amor del mundo y más. Eres una persona única, excepcional, tienes un impacto tan grande en los demás, desearía que lo pudieras ver, lo importante que eres para el mundo... para mí, prometo valorarte y quererte hasta mi último aliento",
        imagen: "img/tres-meses/foto-tres-meses.jpg"
    }
];

const tarjetasRecuerdo = document.querySelectorAll(".recuerdo-card");
const detalleRecuerdo = document.getElementById("recuerdoDetalle");
const tituloRecuerdo = document.getElementById("recuerdoTitulo");
const textoRecuerdo = document.getElementById("recuerdoTexto");
const fotoRecuerdo = document.getElementById("fotoRecuerdo");
const cerrarRecuerdo = document.getElementById("cerrarRecuerdo");

if (
    detalleRecuerdo &&
    tituloRecuerdo &&
    textoRecuerdo &&
    fotoRecuerdo
) {
    tarjetasRecuerdo.forEach((tarjeta) => {
        tarjeta.addEventListener("click", () => {
            const indice = Number(tarjeta.dataset.recuerdo);
            const recuerdo = recuerdos[indice];

            if (!recuerdo) return;

            tituloRecuerdo.textContent = recuerdo.titulo;
            textoRecuerdo.textContent = recuerdo.texto;
            fotoRecuerdo.src = recuerdo.imagen;
            fotoRecuerdo.alt = recuerdo.descripcion;

            detalleRecuerdo.classList.remove("oculto");

            detalleRecuerdo.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    });
}

if (cerrarRecuerdo && detalleRecuerdo) {
    cerrarRecuerdo.addEventListener("click", () => {
        detalleRecuerdo.classList.add("oculto");
    });
}


/* ========================================
   RAMO PIXEL ART: SORPRESA ANIMADA
======================================== */

(() => {
    const canvas = document.getElementById("bouquetCanvas");
    const boton = document.getElementById("botonRamo");
    const contenedor = document.getElementById("contenedorRamo");
    const botonVolver = document.getElementById("botonVolverInicio");
    const invitacion = document.getElementById("invitacion");

    if (!canvas || !boton || !contenedor) return;

    const ctx = canvas.getContext("2d");
    const pixel = 6;
    const cols = 64;
    const rows = 76;

    canvas.width = cols * pixel;
    canvas.height = rows * pixel;

    const dibujo = document.createElement("canvas");
    dibujo.width = canvas.width;
    dibujo.height = canvas.height;

    const g = dibujo.getContext("2d");

    function bloque(x, y, color, w = 1, h = 1) {
        g.fillStyle = color;
        g.fillRect(x * pixel, y * pixel, w * pixel, h * pixel);
    }

    // Tallos
    for (let y = 27; y < 54; y++) {
        bloque(30, y, "#31583b", 2, 1);
        if (y > 34 && y < 49) {
            bloque(32, y, "#527b50");
        }
    }

    // Hojas
    const hojas = [
        [20, 30, 1], [18, 31, 2], [16, 32, 3], [19, 33, 3],
        [23, 35, 2], [25, 36, 2], [27, 37, 2],
        [36, 30, 2], [38, 29, 2], [40, 28, 3], [37, 32, 3],
        [34, 35, 2], [32, 38, 2], [25, 42, 3], [22, 43, 3],
        [35, 42, 3], [38, 40, 3], [40, 39, 2], [28, 46, 2],
        [34, 47, 2], [25, 49, 2], [36, 50, 2]
    ];

    hojas.forEach(([x, y, w]) => {
        bloque(x, y, "#31583b", w, 2);
        bloque(x, y + 1, "#71935a", w - 1, 1);
    });

    // Flores
    function flor(cx, cy, color, luz, centro, escala = 1) {
        bloque(cx - 2 * escala, cy - 3 * escala,
            color, 4 * escala, 2 * escala);
        bloque(cx - 3 * escala, cy - 2 * escala,
            color, 2 * escala, 4 * escala);
        bloque(cx + 2 * escala, cy - 2 * escala,
            color, 2 * escala, 4 * escala);
        bloque(cx - 2 * escala, cy + 2 * escala,
            color, 4 * escala, 2 * escala);
        bloque(cx - 2 * escala, cy - 2 * escala,
            luz, 4 * escala, 4 * escala);
        bloque(cx - escala, cy - escala,
            centro, 2 * escala, 2 * escala);
    }

    flor(17, 15, "#a71945", "#ed7899", "#ffe2b5", 2);
    flor(31, 10, "#d64d78", "#ffb4ca", "#fff0c5", 2);
    flor(45, 16, "#8e2046", "#d9577d", "#ffd8df", 2);
    flor(23, 24, "#fff0d8", "#ffffff", "#e9a947", 2);
    flor(38, 25, "#c52e5b", "#f58eaa", "#ffe0d5", 2);
    flor(13, 31, "#b72d55", "#f08ba8", "#fff0c5", 2);
    flor(49, 30, "#fff0d8", "#ffffff", "#e9a947", 2);
    flor(30, 31, "#d64d78", "#ffabc2", "#fff0d8", 2);
    flor(22, 19, "#ef9ab5", "#ffd4df", "#fff0c5", 1);
    flor(42, 21, "#b72d55", "#ee7898", "#ffe0d5", 1);
    flor(17, 25, "#f0a5bc", "#ffd4df", "#fff0c5", 1);
    flor(46, 25, "#e9678c", "#ffc1d2", "#ffe0d5", 1);

    // Flores pequeñas
    [
        [26, 14], [36, 17], [12, 21], [51, 22], [29, 20],
        [20, 28], [43, 32], [35, 34], [16, 35], [47, 36],
        [25, 38], [40, 37], [31, 40], [20, 42], [44, 43]
    ].forEach(([x, y], i) => {
        const color = i % 2 ? "#f3a6bf" : "#fff0d8";
        bloque(x, y, color, 2, 2);
        bloque(x + 1, y + 1, "#e9a947");
    });

    // Envoltorio
    [
        [15, 43, 34], [13, 45, 38], [11, 47, 42],
        [13, 49, 38], [16, 51, 32], [19, 53, 26],
        [23, 55, 18]
    ].forEach(([x, y, w]) => {
        bloque(x, y, "#f8dce2", w, 2);
    });

    // Pliegues del papel
    bloque(13, 45, "#d98caa", 2, 6);
    bloque(49, 45, "#d98caa", 2, 6);
    bloque(19, 51, "#edb9c8", 3, 3);
    bloque(39, 51, "#edb9c8", 3, 3);
    bloque(25, 54, "#fff0f0", 2, 3);
    bloque(35, 54, "#fff0f0", 2, 3);

    // Lazo y cintas
    bloque(22, 55, "#8e2046", 7, 4);
    bloque(35, 55, "#8e2046", 7, 4);
    bloque(20, 56, "#b72d55", 4, 3);
    bloque(42, 56, "#b72d55", 4, 3);
    bloque(27, 56, "#c83c63", 10, 4);
    bloque(30, 57, "#f08ba8", 4, 2);

    bloque(25, 59, "#a71945", 5, 9);
    bloque(26, 60, "#d64d78", 3, 7);
    bloque(36, 59, "#a71945", 5, 9);
    bloque(37, 60, "#d64d78", 3, 7);

    bloque(25, 68, "#a71945", 2, 2);
    bloque(28, 67, "#a71945", 2, 3);
    bloque(36, 67, "#a71945", 2, 3);
    bloque(39, 68, "#a71945", 2, 2);

    // Tallos debajo del ramo
    bloque(29, 59, "#31583b", 2, 12);
    bloque(33, 59, "#527b50", 2, 10);
    bloque(31, 61, "#31583b", 2, 10);

    // Destellos
    [
        [8, 11], [53, 10], [8, 39], [54, 40],
        [12, 7], [49, 7], [9, 52], [53, 53]
    ].forEach(([x, y]) => {
        bloque(x, y, "#f3a6bf", 2, 2);
        bloque(x + 2, y - 2, "#ffe8b7", 2, 2);
    });

    let fila = 0;
    let animacion = null;
    let abierto = false;

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const alto = Math.min(fila, rows) * pixel;

        if (alto > 0) {
            ctx.drawImage(
                dibujo,
                0, 0, dibujo.width, alto,
                0, 0, canvas.width, alto
            );
        }

        if (fila < rows) {
            fila++;
            animacion = requestAnimationFrame(dibujar);
        } else {
            animacion = null;
        }
    }

    function mostrarRamo() {
        if (abierto) return;

        abierto = true;
        boton.classList.add("oculto");
        contenedor.classList.remove("oculto");

        fila = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (animacion !== null) {
            cancelAnimationFrame(animacion);
        }

        dibujar();

        contenedor.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    boton.addEventListener("click", mostrarRamo);


    if (botonVolver) {
        botonVolver.addEventListener("click", () => {
            // Ocultar el ramo y reiniciar la sorpresa
            contenedor.classList.add("oculto");
            boton.classList.remove("oculto");
            abierto = false;
            fila = 0;

            if (animacion !== null) {
                cancelAnimationFrame(animacion);
                animacion = null;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ocultar la portada y mostrar la invitación principal
            const portada = document.getElementById("portada");

            if (portada) {
                portada.classList.add("oculto");
            }

            if (invitacion) {
                invitacion.classList.remove("oculto");
            }

            // Regresar arriba, al inicio de la página
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    contenedor.classList.add("oculto");
})();
