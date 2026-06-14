export const pagamentoMock = async (req: any, res: any) => {
  const aprovado = Math.random() > 0.3;
  return res.json({ status: aprovado ? "APROVADO" : "NEGADO" });
};
export const confimacaoPagamento = async (req: any, res: any) => {
  return res.json({ message: "Pagamento confirmado (simulado)" });
};
