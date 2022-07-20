import mongoose from "mongoose";

export const connect = async (
  dbName: string,
  dbPort: number,
  dbHost: string
): Promise<void> => {
  //   const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}` as string;
  const dbUrl =
    "mongodb+srv://mickael:azertyui@newcluster.aqemw.mongodb.net/User?retryWrites=true&w=majority";
  try {
    await mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log("error in database", error);
    process.exit(-1);
  }
};
