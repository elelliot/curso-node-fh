const { buildLogger } = require("./plugins/index");
const logger = buildLogger("app.js"); //app.js es el servicio (El archivo que loggea)

logger.log("Hola mundo"); //Al llamar a logger, se crean los logs en los archivos error.log y combined.log (si no existen, se crean)
logger.error('Esto es algo malo')