import { CanalPedido } from "../../generated/prisma/enums.js";
import { prisma } from "../libs/prisma.js";


//  Regras de negócio
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

//  Criação de pedido
export const criarPedido = async (
  res: any,
  clienteId: number,
  canal: string,
  itens: { produtoId: number; quantidade: number }[]) => {

  const produtos = await prisma.produto.findMany({
    where: { id: { in: itens.map(i => i.produtoId) } }
  });

  let valorBase = 0;
  for (const item of itens) {
    const produto = produtos.find(p => p.id === item.produtoId);
    if (!produto) return res.status(404).json({ message: "Produto não encontrado." });
    if (produto.estoque < item.quantidade) return res.status(409).json({ message: "Estoque insuficiente " });

    valorBase += produto.preco * item.quantidade;
  }

  const valorFinal = aplicarRegras(canal, valorBase);

  const pedido = await prisma.pedido.create({
    data: {
      canalPedido: CanalPedido[canal as keyof typeof CanalPedido],
      clienteId,
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

// Status do pedido
export const statusPedido = async (req: any, res: any) => {
  const pedido = await prisma.pedido.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status }
  });
  return res.json({ message: "Status do pedido atualizado com sucesso", pedido });
};

// Buscar pedidos
export const buscarPedidos = async (req: any, res: any) => {
  const pedidos = await prisma.pedido.findMany({ include: { itens: true } });
  return res.json({ massege: "Lista de pedidos retornada com sucesso", pedidos });
};