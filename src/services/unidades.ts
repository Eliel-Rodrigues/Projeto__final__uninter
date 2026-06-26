import { prisma } from "../libs/prisma.js";


// Criar unidades
export const criarUnidades = async (req: any, res: any) => {
  try {
    const unidade = await prisma.unidade.create({ data: req.body});
    return res.status(201).json({ massege: "Unidade criada com sucesso", unidade});
  } catch (error) {
    return res.status(403).json({ message: "CEP ja existente, não foi possível criar essa unidadde" });
  };
};

// Lista unidades
export const listaUnidades = async (req: any, res: any) => {
  try {
    const unidades = await prisma.unidade.findMany();
    return res.json({ massege: "Lista de unidades retornada com sucesso", unidades});
  }catch (error) {
    return res.status(500).json({ message: "Erro interno ao buscar unidades"})
  }
};

// Buscar unidade por id
export const buscarUnidade = async (req: any, res: any) => {
 const unidade = await prisma.unidade.findUnique({ where: { id: Number(req.params.id) }});
  if(!unidade){
    return res.status(404).json({ message: "Unidade não encontrado."});
  };
  return res.json({ message: "Unidade encontrada com sucesso", unidade});
};