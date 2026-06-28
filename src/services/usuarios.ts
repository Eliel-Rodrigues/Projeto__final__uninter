import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma.js";


// Criar usuários
export const criarUsuarios = async (req: any, res: any) => {

  try {
    const { nome, email, senha, role } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({ 
      data: { 
        nome, 
        email, 
        senha: hash,
        role
      }
    });
    return res.status(201).json({ massege: "Usuário criado com sucesso", id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role });
  } catch (error) {
    return res.status(403).json({ message: "Já existe um usuario com esse email" });
  }
};

// Perfil do usuário
export const perfilUsuario = async (req: any, res: any) => {

  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(req.params.id) },
    include: { pedidos: true, fidelidade: true }
  });
  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  };
  const { senha, ...usuarioSemSenha } = usuario;
  return res.json( { message: "Usuário encontrado com sucesso", usuarioSemSenha});
};


