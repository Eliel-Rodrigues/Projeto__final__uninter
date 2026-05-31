import express from "express";

const estoqueRouter = express.Router();

estoqueRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default estoqueRouter;