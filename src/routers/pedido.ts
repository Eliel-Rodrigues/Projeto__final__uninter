import express from "express";

const pedidoRouter = express.Router();

pedidoRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default pedidoRouter;