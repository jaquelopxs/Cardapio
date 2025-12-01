import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  listarProdutos,
  listarPorCategoria,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtosController.js";

const router = express.Router();

// ------------------------
// Rotas abertas (cliente)
// ------------------------
router.get("/", listarProdutos);
router.get("/categoria/:categoria", listarPorCategoria);

// ------------------------
// Rotas protegidas (admin)
// ------------------------
router.post("/", authMiddleware, criarProduto);
router.put("/:id", authMiddleware, atualizarProduto);
router.delete("/:id", authMiddleware, deletarProduto);

export default router;
