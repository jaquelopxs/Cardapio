import React, { useState } from "react";

export default function ProdutoCard({ produto, adicionar }) {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
      {/* CARD DO PRODUTO */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "15px",
          width: "240px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          backgroundColor: "#fff",
          textAlign: "center",
          margin: "15px",
          cursor: "pointer"
        }}
        onClick={() => setAbrirModal(true)}
      >
        {produto.imagem && (
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}

        <h3>{produto.nome}</h3>

        <strong style={{ fontSize: "18px", marginTop: "10px", display: "block" }}>
          R$ {produto.preco}
        </strong>

        <button
          onClick={(e) => {
            e.stopPropagation(); // impede abrir o modal
            adicionar(produto);
          }}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Adicionar à sacola
        </button>
      </div>

      {/* MODAL DE DETALHES */}
      {abrirModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}>
          
          <div style={{
            width: "100%",
            maxWidth: "450px",
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            position: "relative"
          }}>
            
            {/* Close */}
            <button
              onClick={() => setAbrirModal(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                fontSize: "18px",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              ✕
            </button>

            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}
              />
            )}

            <h2>{produto.nome}</h2>
            <p style={{ color: "#333", marginTop: "10px" }}>
              {produto.descricao || "Sem descrição detalhada."}
            </p>

            <h3 style={{ marginTop: "15px" }}>
              R$ {produto.preco}
            </h3>

            <button
              onClick={() => {
                adicionar(produto);
                setAbrirModal(false);
              }}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "12px",
                width: "100%",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                marginTop: "20px",
                fontSize: "16px"
              }}
            >
              Adicionar ao pedido
            </button>
          </div>

        </div>
      )}
    </>
  );
}
