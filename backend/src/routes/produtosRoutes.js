import express from "express";
import {
  listarProdutos,
  criarProduto
} from "../controllers/produtosController.js";

const router = express.Router();

// Listar produtos
router.get("/", listarProdutos);

// Criar novo produto
router.post("/", criarProduto);

export default router;
