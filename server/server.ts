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

app.get("/getApi", (req, res) => {
  console.log(req.path);
  console.log(req.query);
  const result = JSON.stringify({ path: req.path, query: req.query });
  res.send(`GET :::` + result);
});

app.post("/postApi", (req, res) => {
  console.log(req.path);
  console.log(req.body);

  res.send("POST :" + JSON.stringify(req.body));
});

app.listen(ServerConfig.server.port, ServerConfig.server.console);

// 웹소켓 서버 열기

const ConnectedUsers: Array<WebSocket> = [];

wss.on("connection", (ws: WebSocket) => {
  ConnectedUsers.push(ws);

  ws.on("close", () => {
    console.log("Close from Client");
  });

  ws.on("error", (e: string) => {
    console.log("WebSocket Error");
    console.log(e);
  });

  ws.on("message", (message: string) => {
    console.info("received: %s", message);
    const sendMsg = { message: message };

    // TODO receiver 설정 작업 진행

    ConnectedUsers.forEach((user: WebSocket) =>
      user.send(JSON.stringify(sendMsg))
    );
  });
});

server.listen(ServerConfig.webBocketServer.port, () => {
  console.info("WebSocket Server Open!!");
});
