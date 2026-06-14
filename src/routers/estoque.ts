import express from "express";
import { prisma } from "../libs/prisma.js";
import { entradaEstoque, saidaEstoque, consultaEstoque, consultaEstoqueUnidade } from "../services/estoque.js";

const estoqueRouter = express.Router();

// Entrada de estoque
estoqueRouter.post("/entrada/:id", async (req, res) => {
  entradaEstoque(req, res);
});

// Saída de estoque
estoqueRouter.post("/saida/:id", async (req, res) => {
  saidaEstoque(req, res);
});

// Consulta estoque
estoqueRouter.get("/:id", async (req, res) => {
  consultaEstoque(req, res);
});

// consulta estoque por unidade
estoqueRouter.get("/unidade/:id", async (req, res) => {
  consultaEstoqueUnidade(req, res);
});

export default estoqueRouter;