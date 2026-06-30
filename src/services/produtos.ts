import { prisma } from "../libs/prisma.js";

// Criar produtos
export const criarProdutos = async (req: any, res: any) => {
  const  unidadeId = req.body.unidadeId
  const unidade = await prisma.unidade.findUnique({ where: { id: Number(unidadeId) }});
  if(!unidade) return res.status(404).json({ massage: "Unidade não encontra"});

  const produto = await prisma.produto.create({ data: req.body});
  return res.status(201).json({ massage: "Produto criado com sucesso", produto});
};

// Lista produtos paginados
export const listaProdutos = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Busca paginada
    const produtos = await prisma.produto.findMany({
      skip,
      take: limit,
    });

    // Conta total de registros
    const totalItems = await prisma.produto.count();
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      message: "Lista de produtos paginada",
      data: produtos,
      pagination: {
        page,
        limit,
        total_items: totalItems,
        total_pages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// Buscar produto por id
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