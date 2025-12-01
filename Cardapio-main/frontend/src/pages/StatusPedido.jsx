import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function StatusPedido() {
  const { pedidoId } = useParams();
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  async function carregar() {
    try {
      const resp = await fetch(`http://localhost:3000/pedidos/${pedidoId}`);
      const dados = await resp.json();
      setPedido(dados);
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
    }
  }

  useEffect(() => {
    carregar();
    const interval = setInterval(carregar, 5000);
    return () => clearInterval(interval);
  }, [pedidoId]);

  if (!pedido) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando pedido...</h2>
        </div>
      </div>
    );
  }

  const statusEtapas = [
    { key: "recebido", label: "Recebido" },
    { key: "em_preparo", label: "Em Preparo" },
    { key: "pronto", label: "Pronto" },
    { key: "entregue", label: "Entregue" }
  ];
  
  const etapaAtual = statusEtapas.findIndex(e => e.key === pedido.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Pedido #{pedido.id}
            </h1>
            <p className="text-lg text-gray-600">
              Cliente: <strong>{pedido.nome_cliente}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(pedido.data_pedido || Date.now()).toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              {/* Linha de Progresso */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
                <div 
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${(etapaAtual / (statusEtapas.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Etapas */}
              {statusEtapas.map((etapa, index) => (
                <div key={etapa.key} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= etapaAtual 
                        ? 'bg-accent text-white shadow-lg scale-110' 
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {index < etapaAtual ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span 
                    className={`mt-3 text-xs font-semibold text-center max-w-[80px] ${
                      index <= etapaAtual ? 'text-accent' : 'text-gray-500'
                    }`}
                  >
                    {etapa.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do Pedido */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itens do Pedido</h2>
            <ul className="space-y-3">
              {pedido.itens?.map((item, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="text-gray-700">
                    <strong className="font-semibold">{item.quantidade}x</strong> {item.nome_produto}
                  </span>
                  <span className="font-semibold text-gray-900">
                    R$ {Number(item.subtotal).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-accent">
                R$ {Number(pedido.total).toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Forma de pagamento: <strong>{pedido.forma_pagamento}</strong>
            </p>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <Button onClick={() => navigate("/cardapio")} variant="primary" fullWidth>
              Fazer Novo Pedido
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" fullWidth>
              Voltar ao Início
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
