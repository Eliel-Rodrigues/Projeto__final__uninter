import express from "express";

const unidadeRouter = express.Router();

unidadeRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default unidadeRouter;