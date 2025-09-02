import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {
  // Nombres validos para crear subcarpetas
  static validTypes(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      // const type = req.params.type; // Esto no funciona por que la ruta aun no esta definida (aun no sabe que es /:type), por eso será 'undefined'.

      // Solucion: desde el middleware, usando req.url, recuperamos el param
      const type = req.url.split("/").at(2) ?? "";
      // Validamos para poder crear subcarpetas
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: `Invalid type ${type}. Valid types are: ${validTypes}`,
        });
      }

      next();
    };
  }
}
