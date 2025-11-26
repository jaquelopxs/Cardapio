import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={container}>
      <h1 style={titulo}>🍽️ Cardápio Digital</h1>
      <p style={subtitulo}>Escolha uma das opções abaixo</p>

      <div style={opcoesContainer}>

        {/* VER CARDÁPIO */}
        <Link to="/cardapio" style={link}>
          <div style={card("#4CAF50")}>
            <span style={icone}>📋</span>
            <h3 style={cardTitulo}>Ver Cardápio</h3>
          </div>
        </Link>

        {/* ACOMPANHAR PEDIDO */}
        <Link to="/pedido-status" style={link}>
          <div style={card("#2196F3")}>
            <span style={icone}>📦</span>
            <h3 style={cardTitulo}>Acompanhar Pedido</h3>
          </div>
        </Link>

      </div>
    </div>
  );
}


// =====================================
// ESTILOS
// =====================================

const container = {
  padding: "40px",
  textAlign: "center",
};

const titulo = {
  fontSize: "32px",
  marginBottom: "10px",
  color: "#333",
};

const subtitulo = {
  fontSize: "18px",
  marginBottom: "40px",
  color: "#666",
};

const opcoesContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  maxWidth: "500px",
  margin: "0 auto",
};

const link = {
  textDecoration: "none",
};

const card = (cor) => ({
  background: cor,
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  color: "white",
  transition: "0.2s ease",
  cursor: "pointer",
  textAlign: "center",
});

const cardTitulo = {
  fontSize: "20px",
  marginTop: "10px",
};

const icone = {
  fontSize: "40px",
};
