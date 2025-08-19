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

// Creamos el Modelo de User a partir del Esquema y lo exportamos
export const UserModel = mongoose.model("User", userSchema);
