import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import message from "./model/Messages.js";
import conversation from './model/Conversation.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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

// Configuration de multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Route pour servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

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
      let messageData = {
        conversationId: data.conversationId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        type: data.type
      };

      // Si c'est un fichier, sauvegarder le fichier
      if (data.type === 'file' && data.file) {
        const base64Data = data.file.data.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = Date.now() + '-' + data.file.name;
        const filePath = path.join('uploads', fileName);
        
        fs.writeFileSync(filePath, buffer);
        
        messageData.file = {
          name: data.file.name,
          path: `/uploads/${fileName}`,
          contentType: data.file.type
        };
      }

      // Créer le nouveau message
      const newMessage = new message(messageData);
      const savedMessage = await newMessage.save();

      // Mettre à jour la conversation
      const updatedConversation = await conversation.findByIdAndUpdate(
        data.conversationId,
        { message: data.text || `Fichier: ${data.file?.name || ''}` },
        { new: true }
      );

      // Émettre le message à tous les clients dans la room
      io.in(data.conversationId).emit("receive_message", savedMessage);
      io.in(data.conversationId).emit("conversation_update", updatedConversation);
      
      console.log("Nouveau message reçu:", savedMessage);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      socket.emit("error", { message: "Erreur lors de l'envoi du message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

Connection();

const PORT = 8000;

httpServer.listen(PORT, () => console.log(`Server is running successfully on Port: ${PORT}`));