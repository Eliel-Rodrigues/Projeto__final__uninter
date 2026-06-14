import express from "express";
import { adicionarPontos, consultaSaldoPontos, resgataPontos } from "../services/fidelidade.js";

const fidelidadeRouter = express.Router();

// Consulta saldo de pontos
fidelidadeRouter.get("/:clienteId", async (req, res) => {
  consultaSaldoPontos(req, res);
});

// Adiciona pontos
fidelidadeRouter.post("/adicionar/:clienteId", async (req, res) => {
  adicionarPontos(req, res);
});

// Resgata pontos
fidelidadeRouter.post("/resgatar/:clienteId", async (req, res) => {
  resgataPontos(req, res);
});

export default fidelidadeRouter;