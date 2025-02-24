// const { buildLogger } = require("./plugins/index");

//Ahora importamos el logger de la forma moderna
import { getPokemonNameById } from "./js-foundation/06-promises";
import { buildLogger } from "./plugins/logger.plugin";

const logger = buildLogger("app.js"); //app.js es el servicio (El archivo que loggea)

logger.log("Hola mundo"); //Al llamar a logger, se crean los logs en los archivos error.log y combined.log (si no existen, se crean)
logger.error('Esto es algo malo')


getPokemonNameById(1)
  .then((pokemon) => console.log(pokemon))
  //El error que yo regrese en la funcion, lo recibo aqui en el catch
  .catch((err) => console.log(err))
  .finally(() => console.log("Pokemon API call finished"));