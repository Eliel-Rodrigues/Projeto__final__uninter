import express from "express";

const pagamentoRouter = express.Router();

pagamentoRouter.post("/mock", async (req, res) => {
  const aprovado = Math.random() > 0.3;
  res.json({ status: aprovado ? "APROVADO" : "NEGADO" });
});

pagamentoRouter.post("/confirmacao", async (req, res) => {
  res.json({ mensagem: "Pagamento confirmado (simulado)" });
});

export default pagamentoRouter;