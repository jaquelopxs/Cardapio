import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./src/config/db.js";

// Rotas
import pedidosRoutes from "./src/routes/pedidosRoutes.js";
import produtosRoutes from "./src/routes/produtosRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

// Swagger
import { swaggerDocs } from "./src/swagger/swagger.js";

// Carregar variáveis de ambiente
dotenv.config();

// Criar app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor do Cardápio Digital está funcionando!");
});

// Teste de conexão com o banco
pool.connect()
  .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

// Rotas principais
app.use("/auth", authRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidosRoutes);

// Porta
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  swaggerDocs(app); // Ajustado
});
