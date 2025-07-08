/**
 * CheckService es un use case que se encarga de verificar si un sitio web esta disponible
 */

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

//Los use cases son clases con codigo que esta especializado en una tarea

// Le decimos a CheckService que implemente la interfaz CheckServiceUseCase (que es una interfaz que define el metodo execute)
export class CheckService implements CheckServiceUseCase {
  /**
   * La Dependencies Injection solo es colocar una dependencia en casos de uso, repositorios o datasources,
   *
   * Tradicionalmente se realiza en un constructor, o si trabajamos en Vanilla JS, en factory function.
   * el builder del factory recibe las dependencias y crea la funcion con las dependencias inyectadas.
   *
   * No es mas que agregarle dependencias a la clase
   */

  constructor() {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      console.log(`${url} is ok`);

      return true;
    } catch (error) {
      console.log(`${error}`);
      return false;
    }
  }
}
