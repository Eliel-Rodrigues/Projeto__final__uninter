import express from "express";
import { prisma } from "../libs/prisma.js";

const pedidoRouter = express.Router();

// Criar pedido
pedidoRouter.post("/", async (req, res) => {
  const { canalPedido, clienteId, itens } = req.body;
  const pedido = await prisma.pedido.create({
    data: {
      canalPedido,
      clienteId,
      status: "PENDENTE",
      itens: { create: itens }
    },
    include: { itens: true }
  });
  res.json(pedido);
});

pedidoRouter.put("/:id/status", async (req, res) => {
  const pedido = await prisma.pedido.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status }
  });
  res.json(pedido);
});

pedidoRouter.get("/", async (req, res) => {
  const pedidos = await prisma.pedido.findMany({ include: { itens: true } });
  res.json(pedidos);
});

export default pedidoRouter;
