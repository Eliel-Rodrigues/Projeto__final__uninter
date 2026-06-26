import express from "express";
import { adicionarPontos, consultaSaldoPontos, resgataPontos } from "../services/fidelidade.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const fidelidadeRouter = express.Router();

/**
 * @swagger
 * /fidelidade/pontos/{clienteId}:
 *   get:
 *     summary: Consulta saldo de pontos de fidelidade de um cliente (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Saldo de pontos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: integer
 *                 pontos:
 *                   type: integer
 *       500:
 *         description: Erro interno ao consultar saldo
 */
fidelidadeRouter.get("/pontos/:clienteId", autenticar,  async (req, res) => {
  consultaSaldoPontos(req, res);
});

/**
 * @swagger
 * /fidelidade/adicionar/{clienteId}:
 *   post:
 *     summary: Adiciona pontos de fidelidade a um cliente  (GERENTE, ATENDENTE)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pontos:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Pontos adicionados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fidelidade:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     clienteId:
 *                       type: integer
 *                     pontos:
 *                       type: integer
 *       400:
 *         description: Quantidade de pontos inválida
 *       500:
 *         description: Erro interno ao adicionar pontos
 */
fidelidadeRouter.post("/adicionar/:clienteId", autenticar, autorizarRoles(["GERENTE", "ATENDENTE"]), async (req, res) => {
  adicionarPontos(req, res);
});

/**
 * @swagger
 * /fidelidade/resgatar/{clienteId}:
 *   post:
 *     summary: Resgata pontos de fidelidade de um cliente (CLIENTE) 
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pontos:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Resgate realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fidelidade:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     clienteId:
 *                       type: integer
 *                     pontos:
 *                       type: integer
 *       400:
 *         description: Quantidade de pontos inválida
 *       409:
 *         description: Pontos insuficientes
 *       500:
 *         description: Erro interno ao resgatar pontos
 */
fidelidadeRouter.post("/resgatar/:clienteId",  autenticar, autorizarRoles(["CLIENTE"]), async (req, res) => {
  resgataPontos(req, res);
});

export default fidelidadeRouter;