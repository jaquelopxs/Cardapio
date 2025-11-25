import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import LoginAdmin from "./pages/LoginAdmin";
import AdminPedidos from "./pages/AdminPedidos";
import StatusPedido from "./pages/StatusPedido";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [logado, setLogado] = useState(!!localStorage.getItem("token"));

  // =====================================================
  // ADICIONAR AO CARRINHO
  // =====================================================
  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  // =====================================================
  // REMOVER ITEM DO CARRINHO
  // =====================================================
  function removerItem(index) {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  }

  // =====================================================
  // ENVIAR PEDIDO PARA O BACKEND
  // =====================================================
  async function enviarPedido() {
    const nome_cliente = prompt("Digite seu nome:");
    const telefone = prompt("Digite seu telefone:");
    const forma_pagamento = prompt("Forma de pagamento:");

    if (!nome_cliente || !telefone) {
      alert("Preencha os dados corretamente.");
      return null;
    }

    const itens = carrinho.map((item) => ({
      produto_id: item.id,
      quantidade: item.quantidade || 1,
    }));

    const pedido = { nome_cliente, telefone, forma_pagamento, itens };

    try {
      const resposta = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert("Erro ao enviar pedido: " + dados.error);
        return null;
      }

      alert("Pedido enviado! Número: " + dados.pedido_id);

      setCarrinho([]);
      return dados; // <-- necessário pro Carrinho redirecionar
    } catch (error) {
      alert("Erro de conexão com o servidor.");
      return null;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setLogado(false);
  }

  // =====================================================
  // ESTILO DO MENU SUPERIOR
  // =====================================================
  const estiloBotao = {
    padding: "10px 20px",
    borderRadius: "8px",
    margin: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* =====================================================
          MENU SUPERIOR
      ===================================================== */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ ...estiloBotao, background: "#007bff", color: "#fff" }}>
          Ver Cardápio
        </button>
      </Link>

      <Link to="/carrinho" style={{ textDecoration: "none" }}>
        <button style={{ ...estiloBotao, background: "#ffc107", color: "#000" }}>
          Carrinho ({carrinho.length})
        </button>
      </Link>

      <Link to="/login" style={{ textDecoration: "none" }}>
        <button style={{ ...estiloBotao, background: "#6c63ff", color: "#fff" }}>
          Admin
        </button>
      </Link>

      <Link to="/admin" style={{ textDecoration: "none" }}>
        <button style={{ ...estiloBotao, background: "#17a2b8", color: "#fff" }}>
          Pedidos
        </button>
      </Link>

      {logado && (
        <button
          onClick={logout}
          style={{ ...estiloBotao, background: "#dc3545", color: "#fff" }}
        >
          Logout
        </button>
      )}

      {/* =====================================================
          ROTAS
      ===================================================== */}
      <Routes>
        <Route path="/" element={<Cardapio adicionar={adicionar} />} />

        <Route
          path="/carrinho"
          element={
            <Carrinho
              itens={carrinho}
              remover={removerItem}
              finalizar={enviarPedido}
            />
          }
        />

        <Route path="/login" element={<LoginAdmin onLogin={() => setLogado(true)} />} />

        <Route path="/admin" element={<AdminPedidos />} />

        <Route path="/status/:id" element={<StatusPedido />} />
      </Routes>

    </div>
  );
}

export default App;
