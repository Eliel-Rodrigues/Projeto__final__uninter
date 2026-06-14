import express from "express";
import { buscarPedidos, criarPedido, statusPedido } from "../services/pedidos.js";

const pedidoRouter = express.Router();

// Criar pedido
pedidoRouter.post("/", async (req, res) => {
    const { clienteId, canal, itens } = req.body;
    const pedido = await criarPedido(clienteId, canal, itens);
    if (!pedido) {
     return res.status(400).json({ message: "Nao foi possível criar esse pedido" });
    }
    return res.status(201).json(pedido);
});
  

// Status do pedido
pedidoRouter.put("/:id/status", async (req, res) => {
  statusPedido(req, res);
});

// Buscar pedidos
pedidoRouter.get("/", async (req, res) => {
  buscarPedidos(req, res);
});

export default pedidoRouter;
