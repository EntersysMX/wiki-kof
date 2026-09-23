const HIGH_RISK_TYPES = [
  { icon: 'ladder', label: 'Trabajo en alturas', desc: 'Actividades a más de 1.8 m sobre el nivel del suelo.' },
  { icon: 'do_not_touch', label: 'Espacios confinados', desc: 'Ingreso a tanques, silos, tuberías u otros recintos cerrados.' },
  { icon: 'electric_bolt', label: 'Trabajos eléctricos', desc: 'Intervención en instalaciones o equipos energizados.' },
  { icon: 'mode_heat', label: 'Trabajos en caliente', desc: 'Soldadura, corte o cualquier actividad que genere chispa o llama.' },
  { icon: 'local_shipping', label: 'Izaje de cargas', desc: 'Uso de grúas, polipastos o equipos de levantamiento.' },
  { icon: 'excavator', label: 'Excavaciones y zanjas', desc: 'Apertura de terreno a más de 1.5 m de profundidad.' },
  { icon: 'science', label: 'Sustancias peligrosas', desc: 'Manejo, traslado o disposición de materiales HAZMAT.' },
  { icon: 'construction', label: 'Herramientas de poder', desc: 'Uso de equipos neumáticos, hidráulicos o de alto torque.' },
];

const PHASES = [
  {
    n: 1,
    icon: 'person_add',
    title: 'Alta de contratista',
    color: '#009ca6',
    items: [
      'Registra los Documentos Generales de tu empresa (acta constitutiva, IMSS, etc.).',
      'Genera tu usuario en el Portal de Terceros.',
      'Acepta el correo de invitación a Smartsheet.',
    ],
  },
  {
    n: 2,
    icon: 'folder_open',
    title: 'Alta y gestión de proyectos',
    color: '#1c7da8',
    items: [
      'Da de alta el proyecto con la Orden de Compra correspondiente.',
      'Registra el listado de colaboradores y asócialos al proyecto.',
      'Carga el Alcance / Procedimiento Operativo y el Plan de Rescate.',
    ],
  },
  {
    n: 3,
    icon: 'security',
    title: 'Trabajos de Alto Riesgo',
    color: '#e07b00',
    items: [
      'Completa el análisis de riesgos (IPERC) para cada actividad.',
      'Genera y sube los Permisos de Trabajo requeridos.',
      'Mantén la documentación actualizada durante toda la ejecución.',
    ],
  },
];

