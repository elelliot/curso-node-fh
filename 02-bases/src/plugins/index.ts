/*
Como tenemos algunas importaciones del mismo directorio, 
podemos crear un archivo de barril: index.js 
en el directorio plugins y exportar todo lo que necesitamos desde aqui
*/
// const { getUUID } = require("../plugins/get-id.plugin");
// const { getAge } = require("../plugins/get-age.plugin");
// const { http } = require("../plugins/http-client.plugin");
// const buildLogger = require("../plugins/logger.plugin");

// module.exports = {
//   getAge,
//   getUUID,
//   http,
//   buildLogger,
// };


//Ahora con typescript exportamos de esta forma...
export { getAge } from "./get-age.plugin"
export { getUUID } from "./get-id.plugin"
export { httpClientPlugin as httpClient } from "./http-client.plugin"
export { buildLogger } from "./logger.plugin"