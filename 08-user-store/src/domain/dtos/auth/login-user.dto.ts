//Los DTO se crean por cada endpoint en el que recibimos datos

import { regularExps } from "../../../config";

export class LoginUserDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  
  static login(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password } = object;

    if (!email) return ["Missing Email"];
    if (!regularExps.email.test(email)) return ["Invalid Email"];
    if (!password) return ["Missing Password"];
    if (password.length < 6) return ["Password too short, no way you could create an account with that shit"];

    return [undefined, new LoginUserDTO(email, password)];
  }
}
