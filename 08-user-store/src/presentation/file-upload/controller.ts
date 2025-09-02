import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

// Express recomienda que no usemos async/await en los controladores, sino que usemos promesas

// Las routes solo llaman a los controller.
// Nuestro controller llama al servicio.
// El Servicio realiza toda la logica
export class FileUploadController {
  // DI
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type; // Ya viene validado por su middleware (type.middleware.ts)
    const file = req.body.files.at(0) as UploadedFile; // Ahora con el middleware (file-upload.middleware.ts), podemos recuperar el archivo desde req.body.files, y como siempre sera un array aunque sea con un solo elemento, accedemos unico archivo dentro

    this.fileUploadService
      .uploadSingleFile(file, `uploads/${type}`) // Guardamos en uploads/<type>, si no enviamos nada, se guarda en uploads (default)
      .then((uploaded) => res.json({ uploaded }))
      .catch((error) => this.handleError(error, res));
  };

  uploadMultipleFiles = (req: Request, res: Response) => {
    const type = req.params.type; // Ya viene validado por su middleware (type.middleware.ts)
    const files = req.body.files as UploadedFile[]; // Recuperamos en el body gracias al middleware.

    this.fileUploadService
      .uploadMultipleFiles(files, `uploads/${type}`) // Guardamos en uploads/<type>, si no enviamos nada, se guarda en uploads (default)
      .then((uploaded) => res.json({ uploaded }))
      .catch((error) => this.handleError(error, res));
  };
}
