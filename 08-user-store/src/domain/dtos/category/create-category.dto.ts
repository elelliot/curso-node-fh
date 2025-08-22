export class CreateCategoryDto {
  // No podremos llamar el constructor desde fuera del archivo ya que es privado
  private constructor(
    public readonly name: string,
    private readonly available: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object;
    let availableBoolean = available;

    if (!name) return ["Missing name"];
    // Validamos que 'available' no sea diferente de boolean, si no, lo convertimos a boolean
    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }
}
