import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma.js";

dotenv.config();

// Gera um Token
export const gerarToken = async (req: any, res: any) => {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });
  const match = await bcrypt.compare(senha, usuario.senha);
  if (!match) return res.status(401).json({ erro: "Credenciais inválidas" });

  // Gera token com a chave secreta do .env
  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  res.json({ accessToken: token });
}

// Middleware de autenticação
export function autenticar(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Token não fornecido" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.usuario = payload;
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  };
};


// Middleware de autorização por role
export function autorizarRoles(rolesPermitidos: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: "Acesso negado: role insuficiente" });
    }
    next();
  };
};



