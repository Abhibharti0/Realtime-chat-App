import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectdb } from "./lib/db.js";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb();
});
