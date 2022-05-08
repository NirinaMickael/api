import mongoose from "mongoose";

export const connect  = async (dbName: string, dbPort: number, dbHost: string) :Promise<void> =>{
  const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}` as string;

  try {
        await mongoose.connect(dbUrl);
        console.log(`Database is connected ......`);
    } catch (error) {
        console.log("error in database", error);
        process.exit(-1)
    }
}
