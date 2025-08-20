import bcrypt, { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  // Encriptar la Contraseña y la retorna
  hash: (password: string) => {
    const salt = genSaltSync(); // 10 de salt por defecto
    return hashSync(password, salt);
  },

  //Comparar la Contraseña
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed); //Regresamos el matching
  }
};
