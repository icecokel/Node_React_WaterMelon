import { Router } from "express";
import session from "express-session";
import ServerConfig from "server/serverConfig";
import db from "../db";
const controller = Router();

controller.use(session(ServerConfig.expressSession.option));

controller.post("/test", (req, res) => {
  const sql = `SELECT * FROM USERS WHERE email ="${req.body.email}"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });

  db.end();
});

controller.post("/login", (req, res) => {
  console.info("POST :::: login");

  const session = req.session;
  const params = req.body.params;

  if (params) {
    const sql = `SELECT * FROM USERS WHERE email ="${params.email}"`;

    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      }
      const result = data[0];

      if (result) {
        if (result.user_passwd === params.password && result.del_yn === "N") {
          if (!req.session.isLogined) {
            session.email = result.email;
            session.isLogined = true;
            session.nickname = result.nickname;
            if (params.isRemember) {
              session.cookie.maxAge = ServerConfig.expressSession.cookie.maxAge;
            }
            session.save(() => {
              res.send({
                isLogined: session.isLogined,
                nickname: result.nickname,
              });
            });
          } else {
            res.send({ isLogined: req.session.isLogined });
          }
        } else {
          res.send({ error: "A0001" });
        }
      }
    });
  }
});

controller.get("/getFriedList", (req, res) => {
  console.info("get :::: getFriedList");

  const session = req.session;

  if (session.nickname) {
    const sql = `SELECT 
                  u2.nickname
                  FROM USERS u
                  LEFT JOIN FRIENDS f ON u.user_id = f.user_id
                  LEFT JOIN USERS u2 ON u2.user_id = f.frd_id
                  WHERE u.email = "${session.email}"
                  ORDER BY u2.nickname `;

    db.query(sql, (err, data) => {
      console.log(err);
      console.log(data);
    });
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
    nickname: req.session.nickname,
  });
});

export default controller;
