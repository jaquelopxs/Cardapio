import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const page = document.getElementById("home-page");
    if (page) {
      page.style.opacity = 0;
      setTimeout(() => {
        page.style.transition = "opacity 0.8s ease";
        page.style.opacity = 1;
      }, 80);
    }
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home-page" style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #5A0B1E 0%, #8B1538 100%)', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        {/* Decorative Elements */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '500px', height: '500px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>

        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <img 
            src="/lanche.png" 
            alt="Empório Sophia" 
            style={{ 
              width: '180px', 
              height: '180px', 
              objectFit: 'cover', 
              borderRadius: '50%', 
              margin: '0 auto 32px', 
              border: '6px solid rgba(255,255,255,0.2)', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)' 
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '16px', 
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            Empório Sophia
          </h1>
          
          <p style={{ 
            fontSize: '24px', 
            color: '#F0E6D2', 
            fontWeight: '600', 
            marginBottom: '16px' 
          }}>
            Tradição e Sabor desde 1995
          </p>
          
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.9)', 
            lineHeight: '1.6', 
            maxWidth: '600px', 
            margin: '0 auto 40px' 
          }}>
            Lanches artesanais preparados com ingredientes selecionados e muito carinho. 
            Experimente a melhor experiência gastronômica da cidade.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <Link to="/cardapio" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 40px',
                background: 'white',
                color: '#5A0B1E',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}>
                Ver Cardápio
              </button>
            </Link>

            <button 
              onClick={() => scrollToSection('sobre')}
              style={{
                padding: '18px 40px',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}>
              Nossa História
            </button>
          </div>

          {/* Scroll Indicator */}
          <div style={{ 
            animation: 'bounce 2s infinite',
            marginTop: '40px'
          }}>
            <svg 
              onClick={() => scrollToSection('sobre')}
              style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* Sobre Section */}
      <section id="sobre" style={{ padding: '100px 20px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: '#5A0B1E', 
            textAlign: 'center', 
            marginBottom: '20px' 
          }}>
            Nossa História
          </h2>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: '#F0E6D2', 
            margin: '0 auto 60px',
            borderRadius: '2px'
          }}></div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px',
            marginBottom: '60px'
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#5A0B1E', marginBottom: '16px' }}>
                Desde 1995
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}>
                O Empório Sophia nasceu do sonho de Dona Sophia em oferecer lanches caseiros e saborosos 
                para a comunidade. Com uma receita de família e ingredientes frescos, conquistamos o paladar 
                de milhares de clientes ao longo de quase 30 anos.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#5A0B1E', marginBottom: '16px' }}>
                Qualidade Garantida
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}>
                Selecionamos cuidadosamente cada ingrediente, trabalhamos apenas com fornecedores de 
                confiança e preparamos tudo na hora. Nosso compromisso é entregar não apenas um lanche, 
                mas uma experiência memorável.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#5A0B1E', marginBottom: '16px' }}>
                Feito com Amor
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}>
                Cada hambúrguer é preparado com o mesmo carinho que Dona Sophia colocava em suas receitas. 
                Nossa equipe é treinada para manter viva essa tradição, garantindo que cada pedido saia 
                perfeito da nossa cozinha.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '40px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '20px', 
              fontStyle: 'italic', 
              color: '#5A0B1E', 
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              "Um lanche não é apenas comida, é uma experiência que cria memórias. 
              Por isso, colocamos amor em cada ingrediente."
            </p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
              - Sophia Maria, Fundadora
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section style={{ padding: '100px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: '#5A0B1E', 
            textAlign: 'center', 
            marginBottom: '20px' 
          }}>
            Por que Escolher o Empório Sophia?
          </h2>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: '#F0E6D2', 
            margin: '0 auto 60px',
            borderRadius: '2px'
          }}></div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px' 
          }}>
            {[
              { icon: '⚡', title: 'Entrega Rápida', desc: 'Seu pedido chega quentinho em até 40 minutos' },
              { icon: '★', title: 'Ingredientes Premium', desc: 'Selecionamos apenas o melhor para você' },
              { icon: '$', title: 'Preço Justo', desc: 'Qualidade excepcional com preço acessível' },
              { icon: '♥', title: 'Atendimento 5 Estrelas', desc: 'Equipe dedicada a superar expectativas' },
            ].map((item, i) => (
              <div 
                key={i}
                style={{ 
                  textAlign: 'center', 
                  padding: '30px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(90,11,30,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  fontSize: '48px', 
                  marginBottom: '16px',
                  color: '#5A0B1E'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#5A0B1E', 
                  marginBottom: '12px' 
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 20px', 
        background: 'linear-gradient(135deg, #5A0B1E 0%, #8B1538 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '24px' 
          }}>
            Pronto para Saborear?
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: '40px',
            lineHeight: '1.8'
          }}>
            Navegue pelo nosso cardápio e faça seu pedido agora mesmo. 
            Entregas rápidas e sabor garantido!
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cardapio" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 48px',
                background: 'white',
                color: '#5A0B1E',
                border: 'none',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                Fazer Pedido Agora
              </button>
            </Link>

            <Link to="/meus-pedidos" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 48px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#5A0B1E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}>
                Acompanhar Pedido
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        background: '#111827', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
            Empório Sophia
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px' }}>
            Tradição e Sabor desde 1995
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            © 2025 Empório Sophia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}