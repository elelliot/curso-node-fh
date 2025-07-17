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
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // ---------------------------POSTGRES---------------------------------
  await PostgresDatabase.connect();
  // ---------------------------SERVER---------------------------------
  //Iniciamos el servidor
  Server.start();
}
