import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    router.use(FileUploadMiddleware.containFiles); // Aplicamos el middleware a todas las rutas de este router, asi no tenemos que ponerlas en cada una

    //--------------------
    //Cuando usamos el mismo middleware en varias rutas, lo enviamos de esta manera, antes de definir las rutas...
    router.use(TypeMiddleware.validTypes(["users", "category", "products"])); // Nombres validos para crear subcarpetas y guardar los archivos en folder/<user|category|product>
    /*
    ...el problema, es que no recibimos el parametro 'type' en el middleware por que la ruta aún no está definida (aún no sabe que es /:type),
    por eso viene 'undefined'.

    Una solucion es poner el middleware en cada ruta, pero pos, ta repetitivo.
    
    La otra solucion es --> desde el middleware, usando req.url, recuperar el param (ver type.middleware.ts).
    */
    //--------------------

    // Definir las rutas
    // api/upload/single/<users|category|products>
    // api/upload/multiple/<users|category|products>

    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFiles);

    return router;
  }
}
