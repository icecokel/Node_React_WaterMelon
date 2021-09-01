import { Router } from "express";
import session from "express-session";
import Properties from "server/properties";

const controller = Router();

controller.use(session(Properties.expressSession));

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
        // 로그인 상태 14일간 유지 해줌
        session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
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
