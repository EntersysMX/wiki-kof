import { useState } from 'react';
import entersysLogo from '../assets/entersys-logo.png';

export default function Header({ onGoHome, q, onQ }) {
  const [searchOpen, setSearchOpen] = useState(false);

  function toggleSearch() {
    setSearchOpen(v => {
      if (v) onQ('');
      return !v;
    });
  }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #e2e6e8',
      }}>
        <div style={{
          maxWidth: 1040, margin: '0 auto',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 10, minHeight: 52,
        }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onGoHome(); }}
            aria-label="Inicio — Portal Informativo Contratistas KOF"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          >
            <img src={entersysLogo} alt="Entersys" style={{ height: 26, display: 'block' }} />
          </a>

          <span style={{ display: 'inline-block', width: 1, height: 22, background: '#e2e6e8', flexShrink: 0 }} />

          <span className="header-portal-name">
            Portal Informativo Contratistas KOF
          </span>

          <span style={{ flex: 1 }} />

          {/* Search button — always visible */}
          <button
            onClick={toggleSearch}
            aria-label="Buscar un paso"
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, border: 'none', background: 'transparent',
              borderRadius: 8, color: '#5f696f', cursor: 'pointer',
              transition: 'background var(--dur-base)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 22 }}>
              {searchOpen ? 'close' : 'search'}
            </span>
          </button>

          {/* Ayuda — solo en desktop */}
          <a
            href="#ayuda"
            className="header-ayuda-desktop"
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 6,
              minHeight: 44, padding: '0 12px', borderRadius: 8,
              textDecoration: 'none', color: '#008089', fontWeight: 600, fontSize: 14,
              transition: 'background var(--dur-base)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e6f5f6'; e.currentTarget.style.color = '#00646b'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#008089'; }}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>support_agent</span>
            <span>Ayuda</span>
          </a>
        </div>

        {searchOpen && (
          <div style={{ borderTop: '1px solid #e2e6e8', background: '#ffffff' }}>
            <div style={{
              maxWidth: 1040, margin: '0 auto', padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20, color: '#7c878e' }}>search</span>
              <input
                value={q}
                onChange={e => onQ(e.target.value)}
                placeholder="Busca un paso, por ejemplo: permisos"
                aria-label="Buscar en los pasos"
                autoFocus
                style={{
                  flex: 1, border: '1px solid #cdd4d7', borderRadius: 8,
                  padding: '10px 12px', fontSize: 15, fontFamily: 'inherit', color: '#1c2838',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Ayuda FAB — solo en móvil y tablet */}
      <a
        href="#ayuda"
        className="header-ayuda-fab"
        aria-label="Ir a la sección de ayuda"
      >
        <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24 }}>support_agent</span>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Ayuda</span>
      </a>
    </>
  );
}
