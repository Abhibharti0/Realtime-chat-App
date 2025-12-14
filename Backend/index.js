import express from "express"
import dotenv from "dotenv"
import {connectdb} from"./lib/db.js"
import authroutes from "./routes/auth.route.js"
import messageroutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js"

import path from "path";
import { fileURLToPath } from "url";


dotenv.config()

const PORT=process.env.PORT||3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}



app.use("/api/auth",authroutes)
app.use("/api/messages",messageroutes)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb()
});