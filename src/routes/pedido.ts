import express from "express";
import { criarPedido, listaPedidos, statusPedido } from "../services/pedidos.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const pedidoRouter = express.Router();

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               canal:
 *                 type: string
 *                 example: "APP"
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                       example: 10
 *                     quantidade:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: integer
 *                 canalPedido:
 *                   type: string
 *                 status:
 *                   type: string
 *                 valorTotal:
 *                   type: integer
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       pedidoId:
 *                         type: integer
 *                       produtoId:
 *                         type: integer
 *                       quantidade:
 *                         type: integer
 *       400:
 *         description: Não foi possível criar o pedido
 *       404: 
 *         description: Produto não encontrado
 *       409: 
 *         description: Estoque insuficiente
 */
pedidoRouter.post("/", autenticar, async (req, res) => {
    const { clienteId, canal, itens } = req.body;
    const pedido = await criarPedido(res, clienteId, canal, itens);
    if (!pedido) {
     return res.status(400).json({ message: "Nao foi possível criar esse pedido" });
    }
    return res.status(201).json({ massage: "Pedido criado com sucesso" , pedido});
});
  

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza o status de um pedido (GERENTE, ADMIN ou ATENDENTE)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     tags: [Pedidos]
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
 *               status:
 *                 type: string
 *                 example: "PAGO"
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: integer
 *                 canalPedido:
 *                   type: string
 *                 status:
 *                   type: string
 *                 valorTotal:
 *                    type: number
 *                    format: float
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       403:
 *         description: Acesso negado (role insuficiente)
 *       404:
 *         description: Pedido não encontrado
 */
pedidoRouter.put("/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN", "ATENDENTE"]), async (req, res) => {
  statusPedido(req, res);
});

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista pedidos filtrados por canal e status
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: canalPedido
 *         schema:
 *           type: string
 *           enum: [ APP, TOTEM, BALCAO, PICKUP, WEB]
 *         description: Canal do pedido
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [AGUADANDO_PAGAMENTO, PAGO, RECUSADO]
 *         description: Status do pedido
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   clienteId:
 *                     type: integer
 *                   canalPedido:
 *                     type: string
 *                   status:
 *                     type: string
 *                   valorTotal:
 *                     type: number
 *                     format: float
 *             example:
 *                 pedidos:
 *                   - id: 1
 *                     produtoId: 69
 *                     pedidoId: 101
 *                     quantidade: 2
 *                   - id: 2
 *                     produtoId: 70
 *                     pedidoId: 101
 *                     quantidade: 1
 */



pedidoRouter.get("/", autenticar, async (req, res) => {
  listaPedidos(req, res);
});

export default pedidoRouter;

