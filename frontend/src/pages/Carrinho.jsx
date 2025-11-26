import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carrinho({
  carrinho,
  setCarrinho,
  itens,
  remover,
  finalizar
}) {

  const navigate = useNavigate();

  // compatível com os dois apps
  const lista = carrinho || itens || [];

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamento, setPagamento] = useState("dinheiro");

  // total seguro
  const total = lista.reduce(
    (soma, item) => soma + Number(item.preco) * Number(item.quantidade || 1),
    0
  );

  // atualizar quantidade
  function alterarQuantidade(index, novaQtd) {
    const novo = [...lista];
    novo[index].quantidade = novaQtd;

    if (setCarrinho) {
      // fluxo de APP.jsx
      setCarrinho(novo);
      return;
    }

    if (remover && !setCarrinho) {
      // fluxo de APP.js — simula atualização
      remover(null, novo);
    }
  }

  // remover item
  function removerLocal(index) {
    if (remover) return remover(index); // fluxo App.js

    const novo = [...lista];
    novo.splice(index, 1);
    setCarrinho(novo);
  }

  // finalizar pedido
  async function finalizarLocal() {
    if (finalizar) return finalizar(); // fluxo App.js

    if (!nome || !telefone) {
      alert("Preencha nome e telefone");
      return;
    }

    const corpo = {
      nome_cliente: nome,
      telefone,
      forma_pagamento: pagamento,
      itens: lista.map((item) => ({
        produto_id: item.id,
        quantidade: item.quantidade
      }))
    };

    const resp = await fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    });

    const dados = await resp.json();

    if (resp.ok) {
      setCarrinho([]);
      navigate(`/pedido/${dados.pedido_id}`);
    } else {
      alert("Erro ao finalizar pedido");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Carrinho</h1>

      {lista.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          {lista.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div>
                <strong>{item.nome}</strong>
                <br />
                R$ {item.preco}
              </div>

              {/* quantidade */}
              <div>
                <button
                  onClick={() =>
                    alterarQuantidade(i, Math.max(1, item.quantidade - 1))
                  }
                >
                  -
                </button>

                <span style={{ margin: "0 10px" }}>{item.quantidade}</span>

                <button
                  onClick={() => alterarQuantidade(i, item.quantidade + 1)}
                >
                  +
                </button>
              </div>

              <button onClick={() => removerLocal(i)}>Remover</button>
            </div>
          ))}

          <h2>Total: R$ {total.toFixed(2)}</h2>

          {/* Campos do cliente — só no App.jsx */}
          {setCarrinho && (
            <>
              <div style={{ marginTop: 20 }}>
                <input
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ display: "block", marginBottom: 10, padding: 8 }}
                />

                <input
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={{ display: "block", marginBottom: 10, padding: 8 }}
                />

                <select
                  value={pagamento}
                  onChange={(e) => setPagamento(e.target.value)}
                  style={{ padding: 8, width: "200px" }}
                >
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartão</option>
                  <option value="pix">Pix</option>
                </select>
              </div>

              <button
                style={{ padding: "12px 20px", marginTop: 20 }}
                onClick={finalizarLocal}
              >
                Finalizar Pedido
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
