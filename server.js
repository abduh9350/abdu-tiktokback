import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";

const app = express();
const port = 9000;

app.get("/", (req, res) => res.status(200).send("hello world"));
app.get("/v1/posts", (req, res) => res.status(200).send(Data));
app.listen(port, () => console.log(`listening on localhost:${port}`));
