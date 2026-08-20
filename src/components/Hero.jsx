export default function Hero({ onStart, fechaRevision }) {
  return (
    <section style={{
      background: '#1c2838', color: '#fafafa',
      padding: '48px 20px 56px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{
          margin: '0 0 14px',
          fontFamily: "'Titillium Web', sans-serif", fontWeight: 600,
          fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#dcc9a1',
        }}>
          Guía para contratistas · Coca-Cola FEMSA
        </p>
        <h1 style={{
          margin: '0 0 16px',
          fontFamily: "'Titillium Web', sans-serif", fontWeight: 700,
          fontSize: 'clamp(28px, 6vw, 42px)', lineHeight: 1.15,
          color: '#ffffff',
        }}>
          Valida a tu empresa para trabajar en plantas de KOF
        </h1>
        <p style={{
          margin: '0 0 12px',
          fontSize: 'clamp(15px, 2.5vw, 17px)', lineHeight: 1.65,
          color: '#c9d2da', maxWidth: '56ch',
        }}>
          Si eres contratista y vas a operar en instalaciones de Coca-Cola FEMSA, aquí está todo el trámite en orden: 7 pasos, qué documentos necesitas en cada uno y qué pasa si omites alguno.
        </p>
        <p style={{ margin: '0 0 28px', fontSize: 14, lineHeight: 1.6, color: '#8b98a5' }}>
          Publicado y mantenido por Entersys. Sin registros ni contraseñas: solo sigue los pasos.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <button
            onClick={onStart}
            className="btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#009ca6', color: '#ffffff', border: 'none',
              borderRadius: 8, padding: '14px 24px',
              fontSize: 16, fontWeight: 600,
              fontFamily: "'Titillium Web', sans-serif",
              cursor: 'pointer', minHeight: 48,
              transition: 'background var(--dur-base)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#008089'}
            onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
          >
            Comenzar el proceso
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>arrow_forward</span>
          </button>
          <a
            href="#proceso"
            style={{
              display: 'inline-flex', alignItems: 'center', minHeight: 48,
              padding: '0 16px', borderRadius: 8,
              color: '#7fccd1', textDecoration: 'none', fontWeight: 600, fontSize: 15,
              transition: 'background var(--dur-base), color var(--dur-base)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#b9e3e6'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7fccd1'; }}
          >
            Ver el mapa completo
          </a>
        </div>
      </div>
    </section>
  );
}
