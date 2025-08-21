import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name is Required lmao"],
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

export const CategoryModel = mongoose.model("Category", categorySchema);
