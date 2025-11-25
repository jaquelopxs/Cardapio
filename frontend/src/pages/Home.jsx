import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={container}>
      <h1 style={titulo}>🍽️ Cardápio Digital</h1>
      <p style={subtitulo}>Escolha uma das opções abaixo</p>

      <div style={opcoesContainer}>

        {/* Card Cardápio */}
        <Link to="/cardapio" style={link}>
          <div style={card("#4CAF50")}>
            <span style={icone}>🍔</span>
            <h3 style={cardTitulo}>Ver Cardápio</h3>
          </div>
        </Link>

        {/* Card Carrinho */}
        <Link to="/carrinho" style={link}>
          <div style={card("#2196F3")}>
            <span style={icone}>🛒</span>
            <h3 style={cardTitulo}>Meu Carrinho</h3>
          </div>
        </Link>

        {/* Card Meus Pedidos */}
        <Link to="/meus-pedidos" style={link}>
          <div style={card("#FF9800")}>
            <span style={icone}>📦</span>
            <h3 style={cardTitulo}>Meus Pedidos</h3>
          </div>
        </Link>

        {/* Card Admin */}
        <Link to="/admin" style={link}>
          <div style={card("#9C27B0")}>
            <span style={icone}>🛠️</span>
            <h3 style={cardTitulo}>Área do Administrador</h3>
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
  gridTemplateColumns: "1fr 1fr",
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
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
