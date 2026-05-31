import express from "express";

const fidelidadeRouter = express.Router();

fidelidadeRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues b");
});


export default fidelidadeRouter;