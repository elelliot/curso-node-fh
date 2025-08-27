import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDTO,
  UserEntity,
} from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {
  // DI
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExists) throw CustomError.badRequest("Category already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(paginationDTO: PaginationDTO) {
    // Ya vienen validados a este punto, por eso no le ponemos valores por defecto
    const { page, limit } = paginationDTO;

    try {
      // -------------- PAGINATION
      // ---- Podemos usar Promise.all para hacer las 2 request al mismo tiempo ya que los await pueden tardar mas por ser secuenciales,
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(), // Contamos el total de categorias
        /* Salta los primeros 'n' registros (Page=3 y limit=5 ----> salta los primeros 10 registros,
         ya que la paginacion es en base 0, por eso restamos 1 (3-1)*5=10)*/
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit) as any, // Debo poner 'as any' por que si no Typescript se pone a llorar por el tipado de mongoose
      ]);

      if (!categories) throw CustomError.notFound("No categories found");

      const categoriesEntity = CategoryEntity.fromObject(categories);
      return {
        page: page,
        limit: limit,
        total: total,
        next: `api/categories?page=${page + 1}&limit=${limit}`,
        previous:
          page - 1 > 0
            ? `api/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: categoriesEntity,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
