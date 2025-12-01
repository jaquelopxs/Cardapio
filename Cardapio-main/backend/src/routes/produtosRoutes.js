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

// Listar todos os produtos (público)
router.get("/", listarProdutos);

// Listar produtos por categoria (público)
router.get("/categoria/:categoria", listarPorCategoria);

// Criar produto (admin)
router.post("/", authMiddleware, criarProduto);

// Atualizar produto (admin)
router.put("/:id", authMiddleware, atualizarProduto);

// Deletar produto (admin)
router.delete("/:id", authMiddleware, deletarProduto);

export default router;
