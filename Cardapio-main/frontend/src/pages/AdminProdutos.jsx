import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../data/mockData.json";
import Modal from "../components/Modal";

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function carregarProdutos() {
    try {
      const resp = await fetch("http://localhost:3000/produtos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resp.ok) {
        console.warn("Backend n�o dispon�vel, usando dados fict�cios");
        const dados = mockData.produtos;
        dados.sort((a, b) => {
          if (a.categoria < b.categoria) return -1;
          if (a.categoria > b.categoria) return 1;
          return a.nome.localeCompare(b.nome);
        });
        setProdutos(dados);
        return;
      }

      const dados = await resp.json();
      dados.sort((a, b) => {
        if (a.categoria < b.categoria) return -1;
        if (a.categoria > b.categoria) return 1;
        return a.nome.localeCompare(b.nome);
      });

      setProdutos(dados);
    } catch (err) {
      console.warn("Erro ao carregar produtos, usando dados fict�cios:", err);
      const dados = mockData.produtos;
      dados.sort((a, b) => {
        if (a.categoria < b.categoria) return -1;
        if (a.categoria > b.categoria) return 1;
        return a.nome.localeCompare(b.nome);
      });
      setProdutos(dados);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }
    carregarProdutos();
  }, [token, navigate]);

  async function salvarProduto(e) {
    e.preventDefault();

    if (!nome || !preco || !categoria) {
      setModal({ isOpen: true, title: "Validacao", message: "Preencha os campos obrigatorios", type: "warning" });
      return;
    }

    const produto = { nome, descricao, preco: parseFloat(preco), categoria, imagem };

    const metodo = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:3000/produtos/${editId}`
      : "http://localhost:3000/produtos";

    try {
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
        setModal({ isOpen: true, title: "Sucesso", message: editId ? "Produto atualizado!" : "Produto criado!", type: "success" });
      } else {
        setModal({ isOpen: true, title: "Erro", message: "Erro ao salvar produto", type: "error" });
      }
    } catch (err) {
      setModal({ isOpen: true, title: "Erro", message: "Erro de conexao com o servidor", type: "error" });
    }
  }

  function editar(p) {
    setEditId(p.id);
    setNome(p.nome);
    setDescricao(p.descricao || "");
    setPreco(p.preco);
    setCategoria(p.categoria);
    setImagem(p.imagem || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      carregarProdutos();
      setModal({ isOpen: true, title: "Sucesso", message: "Produto excluido!", type: "success" });
    } catch (err) {
      setModal({ isOpen: true, title: "Erro", message: "Erro ao excluir produto", type: "error" });
    }
  }

  function limparFormulario() {
    setEditId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
    setImagem("");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
  }

  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>Acesso Negado</h2>
          <p style={{ color: "#6b7280", marginTop: "8px" }}>Voce precisa estar logado.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{ background: "#5A0B1E", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>Gerenciar Produtos</h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>Cadastro e edicao do cardapio</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => navigate("/admin/pedidos")}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            >
              Ver Pedidos
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#b91c1c"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#dc2626"}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Formul�rio */}
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", marginBottom: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>
            {editId ? "Editar Produto" : "Novo Produto"}
          </h2>

          <form onSubmit={salvarProduto} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                  Nome *
                </label>
                <input
                  type="text"
                  placeholder="Ex: X-Burger"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#5A0B1E"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                  Preco (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 25.90"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#5A0B1E"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                  Categoria *
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    background: "white"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#5A0B1E"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
                >
                  <option value="">Selecione</option>
                  <option value="lanches">Lanches</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="acompanhamentos">Acompanhamentos</option>
                  <option value="sobremesas">Sobremesas</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                Descricao
              </label>
              <textarea
                placeholder="Descreva o produto..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#5A0B1E"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                URL da Imagem
              </label>
              <input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#5A0B1E"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                style={{
                  padding: "12px 32px",
                  background: "#5A0B1E",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#7A0B2E"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#5A0B1E"}
              >
                {editId ? "Atualizar" : "Criar"}  Produto
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={limparFormulario}
                  style={{
                    padding: "12px 32px",
                    background: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#4b5563"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#6b7280"}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Produtos */}
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#111827" }}>
          Produtos Cadastrados ({produtos.length})
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {produtos.map((p) => (
            <div key={p.id} style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              {p.imagem && (
                <img
                  src={p.imagem}
                  alt={p.nome}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "12px"
                  }}
                />
              )}

              <div style={{ marginBottom: "8px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#111827" }}>{p.nome}</h3>
                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "#F0E6D2",
                  color: "#5A0B1E",
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginTop: "4px"
                }}>
                  {p.categoria}
                </span>
              </div>

              {p.descricao && (
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px", lineHeight: "1.5" }}>
                  {p.descricao}
                </p>
              )}

              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745", marginBottom: "12px" }}>
                R$ {Number(p.preco).toFixed(2)}
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => editar(p)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#2563eb"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#3b82f6"}
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(p.id)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#b91c1c"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#dc2626"}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {produtos.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <p style={{ fontSize: "18px", color: "#6b7280" }}>Nenhum produto cadastrado ainda.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
