import express from "express";
import { criarUnidades, listaUnidades } from "../services/unidades.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const unidadeRouter = express.Router();

unidadeRouter.post("/", autenticar, autorizarRoles(["ADMIN", "GERENTE"]), async (req, res) => {
  criarUnidades(req, res);
});

unidadeRouter.get("/", async (req, res) => {
  listaUnidades(req, res);
});

export default unidadeRouter;