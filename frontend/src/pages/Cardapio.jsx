import React, { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";

export default function Cardapio({ adicionar }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState(["Todos"]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("http://localhost:3000/produtos");
        if (!res.ok) throw new Error("Erro ao buscar produtos");

        const data = await res.json();

        // garante array
        const produtosValidos = Array.isArray(data) ? data : [];

        setProdutos(produtosValidos);

        // gera categorias únicas
        const cats = [
          "Todos",
          ...new Set(
            produtosValidos
              .map((p) => p.categoria)
              .filter(Boolean)
          ),
        ];

        setCategorias(cats);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setProdutos([]);   // NÃO usa mock — somente banco
        setCategorias(["Todos"]);
      }
    }

    carregar();
  }, []);

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaSelecionada);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 16px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#5A0B1E", marginBottom: "8px" }}>
            Nosso Cardápio
          </h1>
          <p style={{ color: "#6b7280" }}>Escolha seus favoritos e adicione ao carrinho</p>
        </div>

        {/* Filtro de Categorias */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              style={{
                padding: "8px 24px",
                borderRadius: "50px",
                fontWeight: "600",
                transition: "all 0.2s",
                border: "none",
                cursor: "pointer",
                background: categoriaSelecionada === cat ? "#5A0B1E" : "white",
                color: categoriaSelecionada === cat ? "white" : "#374151",
                boxShadow:
                  categoriaSelecionada === cat
                    ? "0 4px 12px rgba(90,11,30,0.3)"
                    : "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            justifyItems: "center",
          }}
        >
          {produtosFiltrados.map((p) => (
            <ProdutoCard key={p.id} produto={p} adicionar={() => adicionar(p)} />
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div style={{ textAlign: "center", color: "#6b7280", marginTop: "48px" }}>
            <p style={{ fontSize: "20px" }}>Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
