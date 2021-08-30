import { Router } from "express";
import session from "express-session";
import Properties from "server/properties";

const controller = Router();

controller.use(session(Properties.expressSession));

controller.post("/login", (req, res) => {
  console.info("POST :::: login");
  if (req.body.params) {
    if (!req.session.isLogined) {
      req.session.email = req.body.params.email;
      req.session.nickName = "SuperWaterMelon";
      req.session.isLogined = true;
      req.session.save(() => {
        res.send({
          result: true,
        });
      });
    } else {
      res.send({ result: req.session.isLogined });
    }
  }
});

controller.post("/logout", (req, res) => {
  req.session.destroy(() => {
    req.session;
    res.send({
      result: true,
    });
  });
});

export default controller;
