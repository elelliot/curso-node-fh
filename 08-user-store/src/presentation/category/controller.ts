import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services/category.service";

// Express recomienda que no usemos async/await en los controladores, sino que usemos promesas

// Las routes solo llaman a los controller.
// Nuestro controller llama al servicio.
// El Servicio realiza toda la logica
export class CategoryController {
  // DI
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // Para crear una categoria ocupamos el token del usuario (Aquel que creamos a partir del 'id')
  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };

  getCategories = async (req: Request, res: Response) => {
    res.json("Get Categories");
  };
}
