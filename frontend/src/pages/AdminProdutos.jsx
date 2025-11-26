import React, { useState, useEffect } from "react";

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // =============================
  // CARREGAR PRODUTOS
  // =============================
  async function carregarProdutos() {
    try {
      const resp = await fetch("http://localhost:3000/produtos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resp.ok) return;

      const dados = await resp.json();

      dados.sort((a, b) => {
        if (a.categoria < b.categoria) return -1;
        if (a.categoria > b.categoria) return 1;
        return a.nome.localeCompare(b.nome);
      });

      setProdutos(dados);
    } catch {}
  }

  useEffect(() => {
    if (token) carregarProdutos();
  }, [token]);

  // =============================
  // SALVAR PRODUTO
  // =============================
  async function salvarProduto(e) {
    e.preventDefault();

    const produto = { nome, descricao, preco, categoria };

    const metodo = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:3000/produtos/${editId}`
      : "http://localhost:3000/produtos";

    const resp = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(produto)
    });

    if (resp.ok) {
      limparFormulario();
      carregarProdutos();
    } else {
      alert("Erro ao salvar");
    }
  }

  function editar(p) {
    setEditId(p.id);
    setNome(p.nome);
    setDescricao(p.descricao || "");
    setPreco(p.preco);
    setCategoria(p.categoria);
  }

  async function excluir(id) {
    if (!window.confirm("Excluir este produto?")) return;

    await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    carregarProdutos();
  }

  function limparFormulario() {
    setEditId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
  }

  // =============================
  // RETORNO – CHECAGEM DO TOKEN
  // =============================
  if (!token) {
    return <h2 style={{ padding: 20 }}>Acesso negado</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciar Produtos</h1>

      {/* FORMULÁRIO */}
      <form
        onSubmit={salvarProduto}
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          maxWidth: "400px"
        }}
      >
        <h3>{editId ? "Editar Produto" : "Novo Produto"}</h3>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        >
          <option value="">Selecione a categoria</option>
          <option value="comidas">Comidas</option>
          <option value="bebidas">Bebidas</option>
          <option value="sobremesas">Sobremesas</option>
        </select>

        <button
          type="submit"
          style={{
            marginTop: 15,
            padding: 10,
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            width: "100%"
          }}
        >
          {editId ? "Salvar Alterações" : "Criar Produto"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={limparFormulario}
            style={{
              marginTop: 10,
              padding: 10,
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              width: "100%"
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* LISTAGEM */}
      <h2>Produtos</h2>

      {produtos.map((p) => (
        <div
          key={p.id}
          style={{
            padding: 15,
            marginBottom: 10,
            background: "#fff",
            borderRadius: 10,
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>{p.nome}</strong>
            <p>R$ {Number(p.preco).toFixed(2)}</p>
            <small>{p.categoria}</small>
          </div>

          <div>
            <button
              onClick={() => editar(p)}
              style={{
                marginRight: 10,
                padding: 8,
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Editar
            </button>

            <button
              onClick={() => excluir(p.id)}
              style={{
                padding: 8,
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
