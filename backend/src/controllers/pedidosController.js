import { pool } from "../config/db.js";


// =============================
// 1. CRIAR PEDIDO
// =============================
export const criarPedido = async (req, res) => {
  const { nome_cliente, telefone, forma_pagamento, itens } = req.body;

  if (!nome_cliente || !forma_pagamento || !itens || itens.length === 0) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Criar pedido
    const pedidoResult = await client.query(
      `INSERT INTO pedidos (nome_cliente, telefone, forma_pagamento)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [nome_cliente, telefone, forma_pagamento]
    );

    const pedido_id = pedidoResult.rows[0].id;

    let total_pedido = 0;

    // Inserir itens do pedido
    for (const item of itens) {
      const { produto_id, quantidade } = item;

      const produto = await client.query(
        "SELECT preco FROM produtos WHERE id = $1",
        [produto_id]
      );

      if (produto.rows.length === 0) {
        throw new Error(`Produto ${produto_id} não encontrado`);
      }

      const preco = produto.rows[0].preco;
      const subtotal = preco * quantidade;
      total_pedido += subtotal;

      await client.query(
        `INSERT INTO itens_pedido 
         (pedido_id, produto_id, quantidade, subtotal)
         VALUES ($1, $2, $3, $4)`,
        [pedido_id, produto_id, quantidade, subtotal]
      );
    }

    // Atualizar total do pedido
    await client.query(
      "UPDATE pedidos SET total = $1 WHERE id = $2",
      [total_pedido, pedido_id]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      pedido_id,
      total: total_pedido,
    });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  } finally {
    client.release();
  }
};



// =============================
// 2. LISTAR PEDIDOS
// =============================
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await pool.query("SELECT * FROM pedidos ORDER BY id DESC");
    res.json(pedidos.rows);

  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};



// =============================
// 3. ATUALIZAR STATUS
// =============================
export const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusPermitidos = ["pendente", "em_preparo", "enviado", "finalizado"];

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    await pool.query(
      "UPDATE pedidos SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.json({ message: "Status atualizado com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
};
