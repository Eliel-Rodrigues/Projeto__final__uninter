import dotenv from "dotenv";
import express from "express";
import { gerarToken } from "../services/auth.js";

dotenv.config();

const authRouter = express.Router();
// Rota de login 

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuário e geração de token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: eliel@example.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Token JWT válido por 1 hora
 *       401:
 *         description: Credenciais inválidas
 */

authRouter.post("/", async (req, res) => {
  gerarToken(req, res);

});

export default authRouter;
