import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./src/config/db.js";
import pedidosRoutes from "./src/routes/pedidosRoutes.js";

// Rotas
import produtosRoutes from "./src/routes/produtosRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor do Cardápio Digital está funcionando!");
});

// Teste de conexão com banco
pool.connect()
  .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

// Rotas organizadas
app.use("/produtos", produtosRoutes);

// Subir servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use("/pedidos", pedidosRoutes);
