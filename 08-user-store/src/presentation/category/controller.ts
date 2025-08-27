import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDTO } from "../../domain";
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
    //----------------------------- Pagination
    // Tomamos los query params desde el request
    // Default values (Vienen como string, pero el valor por defecto que les ponemos son numeros)
    const { page = 1, limit = 10 } = req.query; // Si no mando nada, entonces ----> page=1 y limit=10
    const [error, paginationDTO] = PaginationDTO.create(+page, +limit); // Convertimos a number en caso de mandarlos
    if (error) return res.status(400).json({ error });

    this.categoryService
      .getCategories(paginationDTO!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
