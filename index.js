import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/connectDB.js";

const app = express();

const port =  PORT || 8000;

app.listen(port, () => {
    connectDB()
    console.log(`Server Is Running On Port : ${port}`);
})