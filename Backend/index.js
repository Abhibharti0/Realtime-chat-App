import express from "express"
import dotenv from "dotenv"
import {connectdb} from"./lib/db.js"
import authroutes from "./routes/auth.route.js"
import messageroutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";




dotenv.config()
const app= express();

app.use(express.json());
app.use(cookieParser())


const PORT=process.env.PORT
app.use("/api/auth",authroutes)
app.use("/api/message",messageroutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb()
});