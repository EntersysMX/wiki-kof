import { useState } from 'react';
import { PROCEDIMIENTOS } from '../data/mapa';
import entersysLogo from '../assets/entersys-logo.png';

export default function ProcedimientosKOF({ onGoHome, onGoMapa }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>

      {/* Sticky header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#ffffff', borderBottom: '1px solid #e2e6e8' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, minHeight: 44 }}>
          <button
            onClick={onGoMapa}
            aria-label="Ir al mapa del proceso para Coordinadores de Seguridad"
            style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, minHeight: 44, flexShrink: 0 }}
          >
            <img src={entersysLogo} alt="Entersys" style={{ height: 26, display: 'block' }} />
          </button>
          <span style={{ display: 'inline-block', width: 1, height: 22, background: '#e2e6e8', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c878e', whiteSpace: 'nowrap' }}>
              Portal KOF · Coordinadores de Seguridad
            </span>
            <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14, color: '#1c2838', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Procedimientos
            </span>
          </div>
          <span style={{ flex: 1 }} />
          <button
            onClick={onGoMapa}
            className="proc-nav-link"
            onMouseEnter={e => { e.currentTarget.style.background = '#e6f5f6'; e.currentTarget.style.color = '#00646b'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#008089'; }}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>account_tree</span>
            <span>Mapa del proceso</span>
          </button>
          <a
            href="#ayuda"
            className="proc-nav-link"
            onMouseEnter={e => { e.currentTarget.style.background = '#e6f5f6'; e.currentTarget.style.color = '#00646b'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#008089'; }}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>support_agent</span>
            <span>Ayuda</span>
          </a>
        </div>
      </header>

      {/* FABs — solo móvil y tablet */}
      <div className="proc-fabs">
        <button onClick={onGoMapa} className="proc-fab" aria-label="Ir al mapa del proceso">
          <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24 }}>account_tree</span>
          <span>Mapa</span>
        </button>
        <a href="#ayuda" className="proc-fab" aria-label="Ir a la sección de ayuda">
          <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24 }}>support_agent</span>
          <span>Ayuda</span>
        </a>
      </div>

      {/* Banner */}
      <section style={{ background: '#1c2838', color: '#fafafa', padding: '48px 20px 52px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#dcc9a1' }}>
            Gestión de Terceros Contratistas · KOF
          </p>
          <h1 style={{ margin: '0 0 16px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.15, color: '#ffffff' }}>
            Procedimientos para Coordinadores de Seguridad
          </h1>
          <p style={{ margin: '0 0 12px', fontSize: 'clamp(15px, 2.2vw, 17px)', lineHeight: 1.65, color: '#c9d2da', maxWidth: '60ch' }}>
            Seis procedimientos (PR-KOF-001 a PR-KOF-006) que establecen cómo se gestiona a un tercero contratista en la plataforma: desde el Curso de Inducción hasta el cierre del trabajo de alto riesgo. Cada uno describe qué registra el contratista y qué valida el Coordinador de Seguridad.
          </p>
          <p style={{ margin: '0 0 26px', fontSize: 14, lineHeight: 1.6, color: '#8b98a5' }}>
            Publicado y mantenido por Entersys. Todos los procedimientos fueron supervisados por Juan Carlos Bejerano, auditor Six Sigma Green Belt. Cada procedimiento muestra su objetivo y da acceso al documento en PDF.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => document.getElementById('lista')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#009ca6', color: '#ffffff', borderRadius: 8, padding: '14px 24px', fontSize: 16, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", border: 'none', cursor: 'pointer', minHeight: 48, boxSizing: 'border-box' }}
              onMouseEnter={e => e.currentTarget.style.background = '#008089'}
              onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
            >
              Ver los procedimientos
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>arrow_downward</span>
            </button>
            <button
              onClick={onGoMapa}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 48, padding: '0 16px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#7fccd1', fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', fontFamily: "'Titillium Web', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#b9e3e6'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#7fccd1'; }}
            >
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>account_tree</span>
              Ver el mapa del proceso
            </button>
          </div>
        </div>
      </section>

      {/* Lista */}
      <main id="lista" style={{ flex: 1, padding: '40px 16px 8px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 6px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 4vw, 28px)', color: '#1c2838' }}>
            Los seis procedimientos, en orden del proceso
          </h2>
          <p style={{ margin: '0 0 6px', fontSize: 15, lineHeight: 1.6, color: '#5f696f' }}>
            Al seleccionar un procedimiento se muestra su descripción y el acceso al PDF.
          </p>
          <p style={{ margin: '0 0 24px', fontSize: 13, color: '#7c878e', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 16, color: '#2f9e6f' }}>verified</span>
            Emisión: 22/09/2026 · Proceso dueño: Gestión de Terceros Contratistas
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                  <h3 style={{ margin: 0 }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : p.code)}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${p.code}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14, width: '100%',
                        textAlign: 'left', background: '#ffffff', border: 'none',
                        padding: '16px', cursor: 'pointer', minHeight: 64,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                      onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                    >
                      <span aria-hidden="true" style={{
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
                        <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.25, color: '#1c2838' }}>
                          {p.title}
                        </span>
                      </span>
                      <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24, color: '#7c878e', flex: 'none', transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        expand_more
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div id={`panel-${p.code}`} style={{ borderTop: '1px solid #e2e6e8', padding: '18px 16px 18px 70px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#454d52' }}>
                        {p.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                        {p.pdf ? (
                          <>
                            <a
                              href={p.pdf} target="_blank" rel="noopener noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#009ca6', color: '#ffffff', borderRadius: 8, padding: '0 18px', height: 44, fontSize: 14.5, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#008089'}
                              onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
                            >
                              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>picture_as_pdf</span>
                              Previsualizar PDF
                              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 16 }}>open_in_new</span>
                            </a>
                            <a
                              href={p.pdf} download={p.fileName}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ffffff', color: '#1c2838', border: '1px solid #cdd4d7', borderRadius: 8, padding: '0 18px', height: 44, fontSize: 14.5, fontWeight: 600, fontFamily: "'Titillium Web', sans-serif", textDecoration: 'none', boxSizing: 'border-box', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.background = '#e6f5f6'; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = '#cdd4d7'; e.currentTarget.style.background = '#ffffff'; }}
                            >
                              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20, color: '#008089' }}>download</span>
                              Descargar PDF
                            </a>
                          </>
                        ) : (
                          <span aria-disabled="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f1f3f4', color: '#5f696f', border: '1px dashed #cdd4d7', borderRadius: 8, padding: '0 16px', height: 44, fontSize: 14, fontWeight: 600, boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
                            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>hourglass_top</span>
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
      <section id="ayuda" style={{ padding: '36px 16px 36px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#093d53', borderRadius: 14, padding: '24px 20px', color: '#fafafa' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 30, color: '#7fccd1', flex: 'none' }}>support_agent</span>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ margin: '0 0 4px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 19, color: '#ffffff' }}>¿Alguna duda?</h2>
              <p style={{ margin: '0 0 14px', fontSize: 14.5, lineHeight: 1.6, color: '#c9d2da' }}>Entersys acompaña el proceso. Se responde solamente en horario hábil.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a href="mailto:soporte@entersys.mx" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '10px 14px', minHeight: 44, boxSizing: 'border-box', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                  <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 19, color: '#7fccd1' }}>mail</span>
                  soporte@entersys.mx
                </a>
                <a href="https://wa.me/5256258366" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '10px 14px', minHeight: 44, boxSizing: 'border-box', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                  <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 19, color: '#7fccd1' }}>chat</span>
                  WA +52 56 2568 3662
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#1c2838', color: '#8b98a5', padding: '28px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <p style={{ margin: 0, flex: 1, minWidth: 220, fontSize: 13, lineHeight: 1.6 }}>
            Procedimientos publicados y mantenidos por Entersys para la gestión de terceros contratistas de Coca-Cola FEMSA. Última revisión: septiembre de 2026.
          </p>
          <button
            onClick={onGoMapa}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c878e', fontSize: 12.5, textDecoration: 'underline', padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'}
            onMouseLeave={e => e.currentTarget.style.color = '#7c878e'}
          >
            Mapa del proceso
          </button>
        </div>
      </footer>
    </div>
  );
}
