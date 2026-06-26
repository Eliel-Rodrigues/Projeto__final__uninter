import express from "express";
import helmet from "helmet";
import mainRouter from "./routes/main.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";


const server = express();


server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.use("/", mainRouter);
mainRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${process.env.PORT}`)
  console.log(`Servidor rodando na porta: http://localhost:${process.env.PORT}/api-docs`)
})

