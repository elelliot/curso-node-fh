import fs from "fs";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  // Si no existe el directorio, lo crea
  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingleFile(
    file: UploadedFile,
    folder: string = "uploads", // Carpeta por default
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      // Validamos extension
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid file extension ${fileExtension}. Valid extensions are: ${validExtensions}`
        ); //No ocupamos hacer el join por que ya es un array y esta en el mensaje
      }

      // Ya que esto corre por cada archivo desde 'uploadMultipleFiles' podriamos optimizar esto para que solo verifique una vez si la carpeta existe
      const destination = path.resolve(__dirname, "../../../", folder); //Desde este folder, subimos los niveles necesarios para llegar a la raiz del proyecto en 'uploads' y nos devuelve el path
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`; // Nombre único para que no haya conflictos

      file.mv(`${destination}/${fileName}`); // Mueve el archivo a la carpeta de destino

      return { fileName };
    } catch (error) {
      throw error;
    }
  }
  async uploadMultipleFiles(
    files: UploadedFile[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    // Llamamos a uploadSingleFile por cada archivo, y esperamos a que todas las promesas se resuelvan
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingleFile(file, folder, validExtensions))
    );

    return fileNames;
  }
}
