import { prisma } from "../libs/prisma.js";

export const entradaEstoque = async (req: any, res: any) => {
  const { quantidade } = req.body;
  const produto = await prisma.produto.update({
    where: { id: Number(req.params.id) },
    data: { estoque: { increment: quantidade } }
  });
  return res.status(201).json(produto);
};

export const saidaEstoque = async (req: any, res: any) => {
  const { quantidade } = req.body;
    const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
    if (!produto || produto.estoque < quantidade) {
      return res.status(409).json({ erro: "Estoque insuficiente" });
    };
    const atualizado = await prisma.produto.update({
      where: { id: produto.id },
      data: { estoque: { decrement: quantidade } },
    });
    return res.status(201).json(atualizado);
};

export const consultaEstoque = async (req: any, res: any) => {
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  res.status(201).json(produto);
}; 

export const consultaEstoqueUnidade = async (req: any, res: any) => {
   const produtos = await prisma.produto.findMany({ where: { unidadeId: Number(req.params.id) } });
  return res.status(201).json(produtos);
};