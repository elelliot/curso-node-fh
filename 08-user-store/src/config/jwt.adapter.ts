import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { envs } from "./envs";

// Esto puede ser inyectado de alguna manera pero de momento esta siendo una dependencia semi oculta
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

  static validateToken<T>(token: string): Promise<T | null> {
    /* Validamos el Token que recibimos en 'api/auth/validate-email/:token'
    1- El token fue creado a partir del correo.
    2- Al ser valido el token, devolvemos lo que fue descifrado (el correo)
       
    */
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        // 'decoded' es el payload con el que se creo el token, en este caso el correo.
        resolve(decoded as T);
      });
    });
  }
}
