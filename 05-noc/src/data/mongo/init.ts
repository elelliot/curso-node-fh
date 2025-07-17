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
      console.log("Connecting to MongoDB...");
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      console.log("MongoDB Connected");
    } catch (error) {
      console.log("Rip MongoDB Connection");
    }
  }
}
