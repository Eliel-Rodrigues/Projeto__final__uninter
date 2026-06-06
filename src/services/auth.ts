import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Middleware de autenticação
export function autenticar(req: any, res: any, next: any ) {
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
  console.log(rolesPermitidos)
  return (req: any, res: any, next: any) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: "Acesso negado: role insuficiente" });
    }
    next();
  };
};



