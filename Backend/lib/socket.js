import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});


const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  const onlineUsers = Object.keys(userSocketMap);

  // ✅ SEND TO CURRENT USER (VERY IMPORTANT)
  socket.emit("getOnlineUsers", onlineUsers);

  // ✅ SEND TO ALL USERS
  io.emit("getOnlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    delete userSocketMap[userId];

    const updatedUsers = Object.keys(userSocketMap);

    // ✅ UPDATE ALL AGAIN
    io.emit("getOnlineUsers", updatedUsers);
  });
});

export { io, app, server };
