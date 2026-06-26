import express from "express";
import usuarioRouter from "./usuario.js";
import pedidoRouter from "./pedido.js";
import authRouter from "./auth.js";
import produtoRouter from "./produto.js";
import unidadeRouter from "./unidade.js";
import estoqueRouter from "./estoque.js";
import fidelidadeRouter from "./fidelidade.js";
import pagamentoRouter from "./pagamento.js";



const mainRouter = express.Router();

mainRouter.use("/usuarios", usuarioRouter);
mainRouter.use("/login", authRouter);
mainRouter.use("/pedidos", pedidoRouter);
mainRouter.use("/produtos", produtoRouter);
mainRouter.use("/unidades", unidadeRouter);
mainRouter.use("/estoque", estoqueRouter);
mainRouter.use("/fidelidade", fidelidadeRouter);
mainRouter.use("/pagamento", pagamentoRouter);




export default mainRouter;