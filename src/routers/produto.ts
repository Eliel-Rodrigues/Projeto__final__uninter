import express from "express";

const produtoRouter = express.Router();

produtoRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default produtoRouter;