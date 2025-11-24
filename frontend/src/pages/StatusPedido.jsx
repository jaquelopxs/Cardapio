import React, { useEffect, useState } from "react";

export default function StatusPedido({ pedidoId }) {
  const [pedido, setPedido] = useState(null);

  async function carregar() {
    const resp = await fetch(`http://localhost:3000/pedidos/${pedidoId}`);
    const dados = await resp.json();
    setPedido(dados);
  }

  useEffect(() => {
    carregar();
    const interval = setInterval(carregar, 5000); // atualiza sozinho
    return () => clearInterval(interval);
  }, []);

  if (!pedido) return <h2>Carregando pedido...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Acompanhar Pedido #{pedido.id}</h1>

      <p><strong>Cliente:</strong> {pedido.nome_cliente}</p>
      <p><strong>Status atual:</strong> {pedido.status.toUpperCase()}</p>

      <h3>Itens:</h3>
      <ul>
        {pedido.itens?.map((item, i) => (
          <li key={i}>
            {item.nome_produto} — {item.quantidade}x
          </li>
        ))}
      </ul>
    </div>
  );
}
