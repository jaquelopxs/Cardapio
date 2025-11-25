import React from "react";
import { useNavigate } from "react-router-dom";

export default function Carrinho({ itens, remover, finalizar }) {
  const navigate = useNavigate();

  // total do carrinho
  const total = itens.reduce((soma, item) => {
    return soma + Number(item.preco) * (item.quantidade || 1);
  }, 0);

  async function finalizarPedido() {
    const resultado = await finalizar(); // chama a função do App.js

    // Se o pedido foi criado, finalize() deve retornar o id
    if (resultado && resultado.pedido_id) {
      navigate(`/status/${resultado.pedido_id}`);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Carrinho</h1>

      {itens.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          {itens.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{item.nome}</strong>
                <br />
                R$ {item.preco}
              </div>

              <div>
                <span style={{ margin: "0 10px" }}>
                  Quantidade: {item.quantidade || 1}
                </span>
              </div>

              <button onClick={() => remover(index)}>Remover</button>
            </div>
          ))}

          <h2>Total: R$ {total.toFixed(2)}</h2>

          <button
            style={{ padding: "10px 20px", marginTop: "20px" }}
            onClick={finalizarPedido}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}
