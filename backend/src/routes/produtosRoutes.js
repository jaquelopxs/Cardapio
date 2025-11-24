console.log("ROTAS DE PRODUTOS CARREGADAS DE:", import.meta.url);

import express from "express";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, listarProdutos);
router.post("/", authMiddleware, criarProduto);

// TESTE — ADICIONADO AGORA
router.put("/:id", authMiddleware, atualizarProduto);

router.delete("/:id", authMiddleware, deletarProduto);

export default router;
