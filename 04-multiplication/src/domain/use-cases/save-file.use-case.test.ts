import fs from "fs";
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  //Usamos estas custom options para borrar la carpeta de custom-outputs despues de cada test
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/custom-folder",
    fileName: "custom-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    //Eliminamos la carpeta outputs despues de cada test
    const outputFolderExists = fs.existsSync("outputs");
    if (outputFolderExists) fs.rmSync("outputs", { recursive: true });

    //Eliminamos la carpeta custom-outputs despues de cada test
    const customOutputFolderExists = fs.existsSync(
      customOptions.fileDestination
    );
    if (customOutputFolderExists) {
      /*
        fs.rmSync(customOptions.fileDestination, { recursive: true });
      
        -Esto elimina custom-folder y el archivo en caso de que existan, pero no elimina custom-outputs (Las demas carpetas superiores)
          Ejemplo:
          1. Si tenemos -> custom-outputs/custom-folder/custom-table-name.txt
             Esto elimina -> custom-folder/custom-table-name.txt y queda -> custom-outputs/

          2. Si tenemos -> custom-outputs/1/custom-folder/custom-table-name.txt
             Esto elimina -> custom-folder/custom-table-name.txt y queda -> custom-outputs/1/

          Es decir, elimina el archivo y la carpeta del siguiente nivel solamente, no las demas carpetas superiores
        
        
      */
      const mainFolder = customOptions.fileDestination.split("/")[0]; //Para borrar todo, usamos el folder principal para hacer la eliminacion recursiva
      fs.rmSync(mainFolder, { recursive: true });
    }
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

  /*
  En este test, usamos customOptions y customFilePath afuera del scope del test para tambien manejar la eliminacion
  de la basura en el afterEach.
  */
  test("Should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, {
      encoding: "utf-8",
    });

    expect(result).toBeTruthy();
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  //Probando los errores, hay de 2, que falle el mkdirSync, y que falle el writeFileSync. Como simulamos la falla de esos metodos?
  test("Should return false if directory couldn't be created", () => {
    const saveFile = new SaveFile();

    //Usamos spyOn (ver get-age-plugin.test.ts para entender como funciona) para simular el error de mkdirSync
    // mockImplementation sobreescribe el comportamiento de la funcion mkdirSync por la implementacion que le pasemos, en este caso, un throw error
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Custom Error Message");
    });

    const result = saveFile.execute(customOptions); //Aqui ya se ejecuta el mkdirSync con el mockImplementation
    expect(result).toBeFalsy(); //Como mkdirSync se va al catch, el resultado es false (en el save-file-use-case.ts)

    mkdirSpy.mockRestore(); //El mockImplementation persiste, pasa a las siguientes pruebas, por lo que va a dar error si no lo limpiamos, asi que usamos mockRestore al terminar el test.
  });

  test("Should return false if file couldn't be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Custom Writing Error Message");
      });

    const result = saveFile.execute({ fileContent: "Hola" });
    expect(result).toBe(false);

    writeFileSpy.mockRestore(); //Limpiamos el mockImplementation de writeFileSync
  });
});
