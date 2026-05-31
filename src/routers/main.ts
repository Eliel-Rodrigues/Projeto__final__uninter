import express from "express";
import usuarioRouter from "./usuario.js";
import pedidoRouter from "./pedido.js";
import authRouter from "./auth.js";


const mainRouter = express.Router();

mainRouter.use("/registro", usuarioRouter);
mainRouter.use("/login", authRouter);
mainRouter.use("/pedido", pedidoRouter);


export default mainRouter;