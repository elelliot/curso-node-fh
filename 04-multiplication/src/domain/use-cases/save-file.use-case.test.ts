import fs from "fs";
import { afterEach, describe, expect, test } from "@jest/globals";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  afterEach(() => {
    fs.rmSync("outputs", { recursive: true }); //Eliminamos la carpeta outputs despues de cada test
  });

  test("Should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";

    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options); //Crea el archivo en el directorio outputs con el contenido test content

    /*Evaluamos si existe el archivo en outputs
    OJO: Hay que borrar './outputs' antes de cada test para evitar falsos positivos, lo hacemos con beforeEach */
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    //Evaluamos si el archivo se creo correctamente
    expect(result).toBeTruthy(); //.toBe(true) tambien aplica
    expect(checkFile).toBe(true); //Evaluamos si existe el archivo en outputs
    expect(fileContent).toBe(options.fileContent); //Evaluamos si el contenido del archivo es el esperado ('test content')
  });
});
