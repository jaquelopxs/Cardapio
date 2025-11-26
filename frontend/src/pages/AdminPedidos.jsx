import React, { useEffect, useState } from "react";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem("token");

  // =============================
  // 1. Buscar pedidos (SEM condições!)
  // =============================
  async function carregarPedidos() {
    try {
      const resp = await fetch("http://localhost:3000/pedidos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        console.error("Erro ao buscar pedidos");
        return;
      }

      const dados = await resp.json();
      setPedidos(dados);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // =============================
  // 2. useEffect correto — SEM condições
  // =============================
  useEffect(() => {
    carregarPedidos();

    const intervalo = setInterval(() => {
      carregarPedidos();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []); // vazio → nunca condicional

  // =============================
  // 3. Atualizar status
  // =============================
  async function atualizarStatus(id, novoStatus) {
    try {
      const resp = await fetch(`http://localhost:3000/pedidos/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (resp.ok) carregarPedidos();
      else alert("Erro ao atualizar status");
    } catch (error) {
      alert("Erro de conexão ao atualizar status");
    }
  }

  // =============================
  // 4. Layout
  // =============================
  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos Recebidos</h1>

      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          style={{
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <h3>Pedido #{pedido.id}</h3>
          <p>
            <strong>Cliente:</strong> {pedido.nome_cliente}
          </p>
          <p>
            <strong>Telefone:</strong> {pedido.telefone}
          </p>
          <p>
            <strong>Forma de pagamento:</strong> {pedido.forma_pagamento}
          </p>
          <p>
            <strong>Total:</strong> R$ {pedido.total}
          </p>
          <p>
            <strong>Status:</strong> {pedido.status}
          </p>

          <h4>Itens:</h4>
          <ul>
            {pedido.itens?.map((item, i) => (
              <li key={i}>
                {item.nome_produto} — {item.quantidade}x (R$ {item.subtotal})
              </li>
            ))}
          </ul>

          {/* Botões de status */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => atualizarStatus(pedido.id, "recebido")}
              style={{ marginRight: "8px" }}
            >
              Recebido
            </button>

            <button
              onClick={() => atualizarStatus(pedido.id, "em_preparo")}
              style={{ marginRight: "8px" }}
            >
              Em Preparo
            </button>

            <button
              onClick={() => atualizarStatus(pedido.id, "pronto")}
              style={{ marginRight: "8px" }}
            >
              Pronto
            </button>

            <button onClick={() => atualizarStatus(pedido.id, "entregue")}>
              Entregue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
