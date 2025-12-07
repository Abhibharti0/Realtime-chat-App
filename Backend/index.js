import express from "express"
import dotenv from "dotenv"
import {connectdb} from"./lib/db.js"
import authroutes from "./routes/auth.route.js"



dotenv.config()
const app= express();

const PORT=process.env.PORT
app.use("/api/auth",authroutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectdb()
});