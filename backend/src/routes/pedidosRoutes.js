import express from "express";
import { 
  criarPedido,
  listarPedidos,
  atualizarStatus,
  buscarPedidoPorId
} from "../controllers/pedidosController.js";

const router = express.Router();

/**
 * @openapi
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 */
router.post("/", criarPedido);

/**
 * @openapi
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos com seus itens
 *     tags:
 *       - Pedidos
 */
router.get("/", listarPedidos);

/**
 * @openapi
 * /pedidos/{id}:
 *   get:
 *     summary: Retorna um pedido específico
 *     tags:
 *       - Pedidos
 */
router.get("/:id", buscarPedidoPorId);

/**
 * @openapi
 * /pedidos/{id}/status:
 *   put:
 *     summary: Atualiza o status do pedido
 *     tags:
 *       - Pedidos
 */
router.put("/:id/status", atualizarStatus);

export default router;
