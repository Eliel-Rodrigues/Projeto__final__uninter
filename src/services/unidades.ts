import { prisma } from "../libs/prisma.js";

export const criarUnidades = async (req: any, res: any) => {
  try {
    const unidade = await prisma.unidade.create({ data: req.body});
    return res.status(201).json(unidade);
  } catch (error) {
    return res.status(403).json({ message: "CEP ja existente, não foi possível criar essa unidadde" });
  };
};

export const listaUnidades = async (req: any, res: any) => {
  try {
    const unidades = await prisma.unidade.findMany({ include: { produtos: true } });
    return res.json(unidades);
  }catch (error) {
    return res.status(404).json({ message: "Lista de unidades está vazia."})
  }
};