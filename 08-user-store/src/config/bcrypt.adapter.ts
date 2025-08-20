import bcrypt, { genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  // Encriptar la Contraseña y la retorna
  hash: (password: string) => {
    const salt = genSaltSync(); // 10 de salt por defecto
    return hashSync(password, salt);
  },
};
