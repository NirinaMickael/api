import express, { Application, Request, Response } from "express";
import "dotenv/config"
import { connect } from "./db/connect";
import cors from "cors"
import userRoute from "./routes/user.route";
const app: Application = express();  

// variable database
const port = process.env.port as unknown as number;
const portDb = process.env.portDb as unknown as number;
const hostDb = process.env.host as string;
const dbName = process.env.dbName as string;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/upload`));
app.use(cors({origin:"*"}))
// allow to wonvert data between server and database
app.all('/',(req:Request , res : Response)=>{
	res.json({
		message : "salut"
	})
})
app.use('/public',express.static('public'))
app.use("/api",userRoute);

try {
	app.listen(port, (): void => {
		console	.log(`Connected successfully on port ${port}`);
		console.log(dbName)
		connect(dbName,portDb,hostDb)
		// data connection
	});
} catch (error : any) {
	console.error(`Error occured: ${error.message}`);
}
