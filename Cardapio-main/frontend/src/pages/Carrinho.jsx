import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carrinho({ carrinho, setCarrinho }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamento, setPagamento] = useState("dinheiro");

  const total = carrinho.reduce(
    (soma, item) => soma + Number(item.preco) * Number(item.quantidade || 1),
    0
  );

  function alterarQuantidade(index, novaQtd) {
    const novo = [...carrinho];
    novo[index].quantidade = Math.max(1, novaQtd);
    setCarrinho(novo);
  }

  function removerItem(index) {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  }

  async function finalizarPedido() {
    if (!nome || !telefone) {
      alert("Preencha nome e telefone");
      return;
    }

    const corpo = {
      nome_cliente: nome,
      telefone,
      forma_pagamento: pagamento,
      itens: carrinho.map((item) => ({
        produto_id: item.id,
        quantidade: item.quantidade
      }))
    };

    try {
      const resp = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
      });

      const dados = await resp.json();

      if (resp.ok) {
        setCarrinho([]);
        alert(`Pedido realizado com sucesso! Número: #${dados.pedido_id}`);
        navigate(`/pedido/${dados.pedido_id}`);
      } else {
        alert("Erro ao finalizar pedido: " + (dados.error || ""));
      }
    } catch (err) {
      alert("Erro de conexão ao finalizar pedido");
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '32px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#5A0B1E', marginBottom: '32px', textAlign: 'center' }}>
          Carrinho
        </h1>

        {carrinho.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <svg style={{ width: '96px', height: '96px', margin: '0 auto 16px', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '24px' }}>Seu carrinho está vazio</p>
            <button
              onClick={() => navigate("/cardapio")}
              style={{
                padding: '12px 32px',
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
              Ver Cardápio
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Lista de Itens */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Itens do Pedido</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {carrinho.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.nome}</h3>
                      <p style={{ color: '#28a745', fontWeight: '600' }}>R$ {Number(item.preco).toFixed(2)}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => alterarQuantidade(i, item.quantidade - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#e5e7eb',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        >
                          -
                        </button>
                        <span style={{ width: '48px', textAlign: 'center', fontWeight: '600' }}>{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(i, item.quantidade + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#e5e7eb',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removerItem(i)}
                        style={{
                          color: '#dc2626',
                          fontWeight: '600',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#991b1b'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #d1d5db' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Total:</span>
                  <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Dados do Cliente */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Dados para Entrega</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Telefone
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

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Forma de Pagamento
                  </label>
                  <select
                    value={pagamento}
                    onChange={(e) => setPagamento(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: 'white'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#5A0B1E'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cartao">Cartão</option>
                    <option value="pix">Pix</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={finalizarPedido}
              style={{
                width: '100%',
                padding: '18px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 4px 12px rgba(40,167,69,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
            >
              Finalizar Pedido - R$ {total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
