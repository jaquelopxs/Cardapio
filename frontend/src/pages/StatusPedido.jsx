import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StatusPedido() {
  const { pedidoId } = useParams(); // ID correto
  const [pedido, setPedido] = useState(null);

  async function carregar() {
    try {
      const resp = await fetch(`http://localhost:3000/pedidos/${pedidoId}`);
      const dados = await resp.json();
      setPedido(dados);
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
    }
  }

  useEffect(() => {
    carregar();
    const interval = setInterval(carregar, 5000);
    return () => clearInterval(interval);
  }, [pedidoId]);

  if (!pedido)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando pedido...
      </h2>
    );

  // ========================================
  // Etapas do status
  // ========================================
  const statusEtapas = ["recebido", "em_preparo", "pronto", "entregue"];
  const etapaAtual = statusEtapas.indexOf(pedido.status);

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={titulo}>Pedido #{pedido.id}</h1>
        <p style={subtitulo}>
          Cliente: <strong>{pedido.nome_cliente}</strong>
        </p>

        {/* Barra de progresso */}
        <div style={progressoContainer}>
          {statusEtapas.map((etapa, index) => (
            <div key={etapa} style={progressoItem}>
              <div
                style={{
                  ...circle,
                  background: index <= etapaAtual ? "#28a745" : "#ccc",
                }}
              />
              <span
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: index <= etapaAtual ? "#28a745" : "#777",
                  textTransform: "capitalize",
                }}
              >
                {etapa.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>

        <hr style={{ margin: "20px 0" }} />

        <h2 style={{ marginBottom: "10px" }}>Itens do pedido</h2>

        <ul>
          {pedido.itens?.map((item, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              {item.nome_produto} — <strong>{item.quantidade}x</strong>
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: "20px" }}>Total:</h2>
        <p style={total}>R$ {pedido.total}</p>

        <Link to="/">
          <button style={botaoVoltar}>Voltar ao Cardápio</button>
        </Link>
      </div>
    </div>
  );
}

//////////////////////////////////////////
// ESTILOS
//////////////////////////////////////////

const container = {
  display: "flex",
  justifyContent: "center",
  padding: "30px",
};

const card = {
  width: "100%",
  maxWidth: "480px",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const titulo = {
  textAlign: "center",
  marginBottom: "10px",
};

const subtitulo = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#555",
};

const progressoContainer = {
  display: "flex",
  justifyContent: "space-between",
  margin: "25px 0",
};

const progressoItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "25%",
  textAlign: "center",
};

const circle = {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  marginBottom: "5px",
};

const total = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#28a745",
};

const botaoVoltar = {
  marginTop: "25px",
  width: "100%",
  padding: "12px",
  background: "#007bff",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};
