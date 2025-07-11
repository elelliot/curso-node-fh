import 'dotenv/config' //Para poder usar las variables de entorno
import * as env from 'env-var'; //Para poder validar las variables de entorno

//Gracias a dotenv, podemos usar las variables de entorno en el proyecto.
//Gracias a env-var podemos validar las variables de entorno y tambien tenemos el tipo de dato que esperamos.
export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
}