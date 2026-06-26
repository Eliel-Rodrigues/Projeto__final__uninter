import express from "express";
import { comprovantePagamento, pagamentoMock } from "../services/pagamento.js";
import { autenticar } from "../services/auth.js";

const pagamentoRouter = express.Router();

/**
 * @swagger
 * /pagamento/mock/{id}:
 *   post:
 *     summary: Realiza o pagamento de um pedido (mock) (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pagamento:
 *                 type: number
 *                 format: float
 *                 example: 150.00
 *               metodo:
 *                 type: string
 *                 example: "CARTAO"
 *     responses:
 *       201:
 *         description: Pagamento registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 valor:
 *                   type: number
 *                   format: float
 *                 metodo:
 *                   type: string
 *                 status:
 *                   type: string
 *                 pedidoId:
 *                   type: integer
 *       404:
 *         description: Pedido não encontrado
 *       409:
 *         description: Pagamento já efetuado ou não aprovado
 */
pagamentoRouter.post("/mock/:id", autenticar, async (req, res) => {
  pagamentoMock(req, res);
});


/**
 * @swagger
 * /pagamento/comprovante/{id}:
 *   get:
 *     summary: Retorna o comprovante de pagamento de um pedido (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Comprovante encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comprovante:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     valor:
 *                       type: number
 *                       format: float
 *                     metodo:
 *                       type: string
 *                     status:
 *                       type: string
 *                     pedidoId:
 *                       type: integer
 *       404:
 *         description: Comprovante não encontrado ou pagamento não aprovado
 */
pagamentoRouter.get("/comprovante/:id", autenticar, async (req, res) => {
  comprovantePagamento(req, res);
});

export default pagamentoRouter;