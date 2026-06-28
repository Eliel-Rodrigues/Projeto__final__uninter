import express from "express";
import { entradaEstoque, saidaEstoque, consultaEstoque, consultaEstoqueUnidade } from "../services/estoque.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const estoqueRouter = express.Router();

/**
 * @swagger
 * /estoque/entrada/{id}:
 *   post:
 *     summary: Registra entrada de estoque para um produto (apenas GERENTE, ADMIN)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Estoque atualizado com sucesso
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  produto:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      nome:
 *                        type: string
 *                      preco:
 *                        type: integer
 *                      estoque:
 *                        type: integer
 *                      unidadeId:
 *                        type: integer
 *       400:
 *         description: Quantidade inválida
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno ao registrar entrada de estoque
 */
estoqueRouter.post("/entrada/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN"]), async (req, res) => {
  entradaEstoque(req, res);
});
/**
 * @swagger
 * /estoque/saida/{id}:
 *   post:
 *     summary: Registra saída de estoque para um produto (apenas GERENTE, ADMIN ou ATENDENTE)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Saída de estoque registrada com sucesso
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  produto:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      nome:
 *                        type: string
 *                      preco:
 *                        type: integer
 *                      estoque:
 *                        type: integer
 *                      unidadeId:
 *                        type: integer
 *       400:
 *         description: Quantidade inválida
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: Estoque insuficiente
 *       500:
 *         description: Erro interno ao registrar saída de estoque
 */
estoqueRouter.post("/saida/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN", "ATENDENTE"]), async (req, res) => {
  saidaEstoque(req, res);
});

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Consulta estoque de todos os produtos (apenas GERENTE, ADMIN ou ATENDENTE)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 produtos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       preco:
 *                         type: integer
 *                       estoque:
 *                         type: integer
 *                       unidadeId:
 *                         type: integer
 *       404:
 *         description: Nenhum produto encontrado
 *       500:
 *         description: Erro interno ao consultar estoque
 */
estoqueRouter.get("/", autenticar, autorizarRoles(["GERENTE", "ADMIN", "ATENDENTE"]), async (req, res) => {
  consultaEstoque(req, res);
});

/**
 * @swagger
 * /estoque/unidades/{id}:
 *   get:
 *     summary: Consulta estoque de produtos de uma unidade específica (apenas GERENTE, ADMIN ou ATENDENTE)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da unidade
 *     responses:
 *       200:
 *         description: Lista de produtos da unidade retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 unidadeId:
 *                   type: integer
 *                 produtos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       preco:
 *                         type: integer
 *                       estoque:
 *                         type: integer
 *                       unidadeId:
 *                         type: integer
 *       404:
 *         description: Nenhum produto encontrado para esta unidade
 *       500:
 *         description: Erro interno ao consultar estoque da unidade
 */
estoqueRouter.get("/unidades/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN", "ATENDENTE"]), async (req, res) => {
  consultaEstoqueUnidade(req, res);
});

export default estoqueRouter;