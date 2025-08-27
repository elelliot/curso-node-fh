import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);

    router.get("/", controller.getCategories);

    // El middleware va en el 2do argumento como, lo podemos enviar como 1 solo o como un array de middlewares
    // El middleware verifica si tenemos el JWT y el user para continuar al createCategory
    router.post("/", [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}
