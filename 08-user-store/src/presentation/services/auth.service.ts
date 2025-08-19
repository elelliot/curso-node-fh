// El Controller se encarga de llamar al servicio no de hacer el trabajo.

// El servicio es el que se encarga de hacer el trabajo

import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    return "Todo ok";
  }
}
