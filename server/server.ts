import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req);

  res.send("성공입니다 고생하셨어요!");
});

app.listen(1203);
