const winston = require("winston");
const { combine, timestamp, json } = winston.format

const logger = winston.createLogger({
  level: "info",
  // format: winston.format.json(),
  format: combine(
    timestamp(), //agrega timestamp a los logs que creamos desde aqui
    json()
  ),
  // defaultMeta: { service: "user-service" }, //'user-service' overridea al app.js que usamos, por eso lo quitamos aqui
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//Para mostrar los logs en la consola si no estamos en producción
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

//Default export
module.exports = function buildLogger(service) {
  return {
    log: (message) => logger.log("info", { message, service }),
    //podemos evitarnos poner la fecha manualmente con new Date().toISOString() y usar el timestamp de winston
    // error: (message) => logger.error("error", { message, service, at: new Date().toISOString() }),
    error: (message) => logger.error("error", { message, service, }),
  };
};
