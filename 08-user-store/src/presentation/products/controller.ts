import { Request, Response } from "express";
import { CustomError, PaginationDTO } from "../../domain";

// Express recomienda que no usemos async/await en los controladores, sino que usemos promesas

// Las routes solo llaman a los controller.
// Nuestro controller llama al servicio.
// El Servicio realiza toda la logica
export class ProductController {
  // DI
  // constructor(private readonly ProductService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createProduct = (req: Request, res: Response) => {
    // const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    // if (error) return res.status(400).json({ error });
    // this.categoryService
    //   .createCategory(createCategoryDto!, req.body.user)
    //   .then((category) => res.status(201).json(category))
    //   .catch((error) => this.handleError(error, res));
    return res.json("Hello from Create Products");
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDTO] = PaginationDTO.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    return res.json("Hello from GET Products");

    // this.categoryService
    //   .getProducts(paginationDTO!)
    //   .then((categories) => res.json(categories))
    //   .catch((error) => this.handleError(error, res));
  };
}
