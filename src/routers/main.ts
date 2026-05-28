import express from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send("Eliel Rodrigues");
});


export default mainRouter;