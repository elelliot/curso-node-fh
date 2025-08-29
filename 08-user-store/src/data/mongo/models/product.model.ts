import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is Required frfr"],
    unique: true, // Para no tener productos con el mismo nombre
  },
  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },

  // Relaciones
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

// Para modificar la salida del JSON (lo que se retorna en las queries)
// Aplica para ----> `Create` Product y `Get` Products
productSchema.set("toJSON", {
  virtuals: true, // Nos agrega el 'id' al retornar la data en las queries (el _id todavia lo muestra pero abajo lo quitamos en el transform)
  versionKey: false, // Le quita el '__v',
  transform: function (doc, { _id, ...rest }, options) {
    return {
      ...rest, // Le quitamos el '_id' al destructurar
    };
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
