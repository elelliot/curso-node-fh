import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name is Required lmao"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },

  // Los User crean Categories, por tanto aqui; ponemos la relacion con el User.
  user: {
    type: Schema.Types.ObjectId, // Un id de Mongo
    ref: "User", // Referenciamos el campo como se llama en el Modelo
    required: true,
  },
});

categorySchema.set("toJSON", {
  virtuals: true, // Nos agrega el 'id' al retornar la data en las queries (el _id todavia lo muestra pero abajo lo quitamos en el transform)
  versionKey: false, // Le quita el '__v',
  transform: function (doc, { _id, ...rest }, options) {
    return {
      ...rest, // Le quitamos el '_id' al destructurar
    };
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
