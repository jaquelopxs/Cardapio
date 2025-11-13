import { pool } from "../config/db.js";


// =============================
// LISTAR PRODUTOS
// =============================
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


// =============================
// CRIAR NOVO PRODUTO
// =============================
export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria } = req.body;

    const query = `
      INSERT INTO produtos (nome, descricao, preco, categoria)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const valores = [nome, descricao, preco, categoria];

    const resultado = await pool.query(query, valores);

    res.status(201).json(resultado.rows[0]);

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};
