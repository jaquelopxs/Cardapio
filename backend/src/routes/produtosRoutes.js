import express from "express";
import {
  listarProdutos,
  criarProduto
} from "../controllers/produtosController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas protegidas
router.get("/", auth, listarProdutos);
router.post("/", auth, criarProduto);

export default router;
