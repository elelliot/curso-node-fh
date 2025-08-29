import { Request, Response } from "express";
import { CustomError } from "../../domain";

// Express recomienda que no usemos async/await en los controladores, sino que usemos promesas

// Las routes solo llaman a los controller.
// Nuestro controller llama al servicio.
// El Servicio realiza toda la logica
export class FileUploadController {
  // DI
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  uploadFile = (req: Request, res: Response) => {
    res.json("Upload File");
  };

  uploadMultipleFiles = (req: Request, res: Response) => {
    res.json("Upload Multiple Files");
  };
}
