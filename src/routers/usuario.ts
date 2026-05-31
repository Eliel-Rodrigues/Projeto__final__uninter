import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma.js";
import { autenticar } from "../services/auth.js";
import { autorizarRoles } from "../services/auth.js";


const usuarioRouter = express.Router();

usuarioRouter.post("/", autenticar, autorizarRoles(["CLIENTE"]), async (req: any, res: any) => {
  try {
    const { nome, email, senha, role } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({ data: { nome, email, senha: hash, role } });
    res.status(201).json({ id: usuario.id, email: usuario.email, role: usuario.role });
  } catch (error) {
    return res.status(403).json({ erro: "Já existe um usuario com esse email." });
  }

});
export default usuarioRouter;