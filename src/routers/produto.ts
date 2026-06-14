import express from "express";
import { criarProdutos, listaProdutos, buscarProduto, atualizarProduto, excluirProduto} from "../services/produtos.js";
import { autenticar, autorizarRoles } from "../services/auth.js";

const produtoRouter = express.Router();

produtoRouter.post("/", autenticar, autorizarRoles(["GERENTE", "ADMIN"]), async (req, res) => {
  criarProdutos(req, res);
});

produtoRouter.get("/", async (req, res) => {
  listaProdutos(req, res);
});

produtoRouter.get("/:id", async (req, res) => {
  buscarProduto(req, res);
});

produtoRouter.put("/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN"]), async (req, res) => {
  atualizarProduto(req, res);
});

produtoRouter.delete("/:id", autenticar, autorizarRoles(["GERENTE", "ADMIN"]), async (req, res) => {
  excluirProduto(req, res);
});

export default produtoRouter;