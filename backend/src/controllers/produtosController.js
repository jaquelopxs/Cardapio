import { pool } from "../config/db.js";

// =====================================
// LISTAR PRODUTOS (CLIENTE E ADMIN)
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
// CRIAR NOVO PRODUTO (APENAS ADMIN)
// =====================================
export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, imagem } = req.body;

    // Validações
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

    const valores = [nome, descricao, preco, categoria, imagem || null];

    const resultado = await pool.query(query, valores);

    res.status(201).json({
      message: "Produto criado com sucesso!",
      produto: resultado.rows[0]
    });

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// =====================================
// ATUALIZAR PRODUTO (APENAS ADMIN)
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

    const valores = [nome, descricao, preco, categoria, imagem || null, id];

    const resultado = await pool.query(query, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json({
      message: "Produto atualizado com sucesso!",
      produto: resultado.rows[0]
    });

  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// =====================================
// DELETAR PRODUTO (APENAS ADMIN)
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

    res.json({
      message: "Produto deletado com sucesso!",
      produto: resultado.rows[0]
    });

  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};