import { pool } from "../config/db.js";

// =====================================
// LISTAR TODOS OS PRODUTOS
// =====================================
export const listarProdutos = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM produtos ORDER BY id ASC"
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

// =====================================
// LISTAR PRODUTOS POR CATEGORIA
// =====================================
export const listarPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;

    const resultado = await pool.query(
      "SELECT * FROM produtos WHERE categoria = $1 ORDER BY id ASC",
      [categoria]
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error("Erro ao listar categoria:", error);
    res.status(500).json({ error: "Erro ao listar categoria" });
  }
};

// =====================================
// CRIAR PRODUTO
// =====================================
export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, imagem } = req.body;

    if (!nome || !preco || !categoria) {
      return res.status(400).json({
        error: "Nome, preço e categoria são obrigatórios."
      });
    }

    const query = `
      INSERT INTO produtos (nome, descricao, preco, categoria, imagem)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const valores = [
      nome,
      descricao || null,
      preco,
      categoria,
      imagem || null
    ];

    const resultado = await pool.query(query, valores);

    res.status(201).json(resultado.rows[0]);

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// =====================================
// ATUALIZAR PRODUTO
// =====================================
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoria, imagem } = req.body;

    const query = `
      UPDATE produtos
      SET nome = $1, descricao = $2, preco = $3, categoria = $4, imagem = $5
      WHERE id = $6
      RETURNING *;
    `;

    const valores = [
      nome,
      descricao || null,
      preco,
      categoria,
      imagem || null,
      id
    ];

    const resultado = await pool.query(query, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// =====================================
// DELETAR PRODUTO
// =====================================
export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json({ message: "Produto removido" });

  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
