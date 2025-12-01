import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../data/mockData.json";
import Modal from "../components/Modal";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        console.warn("Backend não disponível, usando dados fictícios");
        setPedidos(mockData.pedidos);
        return;
      }

      const dados = await resp.json();
      setPedidos(dados);
    } catch (error) {
      console.warn("Erro ao conectar backend, usando dados fictícios:", error);
      setPedidos(mockData.pedidos);
    }
  }

  useEffect(() => {
    carregarPedidos();
    const intervalo = setInterval(carregarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

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
        setModal({ isOpen: true, title: "Aviso", message: "Erro ao atualizar status (modo offline)", type: "warning" });
        setPedidos(pedidos.map(p => p.id === id ? {...p, status: novoStatus} : p));
      }
    } catch (error) {
      setModal({ isOpen: true, title: "Modo Offline", message: "Alteracoes nao serao salvas no servidor", type: "warning" });
      setPedidos(pedidos.map(p => p.id === id ? {...p, status: novoStatus} : p));
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
  }

  const pedidosFiltrados = filtroStatus === "todos"
    ? pedidos
    : pedidos.filter(p => p.status === filtroStatus);

  const statusColors = {
    recebido: { background: '#dbeafe', color: '#1e40af' },
    em_preparo: { background: '#fef3c7', color: '#92400e' },
    pronto: { background: '#d1fae5', color: '#065f46' },
    entregue: { background: '#f3f4f6', color: '#374151' },
  };

  const statusLabels = {
    recebido: "Recebido",
    em_preparo: "Em Preparo",
    pronto: "Pronto",
    entregue: "Entregue",
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header Admin */}
      <div style={{ background: '#5A0B1E', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Painel Administrativo</h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Gerenciamento de Pedidos</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate("/admin/produtos")}
              style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              Gerenciar Produtos
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Filtros */}
        <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setFiltroStatus("todos")}
            style={{
              padding: '8px 24px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
              background: filtroStatus === "todos" ? '#5A0B1E' : 'white',
              color: filtroStatus === "todos" ? 'white' : '#374151',
              boxShadow: filtroStatus === "todos" ? '0 4px 12px rgba(90,11,30,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            Todos ({pedidos.length})
          </button>
          {Object.keys(statusLabels).map((status) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status)}
              style={{
                padding: '8px 24px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s',
                background: filtroStatus === status ? '#5A0B1E' : 'white',
                color: filtroStatus === status ? 'white' : '#374151',
                boxShadow: filtroStatus === status ? '0 4px 12px rgba(90,11,30,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              {statusLabels[status]} ({pedidos.filter(p => p.status === status).length})
            </button>
          ))}
        </div>

        {/* Lista de Pedidos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>Pedido #{pedido.id}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {new Date(pedido.data_pedido || Date.now()).toLocaleString('pt-BR')}
                  </p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: '600',
                  ...statusColors[pedido.status]
                }}>
                  {statusLabels[pedido.status]}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Cliente:</span> {pedido.nome_cliente}
                </p>
                <p style={{ fontSize: '14px', color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Telefone:</span> {pedido.telefone}
                </p>
                <p style={{ fontSize: '14px', color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Pagamento:</span> {pedido.forma_pagamento}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
                <h4 style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '8px' }}>Itens:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', paddingLeft: '20px' }}>
                  {pedido.itens?.map((item, i) => (
                    <li key={i} style={{ color: '#374151' }}>
                      {item.quantidade}x {item.nome_produto} - R$ {item.subtotal}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                  Total: R$ {Number(pedido.total).toFixed(2)}
                </p>
              </div>

              {/* Botões de Status */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  onClick={() => atualizarStatus(pedido.id, "recebido")}
                  style={{
                    flex: '1 1 45%',
                    padding: '8px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                >
                  Recebido
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, "em_preparo")}
                  style={{
                    flex: '1 1 45%',
                    padding: '8px 12px',
                    background: '#eab308',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#ca8a04'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#eab308'}
                >
                  Em Preparo
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, "pronto")}
                  style={{
                    flex: '1 1 45%',
                    padding: '8px 12px',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#16a34a'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#22c55e'}
                >
                  Pronto
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, "entregue")}
                  style={{
                    flex: '1 1 45%',
                    padding: '8px 12px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#6b7280'}
                >
                  Entregue
                </button>
              </div>
            </div>
          ))}
        </div>

        {pedidosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <p style={{ fontSize: '20px', color: '#6b7280' }}>Nenhum pedido encontrado.</p>
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
