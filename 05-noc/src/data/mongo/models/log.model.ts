import mongoose from "mongoose";

// Schema es la estructura de los campos de la coleccion en mongo, o la tabla en postgres por ejemplo
const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Creamos el modelo para que interactue con mongo ("Log" es el nombre que mongo interpreta, quedando "logs" en plural)
export const LogModel = mongoose.model("Log", logSchema);
