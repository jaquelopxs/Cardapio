import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import MeuPedidos from "./pages/MeuPedidos";
import StatusPedido from "./pages/StatusPedido";

// Admin
import LoginAdmin from "./pages/LoginAdmin";
import AdminPedidos from "./pages/AdminPedidos";
import AdminProdutos from "./pages/AdminProdutos";

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <BrowserRouter>

      {/* NAV SUPER SIMPLES */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/cardapio" style={{ marginRight: "15px" }}>Cardápio</Link>
        <Link to="/carrinho" style={{ marginRight: "15px" }}>
          Carrinho ({carrinho.length})
        </Link>
        <Link to="/meus-pedidos">Meus Pedidos</Link>
      </nav>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* CARDÁPIO */}
        <Route 
          path="/cardapio" 
          element={
            <Cardapio 
              carrinho={carrinho}
              setCarrinho={setCarrinho}
            />
          } 
        />

        {/* CARRINHO */}
        <Route
          path="/carrinho"
          element={
            <Carrinho
              carrinho={carrinho}
              setCarrinho={setCarrinho}
            />
          }
        />

        {/* MEUS PEDIDOS */}
        <Route path="/meus-pedidos" element={<MeuPedidos />} />

        {/* STATUS DO PEDIDO */}
        <Route path="/pedido/:pedidoId" element={<StatusPedido />} />

        {/* ADMIN */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/pedidos" element={<AdminPedidos />} />
        <Route path="/admin/produtos" element={<AdminProdutos />} />

      </Routes>
    </BrowserRouter>
  );
}
