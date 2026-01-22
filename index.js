import express from "express";

const app = express();

const port =  5500;

app.listen(port, () => {
    console.log(`Server Is Running On Port : ${port}`);
})