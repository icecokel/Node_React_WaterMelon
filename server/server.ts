import express from "express";
import WebSocket from "ws";
import http from "http";

import UserController from "./controllers/user";
import ServerConfig from "server/serverConfig";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use("/user", UserController);

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("성공입니다 고생하셨어요!");
});

app.listen(ServerConfig.server.port, ServerConfig.server.console);

// 웹소켓 서버 열기

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    console.info("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.send("Hi there, I am a WebSocket server");
});

server.listen(ServerConfig.webBocketServer.port, () => {
  console.info("");
  console.info("WebSocket Server Open!!");
});
