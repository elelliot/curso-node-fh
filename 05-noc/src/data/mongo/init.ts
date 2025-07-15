import mongoose from "mongoose";

// Evitamos Dependencias ocultas con esta interfaz
interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      console.log("Mongo Connected");
    } catch (error) {
      console.log("Rip Mongo Connection");
    }
  }
}
