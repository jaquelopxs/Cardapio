import React from "react";

export default function Modal({ isOpen, onClose, title, message, type = "info" }) {
  if (!isOpen) return null;

  const colors = {
    success: { bg: "#10b981", icon: "✓" },
    error: { bg: "#ef4444", icon: "✕" },
    warning: { bg: "#f59e0b", icon: "⚠" },
    info: { bg: "#3b82f6", icon: "ℹ" }
  };

  const color = colors[type] || colors.info;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "100%",
          overflow: "hidden",
          animation: "modalSlideIn 0.3s ease"
        }}
      >
        {/* Header */}
        <div
          style={{
            background: color.bg,
            color: "white",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: "bold" }}>{color.icon}</span>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            {title || type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <p style={{ fontSize: "15px", color: "#374151", lineHeight: "1.6", margin: 0 }}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 24px",
              background: color.bg,
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Fechar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
