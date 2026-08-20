export default function HelpSection() {
  return (
    <section id="ayuda" style={{ background: '#f8f9fa', borderTop: '1px solid #e2e6e8', padding: '48px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{
          margin: '0 0 8px',
          fontFamily: "'Titillium Web', sans-serif", fontWeight: 700,
          fontSize: 'clamp(20px, 3.5vw, 26px)', color: '#1c2838',
        }}>
          ¿Necesitas ayuda?
        </h2>
        <p style={{ margin: '0 0 32px', fontSize: 15, lineHeight: 1.6, color: '#5f696f' }}>
          Si tienes dudas sobre el proceso o encuentras un error en la plataforma, contáctanos por cualquiera de estos canales.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {/* WhatsApp */}
          <a
            href="https://wa.me/5215500000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              background: '#ffffff', border: '1px solid #e2e6e8',
              borderRadius: 12, padding: 20, textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#009ca6';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e6e8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 28, color: '#25d366', flexShrink: 0, marginTop: 2 }}>
              chat
            </span>
            <span>
              <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#1c2838', marginBottom: 4 }}>
                WhatsApp
              </span>
              <span style={{ display: 'block', fontSize: 13, color: '#5f696f', lineHeight: 1.5 }}>
                Soporte directo con el equipo Entersys. Respuesta en horario laboral.
              </span>
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:soporte@entersys.mx"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              background: '#ffffff', border: '1px solid #e2e6e8',
              borderRadius: 12, padding: 20, textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#009ca6';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e6e8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 28, color: '#009ca6', flexShrink: 0, marginTop: 2 }}>
              mail
            </span>
            <span>
              <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#1c2838', marginBottom: 4 }}>
                Correo electrónico
              </span>
              <span style={{ display: 'block', fontSize: 13, color: '#5f696f', lineHeight: 1.5 }}>
                soporte@entersys.mx — para reportes o consultas que requieran evidencia adjunta.
              </span>
            </span>
          </a>

          {/* Platform link */}
          <a
            href="https://kof.entersys.mx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              background: '#ffffff', border: '1px solid #e2e6e8',
              borderRadius: 12, padding: 20, textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#009ca6';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e6e8';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 28, color: '#1c2838', flexShrink: 0, marginTop: 2 }}>
              open_in_new
            </span>
            <span>
              <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#1c2838', marginBottom: 4 }}>
                Plataforma KOF
              </span>
              <span style={{ display: 'block', fontSize: 13, color: '#5f696f', lineHeight: 1.5 }}>
                kof.entersys.mx — accede directamente al sistema para gestionar tu documentación.
              </span>
            </span>
          </a>
        </div>

        <p style={{ margin: '28px 0 0', fontSize: 13, color: '#7c878e', lineHeight: 1.6 }}>
          Este portal es publicado y mantenido por <strong style={{ color: '#5f696f' }}>Entersys</strong>. El contenido es orientativo y refleja los requisitos vigentes de Coca-Cola FEMSA; ante cualquier discrepancia prevalece la información oficial de la plataforma.
        </p>
      </div>
    </section>
  );
}
