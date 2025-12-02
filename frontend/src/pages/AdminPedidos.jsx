import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { io } from "socket.io-client";


export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // =============================
  // 1. Buscar pedidos do banco
  // =============================
  async function carregarPedidos() {
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/pedidos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resp.ok) {
        console.error("Erro ao buscar pedidos");
        return;
      }

      const dados = await resp.json();
      setPedidos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error("Erro ao conectar com servidor:", error);
    }
  }

useEffect(() => {
  carregarPedidos();

  const socket = io("http://localhost:3000");

  socket.on("novo_pedido", (pedido) => {
    setPedidos((prev) => [pedido, ...prev]);

    setModal({
      isOpen: true,
      title: "Novo Pedido!",
      message: `Cliente ${pedido.cliente} enviou um pedido de R$ ${pedido.total}`,
      type: "success"
    });
  });

  return () => socket.disconnect();
}, []);
  // =============================
  // 2. Atualizar status via banco
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

      if (resp.ok) {
        carregarPedidos();
      } else {
        setModal({
          isOpen: true,
          title: "Erro",
          message: "Não foi possível atualizar o status.",
          type: "warning"
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Erro de conexão",
        message: "Não foi possível comunicar com o servidor.",
        type: "warning"
      });
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
  }

  const pedidosFiltrados =
    filtroStatus === "todos"
      ? pedidos
      : pedidos.filter((p) => p.status === filtroStatus);

const statusColors = {
  recebido: {
    background: "#f12207c5",
    color: "#000000ff",
    width: "40px",
    height: "50px",
    borderRadius: "50%", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  em_preparo: {
    background: "#ff8c00ff",
    color: "#000000ff",
    width: "40px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  pronto: {
    background: "#85df3cff",
    color: "#000000ff",
    width: "40px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  entregue: {
    background: "#2681e9c0",
    color: "#000000ff",
    width: "40px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
};
  const statusLabels = {
    recebido: "Recebido",
    em_preparo: "Em Preparo",
    pronto: "Pronto",
    entregue: "Entregue",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div
        style={{
          background: "#5A0B1E",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>
              Painel Administrativo
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
              Gerenciamento de Pedidos
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => navigate("/admin/produtos")}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Gerenciar Produtos
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                background: "#9e1616ff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Filtros */}
        <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <button
            onClick={() => setFiltroStatus("todos")}
            style={{
              padding: "8px 24px",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: filtroStatus === "todos" ? "#5A0B1E" : "white",
              color: filtroStatus === "todos" ? "white" : "#374151",
              boxShadow:
                filtroStatus === "todos"
                  ? "0 4px 12px rgba(90,11,30,0.3)"
                  : "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            Todos ({pedidos.length})
          </button>

          {Object.keys(statusLabels).map((status) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status)}
              style={{
                padding: "8px 24px",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                border: "none",
                background: filtroStatus === status ? "#5A0B1E" : "white",
                color: filtroStatus === status ? "white" : "#374151",
                boxShadow:
                  filtroStatus === status
                    ? "0 4px 12px rgba(90,11,30,0.3)"
                    : "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              {statusLabels[status]} (
                {pedidos.filter((p) => p.status === status).length}
              )
            </button>
          ))}
        </div>

        {/* Lista de pedidos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "24px"
          }}
        >
          {pedidosFiltrados.map((pedido) => (
            <div
              key={pedido.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Pedido #{pedido.id}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    {new Date(pedido.data_pedido).toLocaleString("pt-BR")}
                  </p>
                </div>

                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    ...statusColors[pedido.status]
                  }}
                >
                  {statusLabels[pedido.status]}
                </span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <p><strong>Cliente:</strong> {pedido.nome_cliente}</p>
                <p><strong>Telefone:</strong> {pedido.telefone}</p>
                <p><strong>Pagamento:</strong> {pedido.forma_pagamento}</p>
              </div>

              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600" }}>Itens:</h4>
                <ul style={{ paddingLeft: 20 }}>
                  {pedido.itens?.map((item, i) => (
                    <li key={i}>
                      {item.quantidade}x {item.nome_produto} — R$ {item.subtotal}
                    </li>
                  ))}
                </ul>
              </div>

              <p
                style={{
                  marginTop: 16,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000000ff"
                }}
              >
                Total: R$ {Number(pedido.total).toFixed(2)}
              </p>

              {/* Botões */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: 16 }}>
                <button
                  onClick={() => atualizarStatus(pedido.id, "recebido")}
                  style={{ flex: "1 1 45%", background: "#5A0B1E", color: "white", padding: 8, borderRadius: 8 }}
                >
                  Recebido
                </button>

                <button
                  onClick={() => atualizarStatus(pedido.id, "em_preparo")}
                  style={{ flex: "1 1 45%", background: "#5A0B1E", color: "white", padding: 8, borderRadius: 8 }}
                >
                  Em Preparo
                </button>

                <button
                  onClick={() => atualizarStatus(pedido.id, "pronto")}
                  style={{ flex: "1 1 45%", background: "#5A0B1E", color: "white", padding: 8, borderRadius: 8 }}
                >
                  Pronto
                </button>

                <button
                  onClick={() => atualizarStatus(pedido.id, "entregue")}
                  style={{ flex: "1 1 45%", background: "#5A0B1E", color: "white", padding: 8, borderRadius: 8 }}
                >
                  Entregue
                </button>
              </div>
            </div>
          ))}
        </div>

        {pedidosFiltrados.length === 0 && (
          <div style={{ textAlign: "center", padding: 48 }}>
            <p style={{ fontSize: "20px", color: "#6b7280" }}>
              Nenhum pedido encontrado.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
