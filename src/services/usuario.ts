// import bcrypt from "bcrypt";
// import { prisma } from "../libs/prisma.js";
// import type { Prisma } from "../../generated/prisma/browser.js";

// export const criarUsuario = async ({nome, email, senha, role }: Prisma.UsuarioCreateInput) => {
  
//   try {
//     const hash = await bcrypt.hash(senha, 10);
//     console.log(hash)
//     const usuario = await prisma.usuario.create({ 
//       data: { nome, email, senha: hash, role } 
//     });
//     return usuario;
//   }catch (error) {
//     return false;
//   };
// };


