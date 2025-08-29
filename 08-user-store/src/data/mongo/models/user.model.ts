import mongoose from "mongoose";

// Creamos el Esquema de User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required lol"],
  },
  email: {
    type: String,
    required: [true, "Email is Required lol"],
    unique: true, //No habra duplicados
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is Required lmao"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

// Para modificar la salida del JSON (lo que se retorna en las queries)
// Aplica para ----> `Create` Product y `Get` Products
userSchema.set("toJSON", {
  virtuals: true, // Nos agrega el 'id' al retornar la data en las queries (el _id todavia lo muestra pero abajo lo quitamos en el transform)
  versionKey: false, // Le quita el '__v',
  transform: function (doc, { _id, password, ...rest }, options) {
    return {
      ...rest, // Le quitamos el '_id' al destructurar
    };
  },
});

// Creamos el Modelo de User a partir del Esquema y lo exportamos
export const UserModel = mongoose.model("User", userSchema);
