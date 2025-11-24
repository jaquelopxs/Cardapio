import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto
} from "../controllers/adminProdutosController.js";

const router = express.Router();

router.get("/", listarProdutos);
router.post("/", auth, criarProduto);
router.put("/:id", auth, atualizarProduto);
router.delete("/:id", auth, deletarProduto);

export default router;
