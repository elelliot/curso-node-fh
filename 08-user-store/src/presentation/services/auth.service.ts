// El Controller se encarga de llamar al servicio no de hacer el trabajo.

// El servicio es el que se encarga de hacer el trabajo

import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";

import {
  CustomError,
  RegisterUserDTO,
  UserEntity,
  LoginUserDTO,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  // Inyectamos el Email Service
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDTO) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      // Encriptar la Contraseña (1-way encryption, es decir, no se puede desencriptar), no debemos guardar contraseñas en la DB
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // Creamos el JWT a partir del id
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      // Email de confirmacion
      await this.sendEmailValidationLink(user.email);

      /* 
        - Queremos devolver el user, pero el user de mongoose rompe la app.
        - Entonces creamos un UserEntity que es un objeto plano, 
          PERO ademas queremos NO devolver el password y ademas queremos devolver un token.
      */
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDTO) {
    // Findone para verificar si existe el User
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user)
      throw CustomError.badRequest(
        "Email or Password are not valid, please try again."
      );

    /* 
      Como la contraseña fue encriptada con 1-way encryption, debemos comparar el password que introducimos
      con el hash del password que le guardamos al user
    */
    const isCorrectPassword = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isCorrectPassword)
      throw CustomError.badRequest("WRONG PASSWORD Biiiiitch!");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    // Creamos el token a partir del id
    const token = await JwtAdapter.generateToken({
      id: user.id,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    // No devuelve PASSWORD
    return {
      user: userEntity,
      token: token,
    };
  }

  private sendEmailValidationLink = async (email: string) => {
    // Generamos un token a partir del correo (El correo es el Payload)
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    // El link que vamos a enviar al correo para confirmarlo, debe tener el token que generamos
    const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;

    // El body del correo
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    // Enviamos el Correo a traves del servicio del emailService que inyectamos
    const isSet = await this.emailService.sendEmail(options);
    if (!isSet)
      throw CustomError.internalServer("Bruuuuh, error sending email");

    return true;
  };

  // En este punto el user recibe un link de verificacion con un token generado a partir de su mismo correo (sendEmailValidationLink).
  public validateEmail = async(token: string) => {

    const payload = await JwtAdapter.validateToken(token);
    if ( !payload ) throw CustomError.unauthorized('Invalid Token, Nigrrrrooooo');

    const { email } = payload as { email: string };
    if( !email ) throw CustomError.internalServer('Email not in token, woooooot');
    
    // Si no encuentro un user con el correo que obtuve del 'decoded' token (desde JwtAdapter.validateToken), entonces no podemos verificar al user.
    const user = await UserModel.findOne({ email })
    if( !user ) throw CustomError.internalServer('Email was somehow removed from the database LUUUL');

    user.emailValidated = true; // Como encontramos el correo, ya podemos ponerle correo verificado
    await user.save();

    return true;
  }
}
