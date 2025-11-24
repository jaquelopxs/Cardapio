import React, { useState } from "react";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import LoginAdmin from "./pages/LoginAdmin";
import AdminPedidos from "./pages/AdminPedidos";
import StatusPedido from "./pages/StatusPedido";   // IMPORTANTE

function App() {
  const [pagina, setPagina] = useState("cardapio");
  const [carrinho, setCarrinho] = useState([]);
  const [pedidoId, setPedidoId] = useState(null);
  const [logado, setLogado] = useState(
    !!localStorage.getItem("token") // mantém admin logado
  );

  // =====================================================
  // CARRINHO
  // =====================================================
  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  function removerItem(index) {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  }

  async function enviarPedido() {
    const nome_cliente = prompt("Digite seu nome:");
    const telefone = prompt("Digite seu telefone:");
    const forma_pagamento = prompt("Forma de pagamento:");

    const itens = carrinho.map((item) => ({
      produto_id: item.id,
      quantidade: 1
    }));

    const pedido = {
      nome_cliente,
      telefone,
      forma_pagamento,
      itens
    };

    const resposta = await fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    const dados = await resposta.json();
    alert("Pedido enviado! Número: " + dados.pedido_id);

    // 🔥 CORREÇÃO AQUI!!!
    setCarrinho([]);
    setPedidoId(dados.pedido_id);
    setPagina("status");   // NÃO VOLTA MAIS PARA CARDÁPIO
  }

  // =====================================================
  // LOGIN / LOGOUT
  // =====================================================
  function logout() {
    localStorage.removeItem("token");
    setLogado(false);
    setPagina("cardapio");
  }

  // =====================================================
  // LAYOUT / BOTÕES
  // =====================================================
  const estiloBotao = {
    padding: "10px 20px",
    borderRadius: "8px",
    margin: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* ================================================
          MENU SUPERIOR
      ================================================= */}
      <button
        onClick={() => setPagina("cardapio")}
        style={{ ...estiloBotao, background: "#007bff", color: "#fff" }}
      >
        Ver Cardápio
      </button>

      <button
        onClick={() => setPagina("carrinho")}
        style={{ ...estiloBotao, background: "#ffc107", color: "#000" }}
      >
        Carrinho ({carrinho.length})
      </button>

      {/* Botão admin */}
      <button
        onClick={() => setPagina("login")}
        style={{ ...estiloBotao, background: "#6c63ff", color: "#fff" }}
      >
        Admin
      </button>

      <button
        onClick={() => setPagina("adminPedidos")}
        style={{
          ...estiloBotao,
          background: "#17a2b8",
          color: "#fff"
        }}
      >
        Pedidos
      </button>

      {/* Logout aparece só para admin logado */}
      {logado && (
        <button
          onClick={logout}
          style={{ ...estiloBotao, background: "#dc3545", color: "#fff" }}
        >
          Logout
        </button>
      )}

      {/* ================================================
          RENDERIZAÇÃO DAS PÁGINAS
      ================================================= */}
      {pagina === "cardapio" && (
        <Cardapio adicionar={adicionar} />
      )}

      {pagina === "carrinho" && (
        <Carrinho
          itens={carrinho}
          remover={removerItem}
          finalizar={enviarPedido}
        />
      )}

      {pagina === "adminPedidos" && <AdminPedidos />}

      {pagina === "login" && (
        <LoginAdmin
          onLogin={() => {
            setLogado(true);
            setPagina("cardapio");
          }}
        />
      )}

      {pagina === "status" && (
        <StatusPedido pedidoId={pedidoId} />
      )}
    </div>
  );
}

export default App;
