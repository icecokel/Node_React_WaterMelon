import { Router } from "express";

const controller = Router();

controller.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body) {
    res.send({ result: true });
  }
});

controller.get("/logout", (req, res) => {
  console.log(`Request : ${req}`);
  res.send(`Request : ${req}`);
});

export default controller;
