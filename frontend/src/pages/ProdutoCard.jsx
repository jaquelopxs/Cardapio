import React, { useState } from "react";

export default function ProdutoCard({ produto, adicionar }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...card,
        ...(hover ? cardHover : {})
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {produto.imagem && (
        <img
          src={produto.imagem}
          alt={produto.nome}
          style={imagem}
        />
      )}

      <h3 style={titulo}>{produto.nome}</h3>

      <p style={descricao}>
        {produto.descricao}
      </p>

      <div style={precoContainer}>
        <span style={preco}>R$ {Number(produto.preco).toFixed(2)}</span>
      </div>

      <button style={botao} onClick={adicionar}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}


// =============================================
// ESTILOS
// =============================================

const card = {
  width: "250px",
  background: "#fff",
  borderRadius: "14px",
  padding: "15px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  margin: "10px",
};

const cardHover = {
  transform: "translateY(-4px)",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
};

const imagem = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "12px",
};

const titulo = {
  fontSize: "18px",
  marginBottom: "8px",
  color: "#333",
};

const descricao = {
  fontSize: "14px",
  color: "#666",
  minHeight: "40px",
  marginBottom: "12px",
};

const precoContainer = {
  margin: "10px 0",
};

const preco = {
  fontSize: "20px",
  color: "#28a745",
  fontWeight: "bold",
};

const botao = {
  marginTop: "10px",
  padding: "12px 15px",
  width: "100%",
  borderRadius: "10px",
  border: "none",
  background: "#007bff",
  color: "white",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.2s",
};
