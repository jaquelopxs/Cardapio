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
