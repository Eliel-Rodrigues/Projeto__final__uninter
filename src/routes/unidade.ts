import express from "express";
import { buscarUnidade, criarUnidades, listaUnidades } from "../services/unidades.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const unidadeRouter = express.Router();

/**
 * @swagger
 * /unidades:
 *   post:
 *     summary: Cria uma nova unidade (GERENTE, ADMIN)
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
 *                 example: "Raízes do Nodeste"
 *               cidade:
 *                 type: string
 *                 example: "Recife"
 *               cep:
 *                 type: string
 *                 example: "50000-000"
 *     responses:
 *       201:
 *         description: Unidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 cidade:
 *                   type: string
 *                 cep:
 *                   type: string
 *       403:
 *         description: CEP já existente, não foi possível criar a unidade
 */
unidadeRouter.post("/", autenticar, autorizarRoles(["ADMIN"]), async (req, res) => {
  criarUnidades(req, res);
});

/**
 * @swagger
 * /unidades:
 *   get:
 *     summary: Lista todas as unidades (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     responses:
 *       200:
 *         description: Lista de unidades retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   endereco:
 *                     type: string
 *                   cep:
 *                     type: string
 *       500:
 *         description: Erro interno ao buscar unidades
 */
unidadeRouter.get("/", autenticar, async (req, res) => {
  listaUnidades(req, res);
});


/**
 * @swagger
 * /unidades/{id}:
 *   get:
 *     summary: Busca uma unidade pelo ID (Usuário precisa está logado)
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
 *         description: Unidade encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 endereco:
 *                   type: string
 *                 cep:
 *                   type: string
 *       404:
 *         description: Unidade não encontrada
 */
unidadeRouter.get("/:id", autenticar, async (req, res) => {
  buscarUnidade(req, res);
});

export default unidadeRouter;