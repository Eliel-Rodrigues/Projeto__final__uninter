import { prisma } from "../libs/prisma.js";

export const criarProdutos = async (req: any, res: any) => {
  
  const produto = await prisma.produto.create({ data: req.body});
  if(!produto){
    return res.status(204).json({ erro: "Não foi possível criar esse produto"});
  }
  return res.status(201).json(produto);
};

export const listaProdutos = async (req: any, res: any) => {
  const produtos = await prisma.produto.findMany();
  if(!produtos){
    return res.status(404).json({ message: "Lista de produtos está vazia."});
  }
  return res.json(produtos);
};

export const buscarProduto = async (req: any, res: any) => {
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  if(!produto){
    return res.status(404).json({ message: "Produto não encontrado."});
  }
  return res.json(produto);
};

export const atualizarProduto = async (req: any, res: any) => {
  const {nome, preco, estoque, unidadeId} = req.body;
  const produtoExistente = await prisma.produto.findUnique({
  where: { id: Number(req.params.id) }
  });

  if (!produtoExistente) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  const produtoAtualizado = await prisma.produto.update({
    
    where: { id: Number(req.params.id) },
    data: { 
      nome,
      preco,
      estoque,
      unidadeId
     }
  });

  return res.json(produtoAtualizado);

};

export const excluirProduto = async (req: any, res: any) => {
  try {
    await prisma.produto.delete({ where: { id: Number(req.params.id) } });
    res.json({ mensagem: "Produto removido" });
  } catch (error) {
    return res.status(404).json({ message: "Produto não encontrado."});
  }
};