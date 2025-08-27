// El middleware es una funcion que corre antes que se ejecute el controlador de una ruta

import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

// El middleware no es regla de negocio, por eso no lo ponemos en domain o infrastructure

export class AuthMiddleware {
  /* 
  Validamos el JWT que fue creado a partir del ID del user y si encontramos un user,
  podemos pasar al siguiente controlador o incluso middleware
  */
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // Tomamos el 'Bearer Token' desde Headers -> Authorization del request header
    const authorization = req.header("Authorization");
    // console.log(authorization);

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });

    // Debe empezar con `Bearer ` (Incluido el espacio por que despues va el Token)
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(1) || ""; // En vez de [1] ahora tenemos el metodo

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const user = await UserModel.findById(payload.id);
      // Si el token es valido pero por alguna razon el user no existe en la DB
      if (!user) return res.status(401).json({ error: "Invalid Token - User" });

      //-TODO: Validar si el user esta activo

      // Una vez validado el JWT y si encontramos al user, ahora cada request tendra al user
      req.body.user = UserEntity.fromObject(user);

      // Y procedemos al siguiente middleware o controlador
      next();
    } catch (error) {
      console.log(error); //Idealmente usariamos un logger (winston, etc.)
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
