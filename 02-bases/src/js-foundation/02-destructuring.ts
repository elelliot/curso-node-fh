//El process tiene mucha informacion de la compu, procesos , librerias, versiones de node, argumentos etc.
//Es un proceso de Node
// console.log(process.env);

const { SHELL, HOMEBREW_PREFIX, npm_lifecycle_script } = process.env;

// console.table({ SHELL, HOMEBREW_PREFIX,npm_lifecycle_script });

export const characters = ["Flash", "Superman", "Green Lantern", "Batman"];

const [, , batman] = characters; //Breakpoint podemos darle click a la izquierda para que se detenga en esa linea

// console.log(batman);  //Puedo ir al package.json y dar click al boton de debug y despues 'dev' o al ambiente que quiera, y se detendra en el breakpoint
