import dotenv from "dotenv";
import express from "express";
import { gerarToken } from "../services/auth.js";

dotenv.config();

const authRouter = express.Router();

// Rota de login
authRouter.post("/", async (req, res) => {
  gerarToken(req, res);
  
});

export default authRouter;
