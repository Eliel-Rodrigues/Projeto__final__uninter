import { prisma } from "../libs/prisma.js";

// Consulta saldo de pontos
export const consultaSaldoPontos = async (req: any, res: any) => {
  try {
    const clienteId = Number(req.params.clienteId);

    const fidelidade = await prisma.fidelidade.findUnique({
      where: { clienteId },
    });

    if (!fidelidade) {
      return res.status(200).json({
        clienteId,
        pontos: 0,
        message: "Cliente não possui pontos acumulados"
      });
    }

    return res.status(200).json({
      message: "Saldo de pontos consultado com sucesso",
      id: fidelidade.id,
      clienteId,
      pontos: fidelidade.pontos
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao consultar saldo de pontos" });
  }
};


// Adiciona pontos
export const adicionarPontos = async (req: any, res: any) => {
  try {
    const clienteId = Number(req.params.clienteId);
    const { pontos } = req.body;

    if (!pontos || pontos <= 0) {
      return res.status(400).json({ message: "Quantidade de pontos inválida" });
    }

    const fidelidade = await prisma.fidelidade.upsert({
      where: { clienteId },
      update: { pontos: { increment: pontos } },
      create: { clienteId, pontos },
    });

    return res.status(200).json({
      message: "Pontos adicionados com sucesso",
      fidelidade,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao adicionar pontos" });
  }
};

// Resgata pontos
export const resgataPontos = async (req: any, res: any) => {
  try {
    const clienteId = Number(req.params.clienteId);
    const { pontos } = req.body;

    if (!pontos || pontos <= 0) {
      return res.status(400).json({ erro: "Quantidade de pontos inválida" });
    }

    const fidelidade = await prisma.fidelidade.findUnique({
      where: { clienteId }
    });

    if (!fidelidade || fidelidade.pontos < pontos) {
      return res.status(409).json({ erro: "Pontos insuficientes" });
    }

    const atualizado = await prisma.fidelidade.update({
      where: { clienteId },
      data: { pontos: { decrement: pontos } }
    });

    return res.json({
      message: "Resgate realizado com sucesso",
      fidelidade: atualizado
    });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao resgatar pontos" });
  }
};
