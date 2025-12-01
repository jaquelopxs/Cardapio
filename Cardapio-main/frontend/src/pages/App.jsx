import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";

// Pages
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
    <div className="bg-white min-h-screen">
      {/* Show Navbar only for non-admin routes */}
      <Routes>
        <Route path="/admin/*" element={null} />
        <Route path="*" element={<Navbar carrinhoCount={carrinho.length} />} />
      </Routes>

      {/* ROTAS */}
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
