import { prisma } from "../libs/prisma.js";

// Criar produtos
export const criarProdutos = async (req: any, res: any) => {
  
  const produto = await prisma.produto.create({ data: req.body});
  return res.status(201).json({ massage: "Produto criado com sucesso", produto});
};

// Lista produtos
export const listaProdutos = async (req: any, res: any) => {
  const produtos = await prisma.produto.findMany();
  if(!produtos){
    return res.status(404).json({ message: "Lista de produtos está vazia."});
  }
  return res.json(produtos);
};

// BUscar produto por id
export const buscarProduto = async (req: any, res: any) => {
  const produto = await prisma.produto.findUnique({ where: { id: Number(req.params.id) } });
  if(!produto){
    return res.status(404).json({ message: "Produto não encontrado."});
  }
  return res.json({ message: "Produto encontrado", produto });
};

// Atualizar produto
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

  return res.json({ message: "Produto atualizado com sucesso", produtoAtualizado});

};
// Excluir produto
export const excluirProduto = async (req: any, res: any) => {
  try {
    await prisma.produto.delete({ where: { id: Number(req.params.id) } });
    res.status(204).json({ mensagem: "Produto excluído com sucesso (sem conteúdo)" });
  } catch (error) {
    return res.status(404).json({ message: "Produto não encontrado."});
  }
};