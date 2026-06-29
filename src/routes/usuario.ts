import express from "express";
import { criarUsuarios, perfilUsuario } from "../services/usuarios.js";
import { autenticar } from "../services/auth.js";

const usuarioRouter = express.Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário (Frontend só libera o campo role pro ADMIN ou GERENTE)
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:            
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object               
 *               properties:
 *                 message: 
 *                   type: string
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string          
 *       403:
 *         description: Usuário não foi criado, tente novamente
 */

usuarioRouter.post("/", async (req, res) => {
  criarUsuarios(req, res);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um perfil usuário pelo ID (Usuário precisa está logado)
 *     security:
 *       - bearerAuth: []   # exige token JWT
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object               
 *               properties:
 *                 message: 
 *                   type: string
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 pedido:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       canalPedido:
 *                         type: string
 *                       crienteId:
 *                         type: integer
 *                       status:
 *                         type: string    
 *                       valorTotal:
 *                         type: number 
 *                         format: float   
 *                       fidelidade:
 *                         type: object
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             crienteId:
 *                               type: integer
 *                             pontos:
 *                               type: integer   
 *       404:
 *         description: Usuário não encontrado
 */
usuarioRouter.get("/:id", autenticar, async (req, res) => {
  perfilUsuario(req, res);
});

export default usuarioRouter;

