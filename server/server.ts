import express from "express";
import WebSocket from "ws";
import http from "http";

import UserController from "./controllers/user";
import ServerConfig from "server/serverConfig";
import chatServer from "./chatServer";

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

wss.on("connection", (ws: WebSocket) => {
  chatServer.onMessage(ws);
});

wss.on("close", (ws: WebSocket) => {
  ws.send("Bye!!");
});
server.listen(ServerConfig.webBocketServer.port, () => {
  console.info("WebSocket Server Open!!");
});
