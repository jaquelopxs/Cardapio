import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const navigate = useNavigate();

  // Se o usuário já estiver logado → redireciona
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/pedidos", { replace: true });
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    if (!email || !senha) {
      setModal({
        isOpen: true,
        title: "Atenção",
        message: "Preencha todos os campos.",
        type: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setModal({
          isOpen: true,
          title: "Erro",
          message: dados.error || "Credenciais inválidas",
          type: "error",
        });
        setLoading(false);
        return;
      }

      // SALVA TOKEN
      localStorage.setItem("token", dados.token);

      navigate("/admin/pedidos", { replace: true });
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Erro",
        message: "Não foi possível conectar ao servidor.",
        type: "error",
      });
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #5A0B1E 0%, #8B1538 50%, #5A0B1E 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "420px",
          padding: "48px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #5A0B1E, #8B1538)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(90,11,30,0.3)",
            }}
          >
            <span style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>
              ES
            </span>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            Área Administrativa
          </h1>

          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Faça login para gerenciar pedidos e produtos
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Usuário / E-mail
            </label>
            <input
              type="text"
              placeholder="email ou usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#5A0B1E")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Senha
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  paddingRight: "15px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "15px",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#5A0B1E")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              />

              {/* BOTÃO MOSTRAR SENHA */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#6b7280",
                }}
              >
              </button>
            </div>
          </div>

          {/* BOTÃO LOGIN */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#9ca3af" : "#5A0B1E",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "#7A0B2E";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = "#5A0B1E";
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* VOLTAR */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              color: "#5A0B1E",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Voltar ao site
          </button>
        </div>

        {/* INFO */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f3f4f6",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            <strong style={{ color: "#374151" }}>Acesso restrito:</strong> Esta área
            é exclusiva para administradores autorizados do Empório Sophia.
          </p>
        </div>
      </div>

      {/* MODAL */}
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
