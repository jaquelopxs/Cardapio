import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import mockData from "../data/mockData.json";

export default function MeusPedidos() {
  const [telefone, setTelefone] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!telefone || !carregado) return;
    
    const interval = setInterval(() => {
      buscarPedidos();
    }, 5000);

    return () => clearInterval(interval);
  }, [telefone, carregado]);

  async function buscarPedidos() {
    if (!telefone.trim()) {
      alert("Digite seu telefone");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/pedidos/telefone/${telefone}`);

      if (!res.ok) {
        // Tentar usar dados fictícios
        const pedidosFicticios = mockData.pedidos.filter(p => p.telefone === telefone);
        if (pedidosFicticios.length > 0) {
          setPedidos(pedidosFicticios);
          setErro("");
        } else {
          setErro("Nenhum pedido encontrado");
          setPedidos([]);
        }
        setCarregado(true);
        return;
      }

      const data = await res.json();
      setPedidos(data);
      setErro("");
    } catch {
      console.warn("Backend não disponível, tentando dados fictícios");
      // Usar dados fictícios se backend não estiver disponível
      const pedidosFicticios = mockData.pedidos.filter(p => p.telefone === telefone);
      if (pedidosFicticios.length > 0) {
        setPedidos(pedidosFicticios);
        setErro("");
      } else {
        setErro("Nenhum pedido encontrado (modo offline)");
        setPedidos([]);
      }
    }

    setCarregado(true);
  }

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
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '32px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#5A0B1E', marginBottom: '24px', textAlign: 'center' }}>
            Meus Pedidos
          </h1>

          <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Digite seu telefone
              </label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#5A0B1E'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              />
            </div>

            <button
              onClick={buscarPedidos}
              style={{
                width: '100%',
                padding: '12px',
                background: '#5A0B1E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#7A0B2E'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#5A0B1E'}
            >
              Buscar Pedidos
            </button>
          </div>

          {erro && (
            <p style={{ textAlign: 'center', color: '#dc2626', marginTop: '16px', fontWeight: '600' }}>{erro}</p>
          )}

          {carregado && pedidos.length === 0 && !erro && (
            <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '16px' }}>
              Nenhum pedido ativo encontrado.
            </p>
          )}
        </div>

        {/* Lista de Pedidos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {pedidos.map((pedido) => (
            <div 
              key={pedido.id}
              onClick={() => navigate(`/pedido/${pedido.id}`)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    Pedido #{pedido.id}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {new Date(pedido.data_pedido || Date.now()).toLocaleString('pt-BR')}
                  </p>
                </div>
                <span style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  ...statusColors[pedido.status]
                }}>
                  {statusLabels[pedido.status]}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <p style={{ color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Total:</span> R$ {Number(pedido.total).toFixed(2)}
                </p>
                <p style={{ color: '#374151' }}>
                  <span style={{ fontWeight: '600' }}>Pagamento:</span> {pedido.forma_pagamento}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: '600' }}>Itens:</p>
                <ul style={{ fontSize: '14px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '20px' }}>
                  {pedido.itens?.map((item, i) => (
                    <li key={i}>
                      {item.quantidade}x {item.nome_produto}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
