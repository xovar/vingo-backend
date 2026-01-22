import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/connectDB.js";
import errorMiddleware from "./middleware/error.middlewares.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/auth.routes.js";

const app = express();

const port =  PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);


app.use(errorMiddleware)

app.listen(port, () => {
    connectDB()
    console.log(`Server Is Running On Port : ${port}`);
})