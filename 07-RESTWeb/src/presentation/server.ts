// Creamos nuestro web server con Express
import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router; //Ahora recibimos el router desde fuera
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options){
    const { port, public_path = 'public', routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes
  }

  async start() {
    

    //-----------------------------
    //* Public Folder
    /* Queremos que Public Folder sea publico (donde se encuentran los archivos estaticos)
     Asi servimos el index.html y en este caso tenemos una app de React que implementa el SPA con su propio Router, ojo con eso.
    */
    this.app.use(express.static(`./${this.publicPath}`));

    //* Middlewares (Funciones que se ejecutan en cuanto pasen por una ruta)
    //* Routes para REST API
    this.app.use( this.routes );

    /* 
    SPA (Single Page Application) de React
    - Atrapamos todas las rutas ya que si actualizamos fuera de "/" al no tener las rutas en el server, nos da error 404. Por defecto solo tenemos "/" por eso no se ve una declaracion especifica de "/"
      - React es quien maneja el Router en el cliente, por lo que si actualizamos la pagina, lo que hace es una peticion al servidor con una ruta que no existe.
      - Por tanto, devolvemos el index.html y al ser renderizado, React se encarga de manejar el Router.
    */
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on Port ${this.port}`);
    });
  }
}
