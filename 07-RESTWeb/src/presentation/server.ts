// Creamos nuestro web server con Express
import express from "express";
import path from "path";

export class Server {
  private app = express();

  async start() {
    //* Middlewares (Funciones que se ejecutan en cuanto pasen por una ruta)

    //-----------------------------
    //* Public Folder
    /* Queremos que Public Folder sea publico (donde se encuentran los archivos estaticos)
     Asi servimos el index.html y en este caso tenemos una app de React que implementa el SPA con su propio Router, ojo con eso.
    */
    this.app.use(express.static("./public"));

    /* 
    - Atrapamos todas las rutas ya que si actualizamos fuera de "/" al no tener las rutas en el server, nos da error 404. Por defecto solo tenemos "/" por eso no se ve una declaracion especifica de "/"
      - React es quien maneja el Router en el cliente, por lo que si actualizamos la pagina, lo que hace es una peticion al servidor con una ruta que no existe.
      - Por tanto, devolvemos el index.html y al ser renderizado, React se encarga de manejar el Router.
    */
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(3000, () => {
      console.log("Server running on Port 3000");
    });
  }
}
