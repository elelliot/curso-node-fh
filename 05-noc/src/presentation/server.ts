import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    // Creamos una tarea con cron que se ejecuta cada 5 segundos

    /**
     * Ahora creado el CheckService, podemos usarlo en el cron, para verificar si un sitio/servicio web esta disponible
     */
    CronService.createJob("*/5 * * * * *", () => {

      const url = "https://www.google.com";
      new CheckService(
        // Inyectamos las dependencias (callbacks) , se ejecutan cuando se ejecuta el metodo execute
        ()=> console.log(`${url} is ok`),
        (error)=> console.log(error)
      ).execute(url);

      /**
       * Si queremos usar un json server, podemos usar la url de json server:
       * http://localhost:3000/
       *
       * En este caso creamos un nuevo proyecto en 06-json-server para configurar un json-server (duuh)
       * y asi poder usarlo en este proyecto.
       * Ver: https://www.npmjs.com/package/json-server
       *
       * Nos deja setear un backend local para poder usarlo en el frontend.
       *
       * Pero nos quedaremos con el google.com para no complicarnos la vida.
       */
      // new CheckService().execute("http://localhost:3000/");
    });
  }
}
