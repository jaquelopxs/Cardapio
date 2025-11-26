import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Se já houver token → vai direto ao painel
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/pedidos", { replace: true });
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !senha) return alert("Preencha todos os campos.");

    setLoading(true);

    try {
      const resposta = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.error || "Credenciais inválidas");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", dados.token);

      navigate("/admin/pedidos", { replace: true });

    } catch {
      alert("Não foi possível conectar ao servidor.");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px"
      }}
    >
      <h2>Login do Administrador</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          gap: "15px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#fff",
          marginTop: "20px"
        }}
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            background: loading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
