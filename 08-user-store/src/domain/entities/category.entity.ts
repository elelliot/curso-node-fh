import { CustomError } from "../errors/custom.error";

// Esto no estuvo en el curso, fue una solucion de la comunidad
// Por alguna razon los tipos de mongoose no funcionan bien y rompen la app, por eso debo hacer este CategoryEntity, igual es buena practica
export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean
  ) {}

  static fromObject(categories: any[]) {
    return categories.map(
      (category) =>
        new CategoryEntity(category.id, category.name, category.available)
    );
  }
}
