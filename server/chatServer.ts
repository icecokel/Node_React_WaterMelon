import WebSocket from "ws";

const chat = {
  onMessage: (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      console.info("received: %s", message);
      const sendMsg = { message: message };
      ws.send(JSON.stringify(sendMsg));
    });
  },
};

export default chat;
