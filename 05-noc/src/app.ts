//Seteamos el proyecto con ts-node-dev:
// https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b
import "reflect-metadata";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase, LogModel } from "./data/mongo";
import { Server } from "./presentation/server";
import { AppDataSource } from "./config/plugins/typeorm.plugin";
import { PostgresDatabase } from "./data/postgres/init";
import { Level, Log } from "./data/postgres/models/log.entity";

// import { Level, Log } from "./data/postgres/models/log.entity";
// Tambien se pudo haber hecho con nodemon:
// https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01

/**
 * Hecho con Clean Architecture y Repository Pattern, Adapter, DRY y Clean Code.
 */

(async () => {
  main();
})();

async function main() {
  // ---------------------------MONGO---------------------------------
  //Conectamos a mongo con la clase que creamos
  // await MongoDatabase.connect({
  //   mongoUrl: envs.MONGO_URL,
  //   dbName: envs.MONGO_DB_NAME,
  // });

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

  // READ (Get all Logs from Mongo)
  // const logs = await LogModel.find();
  // console.log(logs);


  // ---------------------------POSTGRES---------------------------------
  //Conectamos a Postgres
  // await PostgresDatabase.connect();
  
  //Create Log para guardar en Postgres
  // const log = new Log();
  // log.message = "New Log 6 from TypeORM";
  // log.origin = "app.ts";
  // log.level = Level.MEDIUM;
  // log.createdAt = new Date();
  // await AppDataSource.manager.save(log);
  // console.log("Saved a new Log!");

  //READ (Get all Logs from Postgres)
  // console.log("Loading logs from the database...");
  // const logs = await AppDataSource.manager.find(Log,{
  //   where:{
  //     level:Level.MEDIUM
  //   }
  // });
  // console.log("Loaded logs: ", logs);

  // ---------------------------SERVER---------------------------------
  //Iniciamos el servidor
  Server.start();
}
