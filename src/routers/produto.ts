import express from "express";
import { prisma } from "../libs/prisma.js";

const produtoRouter = express.Router();

produtoRouter.post("/", async (req, res) => {
  const produto = await prisma.produto.create({ data: req.body });
  res.json(produto);
});

produtoRouter.get("/", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

produtoRouter.get("/:id", async (req, res) => {
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  res.json(produto);
});

produtoRouter.put("/:id", async (req, res) => {
  const produto = await prisma.produto.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(produto);
});

produtoRouter.delete("/:id", async (req, res) => {
  await prisma.produto.delete({ where: { id: Number(req.params.id) } });
  res.json({ mensagem: "Produto removido" });
});

export default produtoRouter;