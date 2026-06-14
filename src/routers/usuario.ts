import express from "express";
import { criarUsuarios, perfilUsuario } from "../services/usuarios.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/", async (req, res) => {

  criarUsuarios(req, res);

});

usuarioRouter.get("/:id", async (req, res) => {
  perfilUsuario(req, res);
});

export default usuarioRouter;

