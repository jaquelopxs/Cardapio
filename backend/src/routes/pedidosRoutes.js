import express from "express";
import {
  criarPedido,
  listarPedidos,
  atualizarStatus
} from "../controllers/pedidosController.js";

const router = express.Router();

// Criar um novo pedido
router.post("/", criarPedido);

// Listar todos os pedidos
router.get("/", listarPedidos);

// Atualizar status de um pedido
router.put("/:id/status", atualizarStatus);

export default router;
