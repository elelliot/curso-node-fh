console.log("Inicio de programa");

setTimeout(() => {
  console.log("Primer Timeout");
}, 3000);

setTimeout(() => {
  console.log("Segundo Timeout");
}, 1);

setTimeout(() => {
  console.log("Tercer Timeout");
}, 0);

console.log("Fin de programa");

/*
Inicio de programa
Fin de programa
Segundo Timeout
Tercer Timeout
Primer Timeout
*/

// Si al 2do le pongo delay de 100
/*
Inicio de programa
Fin de programa
Tercer Timeout
Segundo Timeout
Primer Timeout
*/

// Si al 2do le pongo delay de 1 (Puede variar el orden de ejecucion, el 2do (de 1ms) se puede ejecutar antes que el 3ro (de 0ms))
//Why?
