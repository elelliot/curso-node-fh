import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

//Podemos adaptar las librerias con clases u objetos
export class JwtAdapter {
  // Ocupamos DI ?

  /* El payload es la data en la que nos vamos a basar para crear el token
     Si queremos suscribirnos o escuchar cuando ya tenemos el token, 
     podemos retornar una promesa y correr la funcion de generar tokens dentro
  */
  static async generateToken(
    payload: any,
    duration: StringValue | number = "2h"
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null); // Podriamos mandar el reject, pero lo hacemos asi
        return resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    return 0;
  }
}
