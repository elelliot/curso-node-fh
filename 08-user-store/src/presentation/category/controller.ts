import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";

// Las routes solo llaman a los controller.
// Nuestro controller llama al servicio.
// El Servicio realiza toda la logica
export class CategoryController {
  // DI
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // Para crear una categoria ocupamos el token del usuario (Aquel que creamos a partir del 'id')
  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    res.json(createCategoryDto);
  };

  getCategories = async (req: Request, res: Response) => {
    res.json("Get Categories");
  };
}
