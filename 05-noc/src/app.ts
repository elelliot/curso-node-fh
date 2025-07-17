//Seteamos el proyecto con ts-node-dev:
// https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b
import "reflect-metadata";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

import { DataSource } from "typeorm";
import { Level, Log } from "./entity/Log";
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

  // READ (Get all Logs)
  // const logs = await LogModel.find();
  // console.log(logs);

  //DataSource para TypeORM
  const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.POSTGRES_HOST,
    port: envs.POSTGRES_PORT,
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Log],
    migrations: [],
    subscribers: [],
  });

  //Iniciamos La base de datos de Postgres con TypeORM
  AppDataSource.initialize()
    .then(async () => {
      console.log("Inserting a new log into the database...");
      const user = new Log();
      user.message = "Test Message from TypeORM";
      user.origin = "App.ts";
      user.level = Level.LOW;
      user.createdAt = new Date();
      await AppDataSource.manager.save(user);
      console.log("Saved a new Log!");

      console.log("Loading logs from the database...");
      const logs = await AppDataSource.manager.find(Log);
      console.log("Loaded logs: ", logs);

      console.log(
        "Here you can setup and run express / fastify / any other framework."
      );
    })
    .catch((error) => console.log(error));

  //Iniciamos el servidor
  // Server.start();
  // console.log(process.env);
  // console.log(envs);
}
