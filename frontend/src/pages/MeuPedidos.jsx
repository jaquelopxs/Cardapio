import { useState, useEffect } from "react";

export default function MeusPedidos() {
  const [telefone, setTelefone] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState("");

  // Atualizar pedidos automaticamente a cada 5s
  useEffect(() => {
    if (!telefone || !carregado) return;

    const interval = setInterval(() => {
      buscarPedidos();
    }, 5000);

    return () => clearInterval(interval);
  }, [telefone, carregado]);

  async function buscarPedidos() {
    if (!telefone.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3000/pedidos/telefone/${telefone}`
      );

      if (!res.ok) {
        setErro("Erro ao buscar pedidos");
        return;
      }

      const data = await res.json();
      setPedidos(data);
      setErro("");
    } catch (error) {
      setErro("Erro ao conectar ao servidor");
    }

    setCarregado(true);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>Meus Pedidos</h1>

      {/* Campo de telefone */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Digite seu telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={buscarPedidos}
          style={{
            marginTop: 10,
            width: "100%",
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ver meus pedidos
        </button>
      </div>

      {/* Erro */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* Lista de pedidos */}
      {carregado && pedidos.length === 0 && (
        <p>Nenhum pedido ativo encontrado para este telefone.</p>
      )}

      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          style={{
            padding: 15,
            marginBottom: 20,
            background: "#f8f8f8",
            borderRadius: 10,
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Pedido #{pedido.id}</h2>

          <p>
            <strong>Status:</strong> {pedido.status.toUpperCase()}
          </p>

          <h3>Itens</h3>
          <ul>
            {pedido.itens.map((item) => (
              <li key={item.id}>
                {item.nome} — {item.quantidade}x — R$ {item.subtotal}
              </li>
            ))}
          </ul>

          <h3>Total: R$ {pedido.total}</h3>
        </div>
      ))}
    </div>
  );
}
