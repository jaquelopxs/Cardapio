import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MeusPedidos() {
  const [telefone, setTelefone] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  // Atualização automática
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
        setPedidos([]);
        setCarregado(true);
        return;
      }

      const data = await res.json();
      setPedidos(data);
      setErro("");
    } catch {
      setErro("Erro ao conectar ao servidor");
    }

    setCarregado(true);
  }

  // Cores para status
  const corStatus = {
    recebido: "#0275d8",
    em_preparo: "#f0ad4e",
    pronto: "#5cb85c",
    entregue: "#6c757d"
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>Meus Pedidos</h1>

      {/* CAMPO DO TELEFONE */}
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

      {/* ERRO */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* NENHUM PEDIDO */}
      {carregado && pedidos.length === 0 && (
        <p>Nenhum pedido ativo encontrado para este telefone.</p>
      )}

      {/* LISTA DE PEDIDOS */}
      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          style={{
            padding: 15,
            marginBottom: 20,
            background: "#fff",
            borderRadius: 10,
            border: "1px solid #ddd",
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/pedido/${pedido.id}`)}
        >
          <h2>Pedido #{pedido.id}</h2>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: corStatus[pedido.status] || "#333",
                fontWeight: "bold",
              }}
            >
              {pedido.status.toUpperCase()}
            </span>
          </p>

          <h3>Itens</h3>
          <ul>
            {pedido.itens.map((item) => (
              <li key={item.id}>
                {item.nome} — {item.quantidade}x — R${" "}
                {Number(item.subtotal).toFixed(2)}
              </li>
            ))}
          </ul>

          <h3>Total: R$ {Number(pedido.total).toFixed(2)}</h3>
          <small style={{ color: "#777" }}>
            * Clique para ver detalhes do pedido
          </small>
        </div>
      ))}
    </div>
  );
}
