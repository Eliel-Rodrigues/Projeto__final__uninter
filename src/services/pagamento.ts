import { PedidoOrderByRelevanceFieldEnum } from "../../generated/prisma/internal/prismaNamespace.js";
import { prisma } from "../libs/prisma.js";
import { saidaEstoque } from "./estoque.js";

// Pagamento Mock
export const pagamentoMock = async (req: any, res: any) => {
  const { pagamento, metodo } = req.body;
  const pedido = await prisma.pedido.findUnique({ where: { id: Number(req.params.id) }, include: { itens: true } })

  if (!pedido) {
    return res.status(404).json({ message: "Pedido näo encontrado" });
  };

  if (pedido.status === "PAGO") {
    return res.status(409).json({ message: "Pagamento do pedido já foi efetuado " });
  };

  const status = pagamento === pedido.valorTotal ? "PAGO" : "RECUSADO";

  const efetuarPagamento = await prisma.$transaction([
    prisma.pagamento.create({
      data: {
        valor: pagamento,
        metodo: metodo,
        status: status,
        pedidoId: pedido.id
      }
    }),
    prisma.pedido.update({
      where: { id: pedido.id },
      data: { status: status }
    })
  ]);

  const pedidoAtualizado = await prisma.pedido.findUnique({
    where: { id: pedido.id },
    include: { itens: true }
  });

  if (pedidoAtualizado?.status !== "PAGO") {
    return res.status(409).json({ message: "Pagamento não foi aprovado " });
  }

  for (const item of pedidoAtualizado.itens) {
    await prisma.produto.update({
      where: { id: item.produtoId },
      data: {
        estoque: {
          decrement: item.quantidade
        }
      }
    });
  }
  return res.status(200).json({ message: "Pagamento registrado com sucesso ", efetuarPagamento });
};


// Comprovante de pagamento
export const comprovantePagamento = async (req: any, res: any) => {
  const comprovante = await prisma.pagamento.findFirst({ where: { pedidoId: Number(req.params.id) } });
  if (!comprovante || comprovante.status !== "PAGO") {
    return res.status(404).json({ message: "Comprovante não encontrado ou pagamento não aprovado" })
  }
  return res.json({ message: "Comprovante encontrado com sucesso", comprovante });
};
