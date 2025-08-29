import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();
  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  console.log("--------------Starting database seeding--------------");

  // 0. Borrar toda la DB
  console.log("0 ------> Cleaning database");
  await Promise.all([
    UserModel.deleteMany(), // Cuidado con esto en produccion, literal borra todo
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);
  console.log("0 ------> SUCCESS");

  // 1. Crear Users
  console.log("1 ------> Creating Users");
  const users = await UserModel.insertMany(seedData.users);
  console.log("1 ------> Users Created Correctly");

  // 2. Crear Categories (Piden User)

  console.log("2 ------> Creating Categories");
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0].id, //Las categorias las crea el primer User
      };
    })
  );
  console.log("2 ------> Categories Created Correctly");
  // 3. Crear Products (Piden User y Category)
  console.log("3 ------> Creating Products");
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween0AndX(seedData.users.length - 1)].id, // Cualquiera de los Users
        category:
          categories[randomBetween0AndX(seedData.categories.length - 1)].id, // Cualquiera de las Categories
      };
    })
  );
  console.log("3 ------> Products Created Correctly");
  console.log("Seeded");
}
