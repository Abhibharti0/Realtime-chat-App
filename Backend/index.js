import express from "express"
import dotenv from "dotenv"
import {connectdb} from"./lib/db.js"
import authroutes from "./routes/auth.route.js"
import messageroutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js"

import path from "path";


dotenv.config()

const PORT=process.env.PORT||3000;
const __dirname = path.resolve();

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
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.use("/api/auth",authroutes)
app.use("/api/messages",messageroutes)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb()
});