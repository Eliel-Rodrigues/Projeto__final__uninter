import express from "express";

const pagamentoRouter = express.Router();

pagamentoRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default pagamentoRouter;