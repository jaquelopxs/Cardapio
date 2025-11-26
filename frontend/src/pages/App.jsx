import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// IMPORTS CORRETOS (mesmo nível)
import Home from "./Home";
import Cardapio from "./Cardapio";
import Carrinho from "./Carrinho";
import MeuPedidos from "./MeuPedidos";
import StatusPedido from "./StatusPedido";

// Admin
import LoginAdmin from "./LoginAdmin";
import AdminPedidos from "./AdminPedidos";
import AdminProdutos from "./AdminProdutos";

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const RequireAdmin = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/admin" replace />;
    return children;
  };

  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cardapio">Cardápio</Link> |{" "}
        <Link to="/carrinho">Carrinho ({carrinho.length})</Link> |{" "}
        <Link to="/meus-pedidos">Meus Pedidos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/cardapio"
          element={
            <Cardapio
              adicionar={(produto) =>
                setCarrinho((prev) => {
                  const existe = prev.find((i) => i.id === produto.id);
                  if (existe) {
                    return prev.map((i) =>
                      i.id === produto.id
                        ? { ...i, quantidade: i.quantidade + 1 }
                        : i
                    );
                  }
                  return [...prev, { ...produto, quantidade: 1 }];
                })
              }
            />
          }
        />

        <Route
          path="/carrinho"
          element={<Carrinho carrinho={carrinho} setCarrinho={setCarrinho} />}
        />

        <Route path="/meus-pedidos" element={<MeuPedidos />} />
        <Route path="/pedido/:pedidoId" element={<StatusPedido />} />

        <Route path="/admin" element={<LoginAdmin />} />

        <Route
          path="/admin/pedidos"
          element={
            <RequireAdmin>
              <AdminPedidos />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/produtos"
          element={
            <RequireAdmin>
              <AdminProdutos />
            </RequireAdmin>
          }
        />
      </Routes>
    </div>
  );
}
