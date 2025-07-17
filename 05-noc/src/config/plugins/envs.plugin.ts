import "dotenv/config"; //Para poder usar las variables de entorno
import * as env from "env-var"; //Para poder validar las variables de entorno

//Gracias a dotenv, podemos usar las variables de entorno en el proyecto.
//Gracias a env-var podemos validar las variables de entorno y tambien tenemos el tipo de dato que esperamos.
export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  MAILER_EMAIL_RECEIVER: env
    .get("MAILER_EMAIL_RECEIVER")
    .required()
    .asEmailString(),
  PROD: env.get("PROD").required().asBool(),

  //Mongo DB
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),

  //Postgres DB
  POSTGRES_HOST: env.get("POSTGRES_HOST").required().asString(),
  POSTGRES_PORT: env.get("POSTGRES_PORT").required().asPortNumber(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
};
