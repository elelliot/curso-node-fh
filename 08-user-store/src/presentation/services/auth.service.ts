// El Controller se encarga de llamar al servicio no de hacer el trabajo.

// El servicio es el que se encarga de hacer el trabajo

// Can't import the UserModel from the index.ts file because it breaks the app
import { UserModel } from "../../data";

import { CustomError, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      await user.save();

      // Encriptar la Contraseña

      // JWT <--- para mantener la autenticacion del user

      // Email de confirmacion

      /* 
        - Queremos devolver el user, pero el user de mongoose rompe la app.
        - Entonces creamos un UserEntity que es un objeto plano, 
          PERO ademas queremos NO devolver el password y ademas queremos devolver un token.

      */
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: "123ABD" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
