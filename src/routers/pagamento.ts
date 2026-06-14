import express from "express";
import { confimacaoPagamento, pagamentoMock } from "../services/pagamento.js";

const pagamentoRouter = express.Router();

pagamentoRouter.post("/mock", async (req, res) => {
  pagamentoMock(req, res);
});

pagamentoRouter.post("/confirmacao", async (req, res) => {
  confimacaoPagamento(req, res);
});

export default pagamentoRouter;