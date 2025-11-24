import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto
} from "../controllers/adminProdutosController.js";

const router = express.Router();

router.get("/", listarProdutos);
router.post("/", authMiddleware, criarProduto);
router.put("/:id", authMiddleware, atualizarProduto);
router.delete("/:id", authMiddleware, deletarProduto);

export default router;