export default function IntroSection({ onGoHome }) {
  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh' }}>
      {/* Banner */}
      <div style={{ background: '#1c2838', color: '#ffffff', padding: '40px 20px 44px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <button
            onClick={onGoHome}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: '#7fccd1', fontSize: 14, fontWeight: 600,
              marginBottom: 20, padding: 0,
              fontFamily: "'Titillium Web', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'}
            onMouseLeave={e => e.currentTarget.style.color = '#7fccd1'}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
            Volver al inicio
          </button>

          <h1 style={{
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700, fontSize: 'clamp(24px, 5vw, 36px)',
            margin: '0 0 12px', color: '#ffffff',
          }}>
            Portal de Gestión Documental KOF
          </h1>
          <p style={{ fontSize: 16, color: '#c9d2da', margin: 0, maxWidth: '65ch', lineHeight: 1.7 }}>
            Guía de referencia para contratistas que realizan actividades dentro de las instalaciones de
            Coca-Cola FEMSA. Aquí encontrarás el proceso completo, los tipos de trabajo que requieren
            documentación especial y los pasos para cumplir con los requisitos de seguridad.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '36px 20px 64px' }}>

        {/* ¿Qué es este espacio? */}
        <section style={{
          background: '#ffffff', border: '1px solid #e2e6e8',
          borderRadius: 12, padding: '28px 28px 24px', marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700, fontSize: 20, color: '#1c2838',
            margin: '0 0 14px', paddingBottom: 12,
            borderBottom: '2px solid #009ca6', display: 'inline-block',
          }}>
            ¿Qué es este espacio?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3d4f5c', margin: '0 0 12px' }}>
            Este portal es la plataforma de gestión documental para <strong>contratistas y terceros</strong> que
            trabajan dentro de las instalaciones de Coca-Cola FEMSA (KOF). Su objetivo es centralizar, validar
            y mantener actualizada toda la documentación de seguridad requerida antes y durante la ejecución
            de cualquier trabajo.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3d4f5c', margin: 0 }}>
            La plataforma está construida sobre <strong>Smartsheet</strong> y es administrada por el equipo de
            Entersys en conjunto con los Técnicos de Seguridad de cada Unidad Operativa de KOF.
          </p>
        </section>

        {/* Clasificación de Trabajos de Alto Riesgo */}
        <section style={{
          background: '#ffffff', border: '1px solid #e2e6e8',
          borderRadius: 12, padding: '28px 28px 24px', marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700, fontSize: 20, color: '#1c2838',
            margin: '0 0 6px', paddingBottom: 12,
            borderBottom: '2px solid #009ca6', display: 'inline-block',
          }}>
            Clasificación de Trabajos de Alto Riesgo
          </h2>
          <p style={{ fontSize: 14, color: '#5f696f', margin: '12px 0 20px', lineHeight: 1.6 }}>
            Las siguientes actividades requieren documentación adicional (IPERC, permiso de trabajo,
            plan de rescate) antes de iniciar operaciones en planta.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}>
            {HIGH_RISK_TYPES.map(t => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                background: '#f6f8fa', border: '1px solid #e2e6e8',
                borderRadius: 10, padding: '14px 14px',
              }}>
                <span className="material-symbols-rounded" style={{
                  fontSize: 24, color: '#009ca6', flexShrink: 0, marginTop: 1,
                }}>
                  {t.icon}
                </span>
                <span>
                  <span style={{
                    display: 'block', fontFamily: "'Titillium Web', sans-serif",
                    fontWeight: 700, fontSize: 14, color: '#1c2838', marginBottom: 3,
                  }}>
                    {t.label}
                  </span>
                  <span style={{ fontSize: 12, color: '#5f696f', lineHeight: 1.5 }}>
                    {t.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Proceso documental — 3 fases */}
        <section style={{
          background: '#ffffff', border: '1px solid #e2e6e8',
          borderRadius: 12, padding: '28px 28px 28px', marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700, fontSize: 20, color: '#1c2838',
            margin: '0 0 6px', paddingBottom: 12,
            borderBottom: '2px solid #009ca6', display: 'inline-block',
          }}>
            Proceso Documental
          </h2>
          <p style={{ fontSize: 14, color: '#5f696f', margin: '12px 0 24px', lineHeight: 1.6 }}>
            La gestión documental en KOF se divide en tres fases que deben completarse en orden.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PHASES.map((phase, idx) => (
              <div key={phase.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Número + línea vertical */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: phase.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 16,
                  }}>
                    {phase.n}
                  </div>
                  {idx < PHASES.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: '#e2e6e8', marginTop: 4 }} />
                  )}
                </div>

                {/* Contenido */}
                <div style={{
                  flex: 1, background: '#f6f8fa',
                  border: '1px solid #e2e6e8', borderRadius: 10,
                  padding: '16px 18px', marginBottom: idx < PHASES.length - 1 ? 0 : 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 20, color: phase.color }}>
                      {phase.icon}
                    </span>
                    <span style={{
                      fontFamily: "'Titillium Web', sans-serif",
                      fontWeight: 700, fontSize: 15, color: '#1c2838',
                    }}>
                      {phase.title}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {phase.items.map((item, i) => (
                      <li key={i} style={{ fontSize: 13, color: '#3d4f5c', lineHeight: 1.65, marginBottom: 4 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — ir a los pasos */}
        <div style={{
          background: '#e6f5f6', border: '1px solid #b3dfe1',
          borderRadius: 12, padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span className="material-symbols-rounded" style={{ fontSize: 36, color: '#009ca6', flexShrink: 0 }}>
            checklist
          </span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#1c2838', fontSize: 16, fontFamily: "'Titillium Web', sans-serif" }}>
              ¿Listo para empezar?
            </p>
            <p style={{ margin: 0, fontSize: 14, color: '#3d4f5c' }}>
              Consulta la guía paso a paso con toda la documentación requerida.
            </p>
          </div>
          <button
            onClick={onGoHome}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#009ca6', color: '#ffffff',
              padding: '12px 20px', borderRadius: 8, border: 'none',
              fontWeight: 600, fontSize: 15, cursor: 'pointer',
              fontFamily: "'Titillium Web', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#007880'}
            onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
          >
            Ver guía de pasos
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
