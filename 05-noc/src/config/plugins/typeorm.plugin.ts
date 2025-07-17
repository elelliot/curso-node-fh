import { DataSource } from "typeorm";
import { envs } from "../../config/plugins/envs.plugin";
import { Log } from "../../data/postgres/models/log.entity";

//Plugin de DataSource para TypeORM
export const AppDataSource = new DataSource({
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