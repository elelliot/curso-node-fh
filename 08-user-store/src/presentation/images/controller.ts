import fs from "fs";
import path from "path";
import { Request, Response } from "express";

// Como no es mucho, no necesitamos un service, lo hacemos aqui en el controller
export class ImageController {
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { type = "", img = "" } = req.params;

    const imagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );
    console.log(imagePath);

    // Verificamos si no existe el path (existsSync)
    if (!fs.existsSync(imagePath)) {
      return res.status(404).send("Image not found");
    }

    res.sendFile(imagePath);
  };
}
