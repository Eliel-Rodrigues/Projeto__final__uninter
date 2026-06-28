import express from "express";
import { criarProdutos, listaProdutos, buscarProduto, atualizarProduto, excluirProduto } from "../services/produtos.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const produtoRouter = express.Router();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto (apenas ADMIN)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: ""
 *               preco:
 *                 type: number
 *                 format: float
 *                 example: 3500.00
 *               estoque:
 *                 type: integer
 *                 example: 10
 *               unidadeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object               
 *               properties:
 *                 message: 
 *                   type: string
 *                 pedido:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       preco:
 *                         type: number
 *                         format: float  
 *                       estoque:
 *                         type: integer    
 *                       unidadeId:
 *                         type: integer                           
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       403:
 *         description: Acesso negado (role insuficiente)
 */
produtoRouter.post("/", autenticar, autorizarRoles(["ADMIN"]), async (req, res) => {
  criarProdutos(req, res);
});

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 produdo:
 *                   type:"object"
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   estoque:
 *                     type: number
 *                   preco:
 *                     type: number
 *                     format: float
 *                   unidadeId:
 *                     type: number                   
 */
produtoRouter.get("/", autenticar, async (req, res) => {
  listaProdutos(req, res);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 preco:
 *                   type: number
 *                 estoque:
 *                   type: integer
 *                 unidadeId:
 *                   type: integer
 *       404:
 *         description: Produto não encontrado
 */
produtoRouter.get("/:id", autenticar, async (req, res) => {
  buscarProduto(req, res);
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente (apenas ADMIN)
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
 *               nome:
 *                 type: string
 *                 example: "Bife ao molho madeira"
 *               preco:
 *                 type: number
 *                 example: 39.00
 *               estoque:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 preco:
 *                   type: number
 *                 estoque:
 *                   type: integer
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       403:
 *         description: Acesso negado (role insuficiente)
 *       404:
 *         description: Produto não encontrado
 */
produtoRouter.put("/:id", autenticar, autorizarRoles(["ADMIN"]), async (req, res) => {
  atualizarProduto(req, res);
});

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto existente (apenas ADMIN)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto excluído com sucesso (sem conteúdo)
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       403:
 *         description: Acesso negado (role insuficiente)
 *       404:
 *         description: Produto não encontrado
 */
produtoRouter.delete("/:id", autenticar, autorizarRoles(["ADMIN"]), async (req, res) => {
  excluirProduto(req, res);
});

export default produtoRouter;