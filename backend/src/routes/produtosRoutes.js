import express from "express";
import {
  criarPedido,
  listarPedidos,
  atualizarStatus,
  buscarPedidoPorId,
  buscarPedidosPorTelefone
} from "../controllers/pedidoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar pedido (cliente)
router.post("/", criarPedido);

// Listar pedidos (admin)
router.get("/", authMiddleware, listarPedidos);

// Buscar pedidos pelo telefone (cliente)
router.get("/telefone/:telefone", buscarPedidosPorTelefone);

// Buscar pedido por ID (cliente ou admin)
router.get("/:id", buscarPedidoPorId);

// Atualizar status (apenas admin)
router.put("/:id/status", authMiddleware, atualizarStatus);

export default router;
