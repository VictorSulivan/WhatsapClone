import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import message from "./model/Messages.js";
import conversation from './model/Conversation.js';

import Connection from "./database/db.js";
import Route from "./routes/route.js";

import bodyParser from "body-parser";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true})); 
 
app.use('/', Route);

// Configuration des événements Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Utilisateur rejoint la conversation: ${roomId}`);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`Utilisateur quitte la conversation: ${roomId}`);
  });

  socket.on("new_message", async (data) => {
    try {
      // Créer le nouveau message
      const newMessage = new message(data);
      const savedMessage = await newMessage.save();

      // Mettre à jour la conversation
      const updatedConversation = await conversation.findByIdAndUpdate(
        data.conversationId,
        { message: data.text },
        { new: true }
      );

      // Émettre le message et la mise à jour de la conversation
      io.to(data.conversationId).emit("receive_message", savedMessage);
      io.to(data.conversationId).emit("conversation_update", updatedConversation);
      
      console.log("Nouveau message reçu:", savedMessage);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

Connection();

const PORT = 8000;

httpServer.listen(PORT, () => console.log(`Server is running successfully on Port: ${PORT}`));