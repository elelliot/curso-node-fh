export class CreateProductDTO {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: string,
    public readonly description: string,
    public readonly user: string, //ID
    public readonly category: string //ID
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDTO?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ["Missing name"];
    if (!user) return ["Missing user"];
    if (!category) return ["Missing category"];

    return [
      undefined,
      new CreateProductDTO(
        name,
        !!available, //Si no viene , puede ser undefined, lo convertimos a boolean (alternativa a lo que hacemos en create-category.dto.ts)
        price,
        description,
        user,
        category
      ),
    ];
  }
}
