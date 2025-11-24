import React, { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  function adicionarAoCarrinho(produto) {
    setCarrinho([...carrinho, produto]);
    console.log("Carrinho:", carrinho);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cardápio</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {produtos.map((p) => (
          <ProdutoCard 
            key={p.id} 
            produto={p} 
            adicionar={adicionarAoCarrinho} 
          />
        ))}
      </div>
    </div>
  );
}
