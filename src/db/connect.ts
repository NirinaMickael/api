import mongoose from "mongoose";

export const connect = async (
  dbName: string,
  dbPort: number,
  dbHost: string
): Promise<void> => {
  const dbUrl =
  "mongodb+srv://Mickael:AmHwEQ2yxKNVvJM@newcluster.aqemw.mongodb.net/User?retryWrites=true&w=majority";
  try {
    mongoose.connect(dbUrl);
  } catch (error) {
    console.log("error in database", error);
    process.exit(-1);
  }
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};
