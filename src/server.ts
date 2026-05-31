import express from "express";
import helmet from "helmet";
import mainRouter from "./routers/main.js";


const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({extended: true}))

server.use("/", mainRouter);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${process.env.PORT}/`)
})

