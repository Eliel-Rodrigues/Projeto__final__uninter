import express from "express";
import { prisma } from "../libs/prisma.js";

const fidelidadeRouter = express.Router();

// Consulta saldo de pontos
fidelidadeRouter.get("/:clienteId", async (req, res) => {
  const fidelidade = await prisma.fidelidade.findUnique({ where: { clienteId: Number(req.params.clienteId) } });
  res.json(fidelidade || { clienteId: req.params.clienteId, pontos: 0 });
});

// Adiciona pontos
fidelidadeRouter.post("/adicionar/:clienteId", async (req, res) => {
  const { pontos } = req.body;
  const fidelidade = await prisma.fidelidade.upsert({
    where: { clienteId: Number(req.params.clienteId) },
    update: { pontos: { increment: pontos } },
    create: { clienteId: Number(req.params.clienteId), pontos },
  });
  res.json(fidelidade);
});

// Resgata pontos
fidelidadeRouter.post("/resgatar/:clienteId", async (req, res) => {
  const { pontos } = req.body;
  const fidelidade = await prisma.fidelidade.findUnique({ where: { clienteId: Number(req.params.clienteId) } });
  if (!fidelidade || fidelidade.pontos < pontos) {
    return res.status(409).json({ erro: "Pontos insuficientes" });
  }
  const atualizado = await prisma.fidelidade.update({
    where: { clienteId: Number(req.params.clienteId) },
    data: { pontos: { decrement: pontos } },
  });
  res.json(atualizado);
});

// router.get("/:clienteId", async (req, res) => {
//   const fidelidade = await prisma.fidelidade.findUnique({ where: { clienteId: Number(req.params.clienteId) } });
//   res.json(fidelidade);
// });

// router.post("/adicionar/:clienteId", async (req, res) => {
//   const { pontos } = req.body;
//   const fidelidade = await prisma.fidelidade.update({
//     where: { clienteId: Number(req.params.clienteId) },
//     data: { pontos: { increment: pontos } }
//   });
//   res.json(fidelidade);
// });

// router.post("/resgatar/:clienteId", async (req, res) => {
//   const { pontos } = req.body;
//   const fidelidade = await prisma.fidelidade.update({
//     where: { clienteId: Number(req.params.clienteId) },
//     data: { pontos: { decrement: pontos } }
//   });
//   res.json(fidelidade);
// });


export default fidelidadeRouter;