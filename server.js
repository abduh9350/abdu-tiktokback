const express = require("express");
const mongoose = require("mongoose");
const Data = require("./data.js");
const Videos = require("./dbModel.js");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

const connection_url =
  "mongodb+srv://admin:zer4bsK6fEQkvmN5@cluster0.lowqx.mongodb.net/abdu-tiktok?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlPalser: true,
  useCreateIndex: true,
  useUnifieldTopology: true,
});

app.get("/", (req, res) => res.status(200).send("hello world"));
app.get("/v1/posts", (req, res) => res.status(200).send(Data));
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.listen(port, () => console.log(`listening on localhost:${port}`));
