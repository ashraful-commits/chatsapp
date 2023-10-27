import express from "express"
import cors from "cors"
import colors from "colors"
import CookieParser from "cookie-parser"
import dotenv from "dotenv"
import MongoDBConnection from "./Config/MongoDBConige.js"
import { errorHandler } from "./Middleware/ErrorHandler.js"
import AuthRouter from "./Router/AuthRouter.js"
import messageRouter from "./Router/MessageRouter.js"
import {createServer} from "http"
import {Server} from 'socket.io'
import UserModel from "./Model/UserModel.js"
import path from "path"
import chatRouter from "./Router/ChatRouter.js"
dotenv.config()
const port = process.env.PORT || 5000

const app = express()

app.use(CookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:["http://localhost:5173","https://chat-app-ir8p.onrender.com"], 
    credentials:true
}))
app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/message",messageRouter)
app.use("/api/v1/chat",chatRouter)
app.use(errorHandler)

const httpServer = createServer(app)

const io = new Server(httpServer,{
 
  cors:{
    origin:["http://localhost:5173","https://chat-app-ir8p.onrender.com"],
    credentials:true
  }
})

//============================== all users 
let users = [];

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    // Store the user's socket.id along with userId
    if (!users.find((u) => u.userId === userId)) {
      const user = { userId, socketId: socket.id };
      users.push(user);
    }
    // Emit the updated user list to all clients
    io.emit("onlineUser", users);
  });
  socket.on("sendMessage", async ({ text, to, from, chatId }) => {
    const senderId = users.find((user) => user.userId === from);
    const receiverId = users.find((user) => user.userId === to);
    const userData = await UserModel.findById(from);

    if (receiverId) {
      io.to(receiverId.socketId).emit("getMessage", {
        text,
        senderId: { ...userData._doc },
        to: receiverId.userId,
        chatId,
      });
      io.to(receiverId.socketId).emit("getNotification", {
        chatId,
        senderId: { ...userData._doc },
        isRead: false,
        date: new Date(),
      });
    } else {
      // Handle the case when the receiver is not online
      // You can emit a message or store the message to be delivered later
    }
    if (senderId) {
      io.to(senderId.socketId).emit("getMessage", {
        text,
        senderId: { ...userData._doc },
        to: senderId.userId,
        chatId,
      });
      
    } else {
      // Handle the case when the receiver is not online
      // You can emit a message or store the message to be delivered later
    }
    if (senderId) {
      io.to(senderId.socketId).emit("userMessage", {
        text,
        senderId: { ...userData._doc },
        to: senderId.userId,
        chatId,
      });
      
    } else {
      // Handle the case when the receiver is not online
      // You can emit a message or store the message to be delivered later
    }
  });

  socket.on("disconnect", () => {
    // Remove the disconnected user from the array
    users = users.filter((user) => user.socketId !== socket.id);

    // Emit the updated user list to all clients
    io.emit("onlineUser", users);
  });

  socket.on("isTypeIng", async ({ typeIng, to,from }) => {
    const receiverId = users.find((user) => user.userId === to);
    const userData = await UserModel.findById(from);
    if (receiverId) {
      io.to(receiverId.socketId).emit("isTypeingEmit", { typeIng,to,from });
    } else {
      // Handle the case when the receiver is not online
      // You can emit a message or store the typing indicator to be delivered later
    }
  });
});
//==============================development mode================
const __dirname =path.resolve()
if (process.env.APP_ENV === "development") {
  app.use(express.static(path.join(__dirname, "/Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client","dist","index.html"));
  });
}else{
  app.get('/',(req, res)=>{
res.send("Api is  running successfully!")
  })
}

 httpServer.listen(port,()=>{
  MongoDBConnection()
  console.log(`Server listening on ${port}`.bgCyan)
 })