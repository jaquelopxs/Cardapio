import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ carrinhoCount = 0 }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? '#5A0B1E' : '#374151',
    fontWeight: isActive(path) ? '700' : '600',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: isActive(path) ? '#F0E6D2' : 'transparent',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-block',
  });

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderBottom: '3px solid #F0E6D2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#5A0B1E' }}>Empório Sophia</span>
          </Link>

          {/* Desktop Menu */}
          <div style={{ display: 'none', gap: '8px', alignItems: 'center' }} className="desktop-menu">
            <Link to="/" style={linkStyle('/')}>
              Home
            </Link>
            <Link to="/cardapio" style={linkStyle('/cardapio')}>
              Cardápio
            </Link>
            <Link to="/carrinho" style={{ ...linkStyle('/carrinho'), position: 'relative' }}>
              Carrinho
              {carrinhoCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '0', 
                  right: '0', 
                  background: '#28a745', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '22px', 
                  height: '22px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {carrinhoCount}
                </span>
              )}
            </Link>
            <Link to="/meus-pedidos" style={linkStyle('/meus-pedidos')}>
              Meus Pedidos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuAberto(!menuAberto)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '28px', 
              cursor: 'pointer',
              color: '#5A0B1E',
              display: 'none'
            }}
            className="mobile-menu-btn"
          >
            {menuAberto ? '×' : '≡'}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuAberto && (
          <div style={{ paddingBottom: '20px' }} className="mobile-menu-items">
            <Link 
              to="/" 
              onClick={() => setMenuAberto(false)}
              style={{ ...linkStyle('/'), display: 'block', marginBottom: '8px' }}
            >
              Home
            </Link>
            <Link 
              to="/cardapio" 
              onClick={() => setMenuAberto(false)}
              style={{ ...linkStyle('/cardapio'), display: 'block', marginBottom: '8px' }}
            >
              Cardápio
            </Link>
            <Link 
              to="/carrinho" 
              onClick={() => setMenuAberto(false)}
              style={{ ...linkStyle('/carrinho'), display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
            >
              Carrinho
              {carrinhoCount > 0 && (
                <span style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '22px', 
                  height: '22px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '11px', 
                  fontWeight: 'bold'
                }}>
                  {carrinhoCount}
                </span>
              )}
            </Link>
            <Link 
              to="/meus-pedidos" 
              onClick={() => setMenuAberto(false)}
              style={{ ...linkStyle('/meus-pedidos'), display: 'block' }}
            >
              Meus Pedidos
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
