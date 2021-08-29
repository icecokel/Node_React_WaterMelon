import { Router } from "express";

const controller = Router();

controller.post("/login", (req, res) => {
  console.info(req.body);
  if (req.body) {
    res.send({
      result: true,
      email: "super@watermelon.com",
      nickName: "SuperWaterMelon",
    });
  }
});

controller.get("/logout", (req, res) => {
  console.info(`Request : ${req}`);
  res.send(`Request : ${req}`);
});

export default controller;
