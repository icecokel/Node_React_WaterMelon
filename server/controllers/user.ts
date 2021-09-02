import { Router } from "express";
import session from "express-session";
import ServerConfig from "server/serverConfig";

const controller = Router();

controller.use(session(ServerConfig.expressSession.option));

controller.post("/login", (req, res) => {
  console.info("POST :::: login");

  const session = req.session;
  const params = req.body.params;

  if (req.body.params) {
    if (!req.session.isLogined) {
      session.email = req.body.params.email;
      session.nickName = "SuperWaterMelon";
      session.isLogined = true;
      if (params.isRemember) {
        session.cookie.maxAge = ServerConfig.expressSession.cookie.maxAge;
      }

      session.save(() => {
        res.send({
          isLogined: session.isLogined,
          nickName: session.nickName,
        });
      });
    }
  }
});

controller.post("/logout", (req, res) => {
  req.session.destroy(() => {
    req.session;
    res.send({
      isLogined: false,
    });
  });
});

controller.get("/check", (req, res) => {
  console.log("GET :::: check");
  res.send({
    isLogined: req.session.isLogined,
    nickName: req.session.nickName,
  });
});

export default controller;
