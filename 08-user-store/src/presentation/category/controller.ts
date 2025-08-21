import { Request, Response } from "express";
import { CustomError } from "../../domain";

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

  createCategory = async (req: Request, res: Response) => {
    res.json("Create Category");
  };

  getCategories = async (req: Request, res: Response) => {
    res.json("Get Categories");
  };
}
