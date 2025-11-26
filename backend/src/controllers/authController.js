import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";
import { compararSenha } from "../utils/criptografia.js";

// =============================
// LOGIN DO ADMINISTRADOR
// =============================
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM admin WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const admin = result.rows[0];

    const senhaCorreta = await compararSenha(senha, admin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no processo de login" });
  }
};

// =============================
// RETORNAR DADOS DO ADMIN LOGADO
// =============================
export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nome, email FROM admin WHERE id = $1",
      [req.admin.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Erro ao buscar admin:", error);
    res.status(500).json({ error: "Erro ao buscar dados do administrador" });
  }
};
