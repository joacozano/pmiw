let spritePig = [];
let fondos = [];
let posX, posY, vel;
let animar;
let fondoActual;
let estado; // 'quieto' o 'caminar'
let velocidadAnim; // cada cuántos frames cambia de imagen

function preload() {
  for (let i = 0; i < 8; i++) {
    spritePig[i] = loadImage("data/pig_" + i + ".png");
  }
  for (let i = 0; i < 13; i++) {
    fondos[i] = loadImage("data/fondo_" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  velocidadAnim = 8;
  reiniciar();
}

function draw() {
  image(fondos[fondoActual], 0, 0, width, height);
  actualizarEstado();

  if (estado === 'caminar') {
    posX += vel;
    if (frameCount % velocidadAnim === 0) {
      animar = siguienteFrame(animar, spritePig.length);
    }
  } else {
    animar = 0; // pig_0.png = el cerdito acostado
  }

  dibujarPersonaje(spritePig[animar], posX, posY);

  if (posX > width) {
    cambiarFondo();
    posX = -160; // reaparece por la izquierda
  }
}

function actualizarEstado() {
  if (keyIsDown(68)) { // tecla D
    estado = 'caminar';
  } else {
    estado = 'quieto';
  }
}

// Función propia CON PARÁMETRO que RETORNA un valor: calcula el próximo
// índice de frame dentro del ciclo de caminar (nunca vuelve al 0 = acostado).
function siguienteFrame(actual, cantidadFrames) {
  let siguiente = actual + 1;
  if (siguiente >= cantidadFrames) {
    siguiente = 1;
  }
  return siguiente;
}

// Función propia con parametros: dibuja el personaje
function dibujarPersonaje(sprite, x, y) {
  image(sprite, x, y, 160, 108);
}

function cambiarFondo() {
  fondoActual = (fondoActual + 1) % fondos.length;
}

// Vuelve todo al estado inicial: posición, animación y fondo.
function reiniciar() {
  posX = 50;
  posY = height - 150;
  vel = 4;
  animar = 0;
  fondoActual = 0;
  estado = 'quieto';
}
//tecla R reinicia el programa
function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciar();
  }
  if (key === '+') {
    velocidadAnim = max(2, velocidadAnim - 1); // animación más rápida
  }
  if (key === '-') {
    velocidadAnim += 1; // animación más lenta
  }
}
