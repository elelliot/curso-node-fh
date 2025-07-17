import { AppDataSource } from "../../config/plugins/typeorm.plugin";


//Iniciamos La base de datos de Postgres con TypeORM
export class PostgresDatabase {
  static async connect() {

    try {
        console.log("Connecting to Postgres DB...");
        await AppDataSource.initialize()
        console.log("Postgres DB Connected");

    } catch (error) {
      console.log("Rip Postgres Connection");
    }
  }
}
