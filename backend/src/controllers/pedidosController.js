import { pool } from "../config/db.js";


// ==================================================
// 1. CRIAR PEDIDO (CLIENTE)
// ==================================================
export const criarPedido = async (req, res) => {
  const { nome_cliente, telefone, forma_pagamento, itens } = req.body;

  if (!nome_cliente || !forma_pagamento || !itens || itens.length === 0) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Criar pedido com status inicial RECEBIDO
    const pedidoResult = await client.query(
      `INSERT INTO pedidos (nome_cliente, telefone, forma_pagamento, status)
       VALUES ($1, $2, $3, 'recebido')
       RETURNING id`,
      [nome_cliente, telefone, forma_pagamento]
    );

    const pedido_id = pedidoResult.rows[0].id;

    let total_pedido = 0;

    for (const item of itens) {
      const { produto_id, quantidade } = item;

      const produto = await client.query(
        "SELECT nome, preco FROM produtos WHERE id = $1",
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

    // Atualizar total
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



// ==================================================
// 2. LISTAR PEDIDOS (ADMIN)
// ==================================================
export const listarPedidos = async (req, res) => {
  try {
    const sql = `
      SELECT 
        p.id,
        p.data_pedido,
        p.status,
        p.total,
        p.nome_cliente,
        p.telefone,
        p.forma_pagamento,
        json_agg(
          json_build_object(
            'produto_id', ip.produto_id,
            'quantidade', ip.quantidade,
            'subtotal', ip.subtotal,
            'nome_produto', pr.nome
          )
        ) AS itens
      FROM pedidos p
      JOIN itens_pedido ip ON ip.pedido_id = p.id
      JOIN produtos pr ON pr.id = ip.produto_id
      GROUP BY p.id
      ORDER BY p.id DESC;
    `;

    const resultado = await pool.query(sql);
    res.json(resultado.rows);

  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};



// ==================================================
// 3. ATUALIZAR STATUS (ADMIN)
// ==================================================
export const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusPermitidos = ["recebido", "em_preparo", "pronto", "entregue"];

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    await pool.query(
      "UPDATE pedidos SET status = $1 WHERE id = $2",
      [status, id]
    );

    // Registrar histórico
    await pool.query(
      `INSERT INTO historico_status (pedido_id, status, alterado_por)
       VALUES ($1, $2, $3)`,
      [id, status, req.user.id] // middleware JWT manda req.user.id
    );

    res.json({ message: "Status atualizado com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
};

export const buscarPedidoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT 
        p.id,
        p.data_pedido,
        p.status,
        p.total,
        p.nome_cliente,
        p.telefone,
        p.forma_pagamento,
        json_agg(
          json_build_object(
            'produto_id', ip.produto_id,
            'quantidade', ip.quantidade,
            'subtotal', ip.subtotal,
            'nome_produto', pr.nome
          )
        ) AS itens
      FROM pedidos p
      JOIN itens_pedido ip ON ip.pedido_id = p.id
      JOIN produtos pr ON pr.id = ip.produto_id
      WHERE p.id = $1
      GROUP BY p.id;
    `;

    const result = await pool.query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
};