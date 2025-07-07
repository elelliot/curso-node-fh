//Seteamos el proyecto con ts-node-dev:
// https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b

import { Server } from "./presentation/server";

// Tambien se pudo haber hecho con nodemon:
// https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01

//Hecho con Clean Architecture y Repository Pattern

(async () => {
  main();
})();

function main() {
  Server.start();
}
