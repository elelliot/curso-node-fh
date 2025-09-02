import { NextFunction, Request, Response } from "express";

export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    // Validamos que venga un archivo (recordar que req.files es un objeto si viene solo uno, o un array si vienen varios archivos)
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were selected." });
    }

    // -----> files (con s) es por el middleware de express, file (sin s) es el nombre que nosotros le dimos en el form-data

    // Si `file` no es un arreglo (Por tanto el objeto con la data de la imagen)
    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file]; // Lo colocamos en req.body.files como un arreglo (Asi podremos obtenerlo del body, mas facil)
    } else {
      req.body.files = req.files.file; // Si ya es un arreglo, lo asignamos directamente
    }

    next();
  }
}
