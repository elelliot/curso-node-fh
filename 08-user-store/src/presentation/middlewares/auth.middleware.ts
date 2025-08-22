// El middleware es una funcion que corre antes que se ejecute el controlador de una ruta

import { NextFunction, Request, Response } from "express";

// El middleware no es regla de negocio, por eso no lo ponemos en domain o infrastructure

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // Tomamos el 'Bearer Token' desde Headers -> Authorization del request header
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });

    // Debe empezar con `Bearer ` (Incluido el espacio por que despues va el Token)
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(1) || ""; // En vez de [1] ahora tenemos el metodo

    try {
    } catch (error) {
      console.log(error); //Idealmente usariamos un logger (winston, etc.)
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
