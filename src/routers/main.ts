import express from "express";
import usuarioRouter from "./usuario.js";
import pedidoRouter from "./pedido.js";
import authRouter from "./auth.js";
import produtoRouter from "./produto.js";
import unidadeRouter from "./unidade.js";


const mainRouter = express.Router();

mainRouter.use("/usuarios", usuarioRouter);
mainRouter.use("/login", authRouter);
mainRouter.use("/pedidos", pedidoRouter);
mainRouter.use("/produtos", produtoRouter);
mainRouter.use("/unidades", unidadeRouter);


export default mainRouter;