import { Router } from "express";
import { TodosController } from "./controller";

// Creamos el router unicamente para los todos
// Podemos probarlos en postman: http://localhost:3000/api/todos/
export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        //* GET /api/todos , recordar que empezamos en /api/todos
        router.get("/", todoController.getTodos );
        
        // Get By ID, la ruta recibe un argumento `id`
        router.get("/:id", todoController.getTodoById );
        
        // Create Todo
        router.post("/", todoController.createTodo );

        // Update Todo
        router.put("/:id", todoController.updateTodo );

        // Delete Todo
        router.delete("/:id", todoController.deleteTodo );

    
        return router;
    }
}