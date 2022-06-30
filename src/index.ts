import express, { Application, Request, Response } from "express";
import "dotenv/config"
import { connect } from "./db/connect";
import cors from "cors"
import userRoute from "./routes/user.route";
import ConvRoute from "./routes/conversation.route";
import msgRoute from "./routes/message.route";
import { createServer } from "http";
import { Server } from "socket.io";
const app: Application = express();  
const httpServer = createServer(app);
const io = new Server(httpServer,{
	cors: {
	  origin: "*",
	  methods: ["GET", "POST"]
	}}
);
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
app.use('/public',express.static('public'));
app.use('/',express.static('upload'))
app.use("/api",userRoute);
app.use("/message",msgRoute)
app.use("/conversation",ConvRoute)
try {
	httpServer.listen(port, (): void => {
		console	.log(`Connected successfully on port ${port}`);
		console.log(dbName)
		connect(dbName,portDb,hostDb)
		// data connection
	});
	io.on('connection',(socket)=>{
		socket.on('joinRoom',roomId=>{;
			socket.join(roomId);
		})
		socket.on('sendMessage',buffer=>{
			socket.join(buffer["data"].conversationId);
			// io.to(buffer["data"].conversationId).emit('received',buffer["data"].messages);
			socket.broadcast.emit('received',buffer);
		})
		socket.on('entrainEcrire',data=>{
			socket.broadcast.emit('writting',data);
		})
	})
} catch (error : any) {
	console.error(`Error occured: ${error.message}`);
}
