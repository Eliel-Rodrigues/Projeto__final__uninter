
import jwt from "jsonwebtoken";
import authRouter from "../routers/auth.js";
import dotenv from "dotenv";

dotenv.config();


export function autenticar(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[2];
 

  if (!token) return res.status(401).json({ erro: "Token não fornecido" });
  

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.usuario = payload;
    next();
  } catch {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

export function autorizarRoles(rolesPermitidos: string[]) {
  return (req: any, res: any, next: any) => {
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: "Acesso negado: role insuficiente" });
    }
    next();
  };
}


