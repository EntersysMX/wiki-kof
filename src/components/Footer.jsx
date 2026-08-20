export default function Footer({ fechaRevision }) {
  return (
    <footer style={{
      background: '#1c2838', color: '#8b98a5',
      padding: '32px 16px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1040, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: 20,
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/entersys-logo.png" alt="Entersys" style={{ height: 22, filter: 'brightness(0) invert(0.6)', display: 'block' }} />
          <span style={{ display: 'inline-block', width: 1, height: 18, background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: 13 }}>Portal de contratistas KOF</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', fontSize: 13 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 15, color: '#2f9e6f' }}>verified</span>
            Última revisión: {fechaRevision}
          </span>
          <a
            href="https://entersys.mx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8b98a5', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9d2da'}
            onMouseLeave={e => e.currentTarget.style.color = '#8b98a5'}
          >
            entersys.mx
          </a>
          <a
            href="mailto:soporte@entersys.mx"
            style={{ color: '#8b98a5', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9d2da'}
            onMouseLeave={e => e.currentTarget.style.color = '#8b98a5'}
          >
            soporte@entersys.mx
          </a>
        </div>
      </div>
    </footer>
  );
}
