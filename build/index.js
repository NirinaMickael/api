"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var connect_1 = require("./db/connect");
var cors_1 = __importDefault(require("cors"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var conversation_route_1 = __importDefault(require("./routes/conversation.route"));
var message_route_1 = __importDefault(require("./routes/message.route"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// variable database
var port = process.env.PORT;
var portDb = process.env.portDb;
var hostDb = process.env.host;
var dbName = process.env.dbName;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("".concat(__dirname, "/upload")));
app.use((0, cors_1.default)({ origin: "*" }));
// allow to wonvert data between server and database
app.use('/public', express_1.default.static('public'));
app.use('/', express_1.default.static('upload'));
app.use("/api", user_route_1.default);
app.use("/message", message_route_1.default);
app.use("/conversation", conversation_route_1.default);
try {
    httpServer.listen(port, function () {
        console.log("Connected successfully on port ".concat(port));
        (0, connect_1.connect)(dbName, portDb, hostDb);
        // data connection
    });
    io.on('connection', function (socket) {
        socket.on('joinRoom', function (roomId) {
            ;
            socket.join(roomId);
        });
        socket.on('sendMessage', function (buffer) {
            socket.join(buffer["data"].conversationId);
            // io.to(buffer["data"].conversationId).emit('received',buffer["data"].messages);
            socket.broadcast.emit('received', buffer);
        });
        socket.on('entrainEcrire', function (data) {
            socket.broadcast.emit('writting', data);
        });
    });
}
catch (error) {
    console.error("Error occured: ".concat(error.message));
}
