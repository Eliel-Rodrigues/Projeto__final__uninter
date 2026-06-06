import express from "express";
import { prisma } from "../libs/prisma.js";

const unidadeRouter = express.Router();

unidadeRouter.get("/", async (req, res) => {
  const unidades = await prisma.unidade.findMany({ include: { produtos: true } });
  res.json(unidades);
});


export default unidadeRouter;