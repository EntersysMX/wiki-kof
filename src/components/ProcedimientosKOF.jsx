import { useState } from 'react';
import { PROCEDIMIENTOS } from '../data/mapa';

export default function ProcedimientosKOF({ onGoHome, onGoMapa }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
      {/* Banner */}
      <section style={{ background: '#1c2838', color: '#fafafa', padding: '40px 20px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <button
            onClick={onGoHome}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#7fccd1', fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0, fontFamily: "'Titillium Web', sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'}
            onMouseLeave={e => e.currentTarget.style.color = '#7fccd1'}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
            Volver al portal
          </button>

          <p style={{ margin: '0 0 10px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#dcc9a1' }}>
            Gestión de Terceros Contratistas · KOF
          </p>
          <h1 style={{ margin: '0 0 14px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 5vw, 38px)', lineHeight: 1.15, color: '#ffffff' }}>
            Procedimientos para Coordinadores de Seguridad
          </h1>
          <p style={{ margin: '0 0 10px', fontSize: 'clamp(14px, 2.2vw, 16px)', lineHeight: 1.65, color: '#c9d2da', maxWidth: '60ch' }}>
            Seis procedimientos (PR-KOF-001 a PR-KOF-006) que establecen cómo se gestiona a un tercero contratista: desde el Curso de Inducción hasta el cierre del trabajo de alto riesgo.
          </p>
          <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.6, color: '#8b98a5' }}>
            Publicado y mantenido por Entersys · Emisión: 22/09/2026
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a
              href="#lista"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#009ca6', color: '#ffffff', borderRadius: 8, padding: '12px 22px', fontSize: 15, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = '#008089'}
              onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
            >
              Ver los procedimientos
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_downward</span>
            </a>
            <button
              onClick={onGoMapa}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#7fccd1', fontWeight: 600, fontSize: 14, padding: '12px 6px', fontFamily: "'Titillium Web', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'}
              onMouseLeave={e => e.currentTarget.style.color = '#7fccd1'}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>account_tree</span>
              Ver el mapa del proceso
            </button>
          </div>
        </div>
      </section>

      {/* Lista */}
      <main id="lista" style={{ flex: 1, padding: '36px 16px 16px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 6px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 4vw, 26px)', color: '#1c2838' }}>
            Los seis procedimientos, en orden del proceso
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#5f696f' }}>
            Selecciona un procedimiento para ver su descripción y acceder al PDF.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PROCEDIMIENTOS.map((p, i) => {
              const isOpen = open === p.code;
              return (
                <article
                  key={p.code}
                  style={{
                    background: '#ffffff',
                    border: `1px solid ${isOpen ? '#009ca6' : '#e2e6e8'}`,
                    borderRadius: 12,
                    boxShadow: isOpen ? '0 4px 12px rgba(28,40,56,0.10)' : '0 1px 3px rgba(28,40,56,0.05)',
                    overflow: 'hidden',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : p.code)}
                    aria-expanded={isOpen}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, width: '100%',
                      textAlign: 'left', background: '#ffffff', border: 'none',
                      padding: '14px 16px', cursor: 'pointer', minHeight: 64,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                  >
                    <span style={{
                      flex: 'none', width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 17,
                      background: isOpen ? '#009ca6' : '#ffffff',
                      color: isOpen ? '#ffffff' : '#1c2838',
                      border: `2px solid ${isOpen ? '#009ca6' : '#cdd4d7'}`,
                      boxSizing: 'border-box',
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7c878e', marginBottom: 3 }}>
                        {p.code}
                      </span>
                      <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.3, color: '#1c2838' }}>
                        {p.title}
                      </span>
                    </span>
                    <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#7c878e', flex: 'none', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: '1px solid #e2e6e8', padding: '16px 16px 18px 70px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#454d52' }}>
                        {p.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {p.pdf ? (
                          <>
                            <a
                              href={p.pdf} target="_blank" rel="noopener noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#009ca6', color: '#ffffff', borderRadius: 8, padding: '0 16px', height: 42, fontSize: 14, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#008089'}
                              onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
                            >
                              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>picture_as_pdf</span>
                              Previsualizar PDF
                              <span className="material-symbols-rounded" style={{ fontSize: 15 }}>open_in_new</span>
                            </a>
                            <a
                              href={p.pdf} download={p.fileName}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ffffff', color: '#1c2838', border: '1px solid #cdd4d7', borderRadius: 8, padding: '0 16px', height: 42, fontSize: 14, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.background = '#e6f5f6'; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = '#cdd4d7'; e.currentTarget.style.background = '#ffffff'; }}
                            >
                              <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#008089' }}>download</span>
                              Descargar PDF
                            </a>
                          </>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f1f3f4', color: '#5f696f', border: '1px dashed #cdd4d7', borderRadius: 8, padding: '0 14px', height: 42, fontSize: 13, fontWeight: 600, boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>hourglass_top</span>
                            PDF en preparación
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* Ayuda */}
      <section style={{ padding: '32px 16px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#093d53', borderRadius: 14, padding: '22px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 28, color: '#7fccd1', flex: 'none' }}>support_agent</span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h2 style={{ margin: '0 0 4px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 17, color: '#ffffff' }}>¿Alguna duda?</h2>
              <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6, color: '#c9d2da' }}>Entersys acompaña el proceso. Se responde en horario hábil.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a href="mailto:soporte@entersys.mx" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '8px 14px', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 17, color: '#7fccd1' }}>mail</span>
                  soporte@entersys.mx
                </a>
                <a href="https://wa.me/5256258366" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '8px 14px', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 17, color: '#7fccd1' }}>chat</span>
                  WA +52 56 2568 3662
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#1c2838', color: '#8b98a5', padding: '20px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', fontSize: 13 }}>
          <p style={{ margin: 0, flex: 1, minWidth: 200, lineHeight: 1.6 }}>Procedimientos publicados y mantenidos por Entersys. Última revisión: septiembre de 2026.</p>
          <button onClick={onGoMapa} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c878e', fontSize: 12, textDecoration: 'underline', padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'} onMouseLeave={e => e.currentTarget.style.color = '#7c878e'}>
            Mapa del proceso
          </button>
        </div>
      </footer>
    </div>
  );
}
