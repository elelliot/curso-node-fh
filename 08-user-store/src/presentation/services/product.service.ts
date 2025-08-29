import { ProductModel } from "../../data";
import {
  CreateProductDTO,
  CustomError,
  PaginationDTO,
  UserEntity,
} from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class ProductService {
  // DI
  constructor() {}

  // El DTO ya tiene el user id, por eso no lo pongo aca, ahora lo hicimos diferente
  async createProduct(createProductDTO: CreateProductDTO): Promise<any> {
    const productExists = await ProductModel.findOne({
      name: createProductDTO.name,
    });

    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      const product = new ProductModel({
        ...createProductDTO,
        // user: user.id,
      });

      await product.save();
      return product; // Esta vez regresamos todo el product
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDTO: PaginationDTO) {
    // Ya vienen validados a este punto, por eso no le ponemos valores por defecto
    const { page, limit } = paginationDTO;
    try {
      // -------------- PAGINATION
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit) //- TODO:  Debo poner 'as any' por que si no Typescript se pone a llorar por el tipado de mongoose
          .populate("user"), //Devuelve la info del user en lugar del puroid
      ]);

      if (!products) throw CustomError.notFound("No products found");

      // const productsEntity = CategoryEntity.fromObject(products);
      // Podriamos hacer un fromObject con ProductEntity, pero nah, lo que si poner un `any`
      return {
        page: page,
        limit: limit,
        total: total,
        next: `api/products?page=${page + 1}&limit=${limit}`,
        previous:
          page - 1 > 0 ? `api/products?page=${page - 1}&limit=${limit}` : null,
        products: products as any,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
