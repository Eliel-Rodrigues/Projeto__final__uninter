import { CanalPedido } from "../../generated/prisma/enums.js";
import { prisma } from "../libs/prisma.js";


// Função de regras de negócio
const aplicarRegras = (canal: string, valorBase: number): number => {
  switch (canal) {
    case "APP":
      return valorBase * 0.95; // 5% cashback
    case "TOTEM":
      return valorBase;
    case "BALCAO":
      return valorBase + 2;
    case "PICKUP":
      return valorBase;
    case "WEB":
      return valorBase * 0.90; // 10% desconto
    default:
      throw new Error("Canal inválido");
  }
}

// Função de criação de pedido
export const criarPedido = async (
  clienteId: number,
  canal: string,
  itens: { produtoId: number; quantidade: number }[]) => {

  const produtos = await prisma.produto.findMany({
    where: { id: { in: itens.map(i => i.produtoId) } }
  });

  let valorBase = 0;
  for (const item of itens) {
    const produto = produtos.find(p => p.id === item.produtoId);
    if (!produto) throw new Error("Produto não encontrado");
    if (produto.estoque < item.quantidade) throw new Error("Estoque insuficiente");

    valorBase += produto.preco * item.quantidade;
  }

  const valorFinal = aplicarRegras(canal, valorBase);

  const pedido = await prisma.pedido.create({
    data: {
      canalPedido: CanalPedido[canal as keyof typeof CanalPedido],
      clienteId,
      status: "PENDENTE",
      valorTotal: valorFinal,
      itens: {
        create: itens.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade
        }))
      }
    },
    include: { itens: true }
  });

  return pedido;

};

export const statusPedido = async (req: any, res: any) => {
  const pedido = await prisma.pedido.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status }
  });
  return res.status(201).json(pedido);
};

export const buscarPedidos = async (req: any, res: any) => {
  const pedidos = await prisma.pedido.findMany({ include: { itens: true } });
  return res.status(201).json(pedidos);
};