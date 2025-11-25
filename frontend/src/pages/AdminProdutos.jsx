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
    const resp = await fetch("http://localhost:3000/produtos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const dados = await resp.json();
    setProdutos(dados);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  // =============================
  // SALVAR (CRIAR ou EDITAR)
  // =============================
  async function salvarProduto(e) {
    e.preventDefault();

    const produto = {
      nome,
      descricao,
      preco,
      categoria
    };

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
      alert(editId ? "Produto atualizado!" : "Produto criado!");
      limparFormulario();
      carregarProdutos();
    } else {
      alert("Erro ao salvar produto");
    }
  }

  // =============================
  // CARREGAR DADOS PARA EDITAR
  // =============================
  function editar(produto) {
    setEditId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setCategoria(produto.categoria);
  }

  // =============================
  // EXCLUIR PRODUTO
  // =============================
  async function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciar Produtos</h1>

      {/* =============================
          FORMULÁRIO (CRIAR/EDITAR)
      ============================= */}
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
          onChange={(e) => setNome(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
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
              marginTop: "10px",
              padding: "10px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      {/* =============================
          LISTAGEM DE PRODUTOS
      ============================= */}
      <h2>Produtos Cadastrados</h2>
      {produtos.map((prod) => (
        <div
          key={prod.id}
          style={{
            padding: "15px",
            marginBottom: "10px",
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>{prod.nome}</strong>
            <p>R$ {prod.preco}</p>
            <small>{prod.categoria}</small>
          </div>

          <div>
            <button
              onClick={() => editar(prod)}
              style={{
                marginRight: "10px",
                padding: "8px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Editar
            </button>

            <button
              onClick={() => excluir(prod.id)}
              style={{
                padding: "8px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
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
