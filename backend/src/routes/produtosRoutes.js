import express from "express";
import {
  listarProdutos,
  listarPorCategoria,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔓 Rotas públicas (cliente pode ver produtos)
router.get("/", listarProdutos);
router.get("/categoria/:categoria", listarPorCategoria);

// 🔐 Rotas protegidas (somente admin)
router.post("/", authMiddleware, criarProduto);
router.put("/:id", authMiddleware, atualizarProduto);
router.delete("/:id", authMiddleware, deletarProduto);

export default router;
