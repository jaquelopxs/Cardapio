import React, { useEffect, useState } from "react";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem("token");

  // =============================
  // 1. Buscar pedidos
  // =============================
  async function carregarPedidos() {
    const resp = await fetch("http://localhost:3000/pedidos");
    const dados = await resp.json();
    setPedidos(dados);
  }

  useEffect(() => {
    carregarPedidos();

    // Atualização automática a cada 5 segundos
    const intervalo = setInterval(carregarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  // =============================
  // 2. Atualizar status
  // =============================
  async function atualizarStatus(id, novoStatus) {
    const resp = await fetch(`http://localhost:3000/pedidos/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: novoStatus })
    });

    if (resp.ok) {
      alert("Status atualizado!");
      carregarPedidos();
    } else {
      alert("Erro ao atualizar status.");
    }
  }

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
            background: "#fff"
          }}
        >
          <h3>Pedido #{pedido.id}</h3>
          <p><strong>Cliente:</strong> {pedido.nome_cliente}</p>
          <p><strong>Telefone:</strong> {pedido.telefone}</p>
          <p><strong>Forma de pagamento:</strong> {pedido.forma_pagamento}</p>
          <p><strong>Total:</strong> R$ {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>

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
              onClick={() => atualizarStatus(pedido.id, "pendente")}
              style={{ marginRight: "8px" }}
            >
              Pendente
            </button>

            <button
              onClick={() => atualizarStatus(pedido.id, "em_preparo")}
              style={{ marginRight: "8px" }}
            >
              Em Preparo
            </button>

            <button
              onClick={() => atualizarStatus(pedido.id, "enviado")}
              style={{ marginRight: "8px" }}
            >
              Enviar
            </button>

            <button
              onClick={() => atualizarStatus(pedido.id, "finalizado")}
            >
              Finalizar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
