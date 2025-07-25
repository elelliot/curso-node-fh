import { Router } from "express";
// import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

// Creamos el router para la REST API con express

/*
TL:DR
- Creamos nuestro router principal
- Cada router (El de `Todos` por ejemplo) debe tener su propio archivo (todos/routes.ts) de lo contrario, 
el router global se vuelve muy largo y dificil de mantener.

- Al crear cada router, debemos usar ahi mismo los controllers los cuales son los que manejan la logica de la aplicacion.

Y ahora en lugar de crear las rutas y crear la logica del controlador aqui mismo, solo usamos el router de cada controller.

Asi nos ahorramos todo el codigo comentado de abajo y nos queda mas limpio.
*/
export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        // const todoController = new TodosController();

        //* API Routes (Probamos en Postman)
        // Las rutas deben definirse en un archivo controller , separados por responsabilidad.

        // Ejemplo, creamos un folder "todos" y dentro un archivo "controller.ts"
        
        /* 
            Y mandamos la referencia solamente; que en realidad es igual a: 
            router.get("/api/todos", todoController.getTodos );
            
            // (req,res)=>{ todoController.getTodos(req,res) }
        */
        
        /*
        El problema ahora puede ser que tengamos varios endpoints para el mismo controller, GET, POST, PUT, DELETE, etc.
        y aun asi creceria bastante el archivo de rutas aun con los controllers:
        
        router.get("/api/todos", todoController.getTodos );
        router.post("/api/todos", todoController.createTodo );
        ....

        Por tanto debemos crear un archivo router para cada controller.

        ahora con las rutas creadas para cada controller:
        ya no ocupamos----> router.get("/api/todos", todoController.getTodos );

        Y ahora podemos usar el router de cada controller asi como no ocupamos aqui el controller.
        -------> router.get("/api/todos", TodoRoutes.routes );

        Ahora es un middleware que se encarga de manejar las rutas de los todos.

        Este archivo ahora queda mas corto y limpio. (Sin los comments of course)
        */
        router.use("/api/todos", TodoRoutes.routes );

        return router;
    }
}