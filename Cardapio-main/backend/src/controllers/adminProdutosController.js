import { pool } from "../config/db.js";

// Listar todos
export const listarProdutos = async (req, res) => {
  const resultado = await pool.query(
    "SELECT * FROM produtos ORDER BY id ASC"
  );
  res.json(resultado.rows);
};

// Listar por categoria
export const listarPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  const resultado = await pool.query(
    "SELECT * FROM produtos WHERE categoria = $1 ORDER BY id ASC",
    [categoria]
  );

  res.json(resultado.rows);
};

// Criar
export const criarProduto = async (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;

  const query = `
    INSERT INTO produtos (nome, descricao, preco, categoria)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  const valores = [nome, descricao, preco, categoria];
  const produto = await pool.query(query, valores);

  res.status(201).json(produto.rows[0]);
};

// Atualizar
export const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria } = req.body;

  const query = `
    UPDATE produtos
    SET nome=$1, descricao=$2, preco=$3, categoria=$4
    WHERE id=$5
    RETURNING *`;

  const valores = [nome, descricao, preco, categoria, id];
  const produto = await pool.query(query, valores);

  res.json(produto.rows[0]);
};

// Deletar
export const deletarProduto = async (req, res) => {
  await pool.query("DELETE FROM produtos WHERE id = $1", [req.params.id]);
  res.json({ message: "Produto removido" });
};
