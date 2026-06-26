import { prisma } from "../libs/prisma.js";

// Adicionar produtos
export const entradaEstoque = async (req: any, res: any) => {
  try {
    const produtoId = Number(req.params.id);
    const { quantidade } = req.body;

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({ message: "Quantidade inválida para entrada de estoque." });
    }

    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!produtoExistente) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: { increment: quantidade } }
    });

    return res.status(201).json({
      message: "Entrada de estoque registrada com sucesso",
      produto: produtoAtualizado
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar entrada de estoque" });
  }
};


//Retirada de Produtos
export const saidaEstoque = async (req: any, res: any) => {
  try {
    const produtoId = Number(req.params.id);
    const { quantidade } = req.body;

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({ message: "Quantidade inválida para saída de estoque." });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    if (produto.estoque < quantidade) {
      return res.status(409).json({ message: "Estoque insuficiente." });
    }

    const atualizado = await prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: { decrement: quantidade } }
    });

    return res.status(201).json({
      message: "Saída de estoque registrada com sucesso",
      produto: atualizado
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar saída de estoque" });
  }
};


// Consultar estoque
export const consultaEstoque = async (req: any, res: any) => {
  try {
    const produtos = await prisma.produto.findMany();

    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado." });
    }

    return res.status(200).json({
      message: "Consulta de estoque realizada com sucesso",
      produtos
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao consultar estoque" });
  }
};


// Consulta estoque por unidade
export const consultaEstoqueUnidade = async (req: any, res: any) => {
  try {
    const unidadeId = Number(req.params.id);

    const produtos = await prisma.produto.findMany({
      where: { unidadeId }
    });

    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado para esta unidade." });
    }

    return res.status(200).json({
      message: "Consulta de estoque da unidade realizada com sucesso",
      unidadeId,
      produtos
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao consultar estoque da unidade" });
  }
};
