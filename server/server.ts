import express from "express";
import UserController from "./controllers/user";

import Properties from "server/Properties";

const app = express();

app.use(express.json());
app.use("/user", UserController);

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("성공입니다 고생하셨어요!");
});

app.listen(Properties.server.port, Properties.server.console);
