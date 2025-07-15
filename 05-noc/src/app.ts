//Seteamos el proyecto con ts-node-dev:
// https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b
// import { envs } from "./config/plugins/envs.plugin";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

// Tambien se pudo haber hecho con nodemon:
// https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01

/**
 * Hecho con Clean Architecture y Repository Pattern, Adapter, DRY y Clean Code.
 */

(async () => {
  main();
})();

async function main() {
  //Conectamos a mongo con la clase que creamos
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // CREATE
  // Crear una collecion = tablas, documento = registro, pero se crea una instancia del objecto que queremos guardar
  // const newLog = await LogModel.create({
  //   message: "Test Message desde Mongo 3",
  //   origin: "App.ts",
  //   level: "medium",
  // });

  // Aqui es donde se guarda ese objeto en la coleccion
  // await newLog.save();
  // console.log(newLog);

  // READ (Get all Logs)
  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
  // console.log(process.env);
  // console.log(envs);
}
