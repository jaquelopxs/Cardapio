import React from "react";

export default function Carrinho({ itens, remover, finalizar }) {
  const total = itens.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Seu Pedido</h1>

      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {itens.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                background: "#fff",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <span>{item.nome}</span>
              <strong>R$ {item.preco}</strong>

              <button
                onClick={() => remover(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Remover
              </button>
            </div>
          ))}

          <h2>Total: R$ {total}</h2>

          <button
            onClick={finalizar}
            style={{
              background: "#28a745",
              color: "#fff",
              padding: "12px",
              width: "100%",
              borderRadius: "8px",
              fontSize: "18px",
              border: "none",
              marginTop: "20px",
              cursor: "pointer"
            }}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}
