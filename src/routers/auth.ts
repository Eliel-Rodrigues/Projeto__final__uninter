import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma.js";
import type { Prisma } from "../../generated/prisma/browser.js";

const authRouter = express.Router();

export interface UsuarioPayload {
  id: number;
  role: string;
}
const senha = ""

authRouter.post("/", async (req, res) => {

    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(401).json({ erro: "Credenciais inválidas" });

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ accessToken: token });
    

   
    
});


export default authRouter;