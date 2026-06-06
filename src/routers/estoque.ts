import express from "express";
import { prisma } from "../libs/prisma.js";

const estoqueRouter = express.Router();

// Entrada de estoque
estoqueRouter.post("/entrada/:id", async (req, res) => {
  const { quantidade } = req.body;
  const produto = await prisma.produto.update({
    where: { id: Number(req.params.id) },
    data: { estoque: { increment: quantidade } }
  });
  res.json(produto);
});

// Saída de estoque
estoqueRouter.post("/saida/:id", async (req, res) => {
  const { quantidade } = req.body;
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  if (!produto || produto.estoque < quantidade) {
    return res.status(409).json({ erro: "Estoque insuficiente" });
  }
  const atualizado = await prisma.produto.update({
    where: { id: produto.id },
    data: { estoque: { decrement: quantidade } },
  });
  res.json(atualizado);
});

// Consulta estoque
estoqueRouter.get("/:id", async (req, res) => {
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  res.json(produto);
});

estoqueRouter.get("/unidade/:id", async (req, res) => {
  const produtos = await prisma.produto.findMany({ where: { unidadeId: Number(req.params.id) } });
  res.json(produtos);
});

export default estoqueRouter;