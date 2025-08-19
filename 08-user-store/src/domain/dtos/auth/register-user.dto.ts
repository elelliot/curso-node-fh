//Los DTO se crean por cada endpoint en el que recibimos datos

import { regularExps } from "../../../config";

export class RegisterUserDTO {
  //Privado por que solo se puede crear desde la clase
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  // Creamos un User solo si pasa las validaciones
  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, email, password } = object;

    if (!name) return ["Missing Name"];
    if (!email) return ["Missing Email"];
    if (!regularExps.email.test(email)) return ["Invalid Email"];
    if (!password) return ["Missing Password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new RegisterUserDTO(name, email, password)];
  }
}
