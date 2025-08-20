// El Controller se encarga de llamar al servicio no de hacer el trabajo.

// El servicio es el que se encarga de hacer el trabajo

import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";

import { CustomError, RegisterUserDTO, UserEntity, LoginUserDTO } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      // Encriptar la Contraseña
      user.password = bcryptAdapter.hash( registerUserDto.password );

      await user.save();
      


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


  public async loginUser(loginUserDto: LoginUserDTO) {
    // Findone para verificar si existe el User
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Email or Password are not valid, please try again.");

    const isCorrectPassword = bcryptAdapter.compare(loginUserDto.password, user.password)
    if ( !isCorrectPassword ) throw CustomError.badRequest("WRONG PASSWORD Biiiiitch!");
    

    const { password, ...userEntity } = UserEntity.fromObject(user);
    
    // No devuelve PASSWORD
    return {
      user: userEntity,
      token: 'ABC'
    }
  }
}
