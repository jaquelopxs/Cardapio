import React, { useState } from "react";
import Modal from "./Modal";

export default function ProdutoCard({ produto, adicionar }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const precoFormatado = Number(produto.preco).toFixed(2);

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionar(produto);
    }
    setAbrirModal(false);
    setQuantidade(1);
  };

  return (
    <>
      {/* CARD */}
      <div 
        onClick={() => setAbrirModal(true)}
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          width: '100%',
          maxWidth: '280px',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        {produto.imagem && (
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          />
        )}

        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          {produto.nome}
        </h3>

        {produto.categoria && (
          <span style={{
            display: 'inline-block',
            background: '#F0E6D2',
            color: '#5A0B1E',
            fontSize: '12px',
            fontWeight: '600',
            padding: '4px 12px',
            borderRadius: '50px',
            marginBottom: '8px'
          }}>
            {produto.categoria}
          </span>
        )}

        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', marginBottom: '12px' }}>
          R$ {precoFormatado}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            adicionar(produto);
          }}
          style={{
            width: '100%',
            padding: '12px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
        >
          Adicionar
        </button>
      </div>

      {/* MODAL */}
      <Modal 
        isOpen={abrirModal} 
        onClose={() => setAbrirModal(false)}
        title={produto.nome}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {produto.imagem && (
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          )}

          {produto.categoria && (
            <div>
              <span style={{
                display: 'inline-block',
                background: '#F0E6D2',
                color: '#5A0B1E',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '50px'
              }}>
                {produto.categoria}
              </span>
            </div>
          )}

          <div>
            <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Descrição</h4>
            <p style={{ color: '#6b7280' }}>
              {produto.descricao || "Delicioso produto do nosso cardápio."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Preço</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>R$ {precoFormatado}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#e5e7eb',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
              >
                -
              </button>
              <span style={{ fontSize: '20px', fontWeight: '600', width: '48px', textAlign: 'center' }}>
                {quantidade}
              </span>
              <button
                onClick={() => setQuantidade(quantidade + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#e5e7eb',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAdicionar}
            style={{
              width: '100%',
              padding: '16px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
          >
            Adicionar {quantidade > 1 ? `${quantidade} itens` : ''}
          </button>
        </div>
      </Modal>
    </>
  );
}
