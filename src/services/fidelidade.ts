import { prisma } from "../libs/prisma.js";

export const consultaSaldoPontos = async (req: any, res: any) => {
  const fidelidade = await prisma.fidelidade.findUnique({ where: { clienteId: Number(req.params.clienteId) } });
  return res.status(200).json(fidelidade || { clienteId: req.params.clienteId, pontos: 0 });
};

export const adicionarPontos = async (req: any, res: any) => {
  const { pontos } = req.body;
  const fidelidade = await prisma.fidelidade.upsert({
    where: { clienteId: Number(req.params.clienteId) },
    update: { pontos: { increment: pontos } },
    create: { clienteId: Number(req.params.clienteId), pontos },
  });
  return res.status(200).json(fidelidade);
};

export const resgataPontos = async (req: any, res: any) => {
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
};